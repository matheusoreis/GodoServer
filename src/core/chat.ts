import { ChatMessageBubble } from "../communication/outgoing/dispatcher/chat-message-bubble";
import { ChatMessageGlobal } from "../communication/outgoing/dispatcher/chat-message-global";
import { ChatMessageMap } from "../communication/outgoing/dispatcher/chat-message-map";
import type { Character } from "./character";

export class Chat {
  constructor(channel: number, sender: Character, message: string) {
    this.channel = channel;
    this.sender = sender;
    this.message = message;
  }

  public readonly channel: number;
  public readonly sender: Character;
  public readonly message: string;

  public sendMessageToMap() {
    const chatMessageMap: ChatMessageMap = new ChatMessageMap(this.sender, this.message);
    chatMessageMap.sendToMap(this.sender.currentMap);

    this.sendChatBubble();
  }

  public sendMessageToGlobal() {
    const chatMessageGlobal: ChatMessageGlobal = new ChatMessageGlobal(this.sender, this.message);
    chatMessageGlobal.sendToAll();
  }

  public sendChatBubble() {
    const chatMessageBubble: ChatMessageBubble = new ChatMessageBubble(this.channel, this.sender, this.message);
    chatMessageBubble.sendToMap(this.sender.currentMap);
  }
}
