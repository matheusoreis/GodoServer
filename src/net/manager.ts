import type { ServerWebSocket } from "bun";
import { AlertCore } from "../core/alert/alert.core";
import type { Character } from "../core/game/character/character";
import { Connection } from "../core/connection";
import { Memory } from "../core/memory";
import { Logger } from "../misc/logger";
import { serviceLocator } from "../misc/service-locator";

export class Manager {
	constructor() {
		this.logger = serviceLocator.get<Logger>(Logger);
		this.memory = serviceLocator.get<Memory>(Memory);
	}

	private readonly logger: Logger;
	private readonly memory: Memory;

	public websocketOpen(ws: ServerWebSocket): void {
		const firstAvailableId: number | undefined =
			this.memory.connections.getFirstEmptySlot();

		if (firstAvailableId === undefined) {
			this.handleFullServer(ws);

			return;
		}

		const connectionModel: Connection = new Connection(ws, firstAvailableId);
		connectionModel.addToMemory();
	}

	public async websocketClose(ws: ServerWebSocket): Promise<void> {
		const connection: Connection | undefined = this.GetSocket(ws, this.memory);

		if (!connection) {
			this.logger.error("Nenhuma conexão encontrada para esse websocket.");
			return;
		}

		const characterInUse: Character | undefined =
			connection.getCharacterInUse();

		if (!characterInUse) {
			return;
		}

		// Atualize o personagem
		await this.updateCharacterBeforeDisconnect(characterInUse);

		// Remova o personagem do mapa atual
		await this.removeCharacterFromCurrentWorld(connection, characterInUse);

		characterInUse.stopLoop();
		this.cleanupConnection(ws);
	}

	private async updateCharacterBeforeDisconnect(
		characterInUse: Character,
	): Promise<void> {
		try {
			await characterInUse.updateCharacter(characterInUse);

			this.logger.info(
				`Personagem ${characterInUse.name} atualizado ao desconectar.`,
			);
		} catch (error) {
			throw new Error(`Falha ao atualizar personagem, erro: ${error}`);
		}
	}

	private async removeCharacterFromCurrentWorld(
		connection: Connection,
		characterInUse: Character,
	): Promise<void> {
		try {
			const foundWorld = characterInUse.findWorld(characterInUse.worldId);
			if (!foundWorld) {
				new AlertCore(connection, "Mundo não encontrado!", true).send();
				return;
			}

			foundWorld.remove(connection, characterInUse);
		} catch (error) {
			throw new Error(`Falha ao remover personagem do mundo, erro: ${error}`);
		}
	}

	public websocketMessage(ws: ServerWebSocket, message: Uint8Array): void {
		const connection: Connection | undefined = this.GetSocket(ws, this.memory);

		if (!connection) {
			this.logger.error("Conexão não encontrada para WebSocket.");
			this.cleanupConnection(ws);
			return;
		}

		connection.handleMessage(message);
	}

	private handleFullServer(ws: ServerWebSocket): void {
		const connection: Connection = new Connection(ws, -1);

		new AlertCore(
			connection,
			"O servidor está cheio! desconectando...",
			true,
		).send();

		this.logger.info(
			`O servidor está cheio, desconectando o cliente: ${ws.remoteAddress}`,
		);
	}

	private cleanupConnection(ws: ServerWebSocket): void {
		const connection: Connection | undefined = this.GetSocket(ws, this.memory);

		if (connection) {
			this.memory.connections.remove(connection.id);
			connection.close();
		}
	}

	private GetSocket(
		ws: ServerWebSocket,
		memory: Memory,
	): Connection | undefined {
		for (const index of memory.connections.getFilledSlots()) {
			const connection = memory.connections.get(index);

			if (connection && connection.ws === ws) {
				return connection;
			}
		}
		return undefined;
	}
}
