import type { Character } from "../../../../core/game/character";
import { ServerHeaders } from "../../../protocol/server-headers";
import { ServerMessage } from "../../../protocol/server-message";

export class EmoteSent extends ServerMessage {
  constructor(emote: number, sender: Character) {
    super(ServerHeaders.EmoteSent);

    this.putInt8(emote);
    this.putInt32(sender.id);
    this.putInt32(sender.currentMap);
  }
}
