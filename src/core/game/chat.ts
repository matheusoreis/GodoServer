import { ChatMessageGlobal } from "../../communication/outgoing/dispatcher/game/chat-message-global";
import { ChatMessageMap } from "../../communication/outgoing/dispatcher/game/chat-message-map";
import { EmoteSent } from "../../communication/outgoing/dispatcher/game/emote-sent";
import { Emotes } from "../../misc/globals";
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

    this.sendEmoteMessage(Emotes.TALKING);
  }

  public sendMessageToGlobal() {
    const chatMessageGlobal: ChatMessageGlobal = new ChatMessageGlobal(this.sender, this.message);
    chatMessageGlobal.sendToAll();
  }

  public sendEmoteMessage(emote: number) {
    const emoteMessage: EmoteSent = new EmoteSent(emote, this.sender);
    emoteMessage.sendToMap(this.sender.currentMap);
  }
}
