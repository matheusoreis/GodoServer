import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class OthersChars extends ServerMessage {
  constructor(mapId: number, chars: CharacterModel[]) {
    super(ServerHeaders.OthersChars);

    this.putInt16(mapId);
    this.putInt16(chars.length);

    for (const char of chars) {
      this.putInt32(char.id);
      this.putString(char.name);
      this.putString(char.gender.name);
      this.putInt16(char.currentMap);
      this.putInt32(char.mapPositionX);
      this.putInt32(char.mapPositionY);
      this.putInt8(char.direction);
    }
  }
}
