import type { Character } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharacterDisconnected extends ServerMessage {
  constructor(character: Character) {
    super(ServerHeaders.CharacterDisconnected);

    this.putInt32(character.id);
    this.putInt32(character.currentMap);
  }
}
