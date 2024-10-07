import type { Connection } from "../core/connection";
import { Memory } from "../core/memory";
import { Logger } from "../misc/logger";
import { serviceLocator } from "../misc/service-locator";
import type { ServerMessage } from "./protocol/server-message";

export abstract class Outgoing {
	constructor() {
		this.logger = serviceLocator.get<Logger>(Logger);
		this.memory = serviceLocator.get<Memory>(Memory);
	}

	private logger: Logger;
	private memory: Memory;

	protected dataTo(connection: Connection, message: ServerMessage): void {
		try {
			connection.ws.send(message.getBuffer());
		} catch (error) {
			this.logger.error(`Error sending data to the client! Error: ${error}`);
		}
	}

	protected dataToAll(message: ServerMessage): void {
		for (const index of this.memory.connections.getFilledSlots()) {
			const connection = this.memory.connections.get(index);
			if (connection?.ws) {
				try {
					this.dataTo(connection, message);
				} catch (error) {
					this.logger.error(
						`Error sending data to the client! Error: ${error}`,
					);
				}
			}
		}
	}

	protected dataToAllExcept(
		exceptConnection: Connection,
		message: ServerMessage,
	): void {
		for (const index of this.memory.connections.getFilledSlots()) {
			const connection = this.memory.connections.get(index);
			if (connection?.ws && connection !== exceptConnection) {
				try {
					this.dataTo(connection, message);
				} catch (error) {
					this.logger.error(
						`Error sending data to the client! Error: ${error}`,
					);
				}
			}
		}
	}

	protected dataToWorld(worldId: number, message: ServerMessage): void {
		for (const index of this.memory.connections.getFilledSlots()) {
			const connection = this.memory.connections.get(index);
			if (connection?.getCharacterInUse()?.worldId === worldId) {
				try {
					this.dataTo(connection, message);
				} catch (error) {
					this.logger.error(
						`Error sending data to the map clients! Error: ${error}`,
					);
				}
			}
		}
	}

	protected dataToWorldExcept(
		worldId: number,
		exceptConnection: Connection,
		message: ServerMessage,
	): void {
		for (const index of this.memory.connections.getFilledSlots()) {
			const connection = this.memory.connections.get(index);
			if (
				connection?.ws &&
				connection !== exceptConnection &&
				connection.getCharacterInUse()?.worldId === worldId
			) {
				try {
					this.dataTo(connection, message);
				} catch (error) {
					this.logger.error(
						`Error sending data to the map clients! Error: ${error}`,
					);
				}
			}
		}
	}
}
