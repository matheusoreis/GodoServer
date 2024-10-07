import type { ServerWebSocket } from "bun";
import { ClientMessage } from "../communication/protocol/client-message";
import { serviceLocator } from "../misc/service-locator";
import { Handler } from "../net/handler";
import { Memory } from "./memory";

import { AlertCore } from "./alert/alert.core";
import type { Character } from "./game/character/character";

export class Connection {
	constructor(ws: ServerWebSocket, id: number) {
		this.ws = ws;
		this.id = id;
		this.active = true;

		this.handler = serviceLocator.get<Handler>(Handler);
		this.memory = serviceLocator.get<Memory>(Memory);
		this.clientMessage = serviceLocator.get<ClientMessage>(ClientMessage);
	}

	public readonly ws: ServerWebSocket;
	public readonly id: number;
	private connectionDatabaseId?: number;
	private characters?: Character[];
	private characterInUse?: Character;

	private active: boolean;

	private handler: Handler;
	private memory: Memory;
	private clientMessage: ClientMessage;

	public isConnected(): boolean {
		return this.ws.readyState === 1;
	}

	public close(): void {
		if (this.active) {
			const connections = this.memory.connections;

			const connection = connections.get(this.id);
			if (connection) {
				connections.remove(this.id);
			}

			this.ws.close();
			this.active = false;
		}
	}

	public handleMessage(message: Uint8Array): void {
		this.clientMessage.setBuffer(message);
		this.handler.handleMessage(this, this.clientMessage);
	}

	public addToMemory(): void {
		this.memory.connections.add(this);
	}

	public addDatabaseId(databaseId: number): void {
		this.connectionDatabaseId = databaseId;
	}

	public getDatabaseId(): number | undefined {
		if (this.connectionDatabaseId === undefined) {
			new AlertCore(
				this,
				"Ocorreu um erro ao recuperar seus dados.",
				true,
			).send();

			return undefined;
		}

		return this.connectionDatabaseId;
	}

	public addCharacters(chars: Character[]): void {
		this.characters = chars;
	}

	public addCharacter(character: Character): void {
		const existingCharacter = this.characters?.find(
			(c) => c.id === character.id,
		);

		if (existingCharacter) {
			return;
		}

		this.characters?.push(character);
	}

	public setCharacterInUseById(charId: number): void {
		// Verifica se a lista de personagens está definida
		if (this.characters) {
			// Encontra o personagem na lista de personagens usando o ID
			const character = this.characters.find((c) => c.id === charId);

			// Se o personagem for encontrado, define-o como o personagem ativo
			if (character) {
				this.characterInUse = character;
			} else {
				throw new Error(`Character with ID ${charId} not found.`);
			}
		} else {
			throw new Error("Character list is not initialized.");
		}
	}

	public removeCharacter(characterId: number): void {
		this.characters = this.characters?.filter((c) => c.id !== characterId);

		if (this.characterInUse && this.characterInUse.id === characterId) {
			this.characterInUse = undefined;
		}
	}

	public getCharacterInUse(): Character | undefined {
		return this.characterInUse;
	}
}
