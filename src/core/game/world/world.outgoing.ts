import type { Character } from "../character/character";
import type { Connection } from "../../connection";
import type { Memory } from "../../memory";
import { SelectCharacterCore } from "../../menu/select-character/select-character.core";
import { WorldCharactersToCore } from "../map-characters-to/map-characters-to.core";
import { NewCharacterToCore } from "../new-character-to/new-character-to.core";

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
