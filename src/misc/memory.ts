import {
	MAX_PLAYERS,
	MAX_WORLDS,
	MAX_WORLD_CHARACTERS,
} from "../misc/constants";
import { Slots } from "../misc/slots";
import type { Character } from "./character/character";
import type { Connection } from "./connection";
import type { WorldCore } from "./world/world.core";

export class Memory {
	public connections: Slots<Connection> = new Slots<Connection>(MAX_PLAYERS);
	public worlds: Slots<WorldCore> = new Slots<WorldCore>(MAX_WORLDS);
	public worldsCharacters: Slots<Character> = new Slots<Character>(
		MAX_WORLD_CHARACTERS,
	);
}
