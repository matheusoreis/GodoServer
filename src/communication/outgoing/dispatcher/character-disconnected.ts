import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharacterDisconnected extends ServerMessage {
  constructor(character: CharacterModel) {
    super(ServerHeaders.CharacterDisconnected);

    this.putInt32(character.id);
  }
}