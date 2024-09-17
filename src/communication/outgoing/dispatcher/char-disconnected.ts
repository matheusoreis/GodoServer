import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharDisconnected extends ServerMessage {
  constructor(char: CharacterModel) {
    super(ServerHeaders.CharMoved);

    this.putInt32(char.id);
  }
}
