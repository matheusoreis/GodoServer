import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharacterEntry extends ServerMessage {
  constructor(character: CharacterModel) {
    super(ServerHeaders.CharEntry);

    this.putInt32(character.id);
    this.putString(character.name);
    this.putString(character.gender.name);
    this.putInt16(character.currentMap);
    this.putInt32(character.mapPositionX);
    this.putInt32(character.mapPositionY);
    this.putInt8(character.direction);
  }
}
