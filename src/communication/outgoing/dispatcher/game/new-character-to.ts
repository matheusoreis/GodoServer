import type { Character } from "../../../../core/game/character";
import { ServerHeaders } from "../../../protocol/server-headers";
import { ServerMessage } from "../../../protocol/server-message";

export class NewCharacterTo extends ServerMessage {
  constructor(character: Character) {
    super(ServerHeaders.NewCharacterTo);

    this.putInt32(character.id);
    this.putString(character.name);
    this.putString(character.gender.name);
    this.putInt32(character.currentMap);
    this.putInt32(character.mapPositionX);
    this.putInt32(character.mapPositionY);
    this.putInt8(character.direction);
    this.putString(character.defaultSprite);
    this.putString(character.currentSprite);
  }
}
