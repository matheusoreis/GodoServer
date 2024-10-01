import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class ChatMessageMap extends ServerMessage {
  constructor(sender: CharacterModel, message: string) {
    super(ServerHeaders.ChatMessageMap);

    this.putInt32(sender.id);
    this.putString(sender.name);
    this.putString(message);
  }
}
