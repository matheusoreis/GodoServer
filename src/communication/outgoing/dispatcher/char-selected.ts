import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharSelected extends ServerMessage {
  constructor(char: CharacterModel) {
    super(ServerHeaders.CharSelected);

    this.putInt32(char.id);
    this.putString(char.name);
    this.putString(char.gender.name);
    this.putInt16(char.currentMap);
    this.putInt32(char.mapPositionX);
    this.putInt32(char.mapPositionY);
    this.putInt8(char.direction);
  }
}
