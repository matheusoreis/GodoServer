import type { Connection } from "../../net/connection";
import type { Character } from "../character/character";
import { SelectCharacterOutgoing } from "./select-character.outgoing";

export class SelectCharacterCore {
	constructor(connection: Connection, character: Character) {
		this.connection = connection;
		this.character = character;
	}

	public readonly connection: Connection;
	public readonly character: Character;

	public select(): void {
		new SelectCharacterOutgoing(this.character).sendTo(this.connection);
	}
}
