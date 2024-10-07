import type { Character } from "../character/character";
import type { Connection } from "../../connection";
import { NewCharacterToOutgoing } from "./new-character-to.outgoing";

export class NewCharacterToCore {
	constructor(connection: Connection, mapId: number, character: Character) {
		this.connection = connection;
		this.mapId = mapId;
		this.character = character;
	}

	public readonly connection: Connection;
	public readonly mapId: number;
	public readonly character: Character;

	public send(): void {
		new NewCharacterToOutgoing(this.character).sendToWorldExcept(
			this.mapId,
			this.connection,
		);
	}
}
