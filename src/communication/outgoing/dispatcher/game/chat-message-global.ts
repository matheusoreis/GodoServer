import type { Character } from "../../../../core/game/character";
import { ServerHeaders } from "../../../protocol/server-headers";
import { ServerMessage } from "../../../protocol/server-message";

export class ChatMessageGlobal extends ServerMessage {
  constructor(sender: Character, message: string) {
    super(ServerHeaders.ChatMessageGlobal);

    this.putInt32(sender.id);
    this.putString(sender.name);
    this.putString(message);
  }
}
