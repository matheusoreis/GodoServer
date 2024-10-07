import type { Character } from "../character/character";
import type { Connection } from "../../connection";
import { MapCharactersToOutgoing } from "./map-characters-to.outgoing";

export class WorldCharactersToCore {
	constructor(connection: Connection, characters: Character[]) {
		this.connection = connection;
		this.characters = characters;
	}

	public readonly connection: Connection;
	public readonly characters: Character[];

	public send(): void {
		new MapCharactersToOutgoing(this.characters).sendTo(this.connection);
	}
}
