import { PrismaClient } from "@prisma/client";
import type { Server, ServerWebSocket } from "bun";
import { WorldCore } from "../core/game/world/world.core";
import { Memory } from "../core/memory";
import { SERVER_HOST, SERVER_PORT } from "../misc/constants";
import { Logger } from "../misc/logger";
import type { PrismaCharacter, PrismaWorld } from "../misc/prisma-types";
import { serviceLocator } from "../misc/service-locator";
import { Vector2 } from "../misc/vector2";
import { Manager } from "./manager";

export class Setup {
	constructor() {
		this.logger = serviceLocator.get<Logger>(Logger);
		this.manager = serviceLocator.get<Manager>(Manager);
		this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
		this.memory = serviceLocator.get<Memory>(Memory);

		this.websocketHandlers = {
			open: this.websocketOpen.bind(this),
			close: this.websocketClose.bind(this),
			message: this.websocketMessage.bind(this),
		};
	}

	private readonly logger: Logger;
	private readonly manager: Manager;
	private readonly prisma: PrismaClient;
	private readonly memory: Memory;

	private readonly websocketHandlers: {
		open: (ws: ServerWebSocket) => void;
		close: (ws: ServerWebSocket, code: number, message: string) => void;
		message: (ws: ServerWebSocket, message: Buffer) => void;
	};

	public async start(): Promise<void> {
		try {
			Bun.serve({
				hostname: SERVER_HOST,
				port: SERVER_PORT,
				fetch: this.fetchHandler,
				websocket: this.websocketHandlers,
			});

			this.logger.info("Servidor iniciado com sucesso!");
			this.logger.info(`Servidor escutando em: ${SERVER_PORT}`);

			this.logger.info("Iniciando a memória do servidor...");
			await this.loadMemory();

			this.logger.info("Aguardando por novas conexões...");
		} catch (error) {
			this.logger.error(`Falha ao iniciar o servidor, erro: ${error}`);
		}
	}

	private async fetchHandler(req: Request, server: Server): Promise<Response> {
		if (req.headers.get("upgrade")?.toLowerCase() === "websocket") {
			const success: boolean = server.upgrade(req);

			if (!success) {
				return new Response("Falha na atualização para WebSocket", {
					status: 400,
				});
			}
		}

		return new Response("O acesso HTTP não é permitido", { status: 403 });
	}

	private websocketOpen(ws: ServerWebSocket): void {
		this.logger.info(`Nova conexão: ${ws.remoteAddress}`);
		this.manager.websocketOpen(ws);
	}

	private websocketClose(ws: ServerWebSocket): void {
		this.logger.info(`Conexão fechada: ${ws.remoteAddress}`);
		this.manager.websocketClose(ws);
	}

	private websocketMessage(ws: ServerWebSocket, message: Buffer): void {
		const uint8Message = new Uint8Array(message);
		this.manager.websocketMessage(ws, uint8Message);
	}

	private async loadMemory(): Promise<void> {
		await this.loadWorlds();
	}

	private async loadWorlds(): Promise<void> {
		try {
			const worlds: PrismaWorld[] = await this.prisma.worlds.findMany();

			if (worlds.length === 0) {
				this.logger.error("Nenhum mundo encontrado no banco de dados.");
				return;
			}

			for (const world of worlds) {
				this.memory.worlds.add(
					new WorldCore(
						world.id,
						world.name,
						new Vector2(world.sizeX, world.sizeY),
					),
				);
			}

			this.logger.info(`${worlds.length} mundos carregado na memória.`);
		} catch (error) {
			this.logger.error(
				`Falha ao carregar os mundos do banco de dados, erro: ${error}`,
			);
		}
	}
}
