import { ServerHeaders } from "../../net/protocol/server-headers";
import { ServerMessage } from "../../net/protocol/server-message";
import type { Character } from "../character/character";

export class SelectCharacterOutgoing extends ServerMessage {
	constructor(character: Character) {
		super(ServerHeaders.SelectCharacter);

		this.putInt32(character.id);
		this.putString(character.name);
		this.putString(character.gender);
		this.putInt32(character.worldId);
		this.putInt32(character.position.x);
		this.putInt32(character.position.y);
		this.putInt8(character.direction);
		this.putString(character.defaultSprite);
	}
}
