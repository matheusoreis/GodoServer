import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharList extends ServerMessage {
  constructor(chars: CharacterModel[]) {
    super(ServerHeaders.CharList);

    this.putInt8(chars.length);
    this.putInt8(5);

    for (const char of chars) {
      this.putInt32(char.id);
      this.putInt32(char.accountId!);
      this.putString(char.name);
      this.putString(char.gender.name);
    }
  }
}
