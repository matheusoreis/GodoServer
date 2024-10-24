import type { ServerWebSocket } from "bun";
import type { Character } from "../core/character/character";
import { Memory } from "../misc/memory";
import { serviceLocator } from "../misc/service-locator";
import { Handler } from "./handler";
import { ClientMessage } from "./protocol/client-message";

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
		return this.connectionDatabaseId;
	}

	public addCharacters(chars: Character[]): void {
		this.characters = chars;
	}

	public addCharacter(character: Character): void {
		if (!this.characters) {
			this.characters = [];
		}

		if (!this.characters.find((c) => c.id === character.id)) {
			this.characters.push(character);
		}
	}

	public setCharacterInUseById(charId: number): void {
		if (this.characters) {
			const character = this.characters.find((c) => c.id === charId);

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
