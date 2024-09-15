import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharList extends ServerMessage {
  constructor(chars: CharacterModel[], accountCharSize: number) {
    super(ServerHeaders.CharList);

    this.putInt8(chars.length);
    this.putInt8(accountCharSize);

    for (const char of chars) {
      this.putInt32(char.id);
      this.putString(char.name);
      this.putString(char.gender.name);
      this.putInt32(char.currentMap);
      this.putInt32(char.mapPositionX);
      this.putInt32(char.mapPositionY);
      this.putInt32(char.direction);
    }
  }
}
