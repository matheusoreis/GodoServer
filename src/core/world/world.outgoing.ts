import type { Memory } from "../../misc/memory";
import type { Connection } from "../../net/connection";
import type { Character } from "../character/character";
import { WorldCharactersToCore } from "../map-characters-to/map-characters-to.core";
import { NewCharacterToCore } from "../new-character-to/new-character-to.core";
import { SelectCharacterCore } from "../select-character/select-character.core";

export class WorldOutgoing {
	public sendCharacterSelected(
		connection: Connection,
		character: Character,
	): void {
		new SelectCharacterCore(connection, character).select();
	}

	public sendOthersOfNewCharacter(
		connection: Connection,
		mapId: number,
		character: Character,
	): void {
		new NewCharacterToCore(connection, mapId, character).send();
	}

	public sendExistingCharacters(connection: Connection, memory: Memory): void {
		const characters = memory.worldsCharacters.filter(
			(c) => c !== undefined,
		) as Character[];
		new WorldCharactersToCore(connection, characters).send();
	}
}
