import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class ChatMessageBubble extends ServerMessage {
  constructor(channel: number, sender: CharacterModel, message: string) {
    super(ServerHeaders.ChatMessageBubble);

    this.putInt8(channel);
    this.putInt32(sender.id);
    this.putString(sender.name);
    this.putString(message);
  }
}
