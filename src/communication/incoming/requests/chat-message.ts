import { Chat } from "../../../core/chat";
import type { Connection } from "../../../core/connection";
import { Alert } from "../../outgoing/dispatcher/alert";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

enum ChatChannels {
  Map,
  Global,
}

export class ChatMessage implements Incoming {
  handle(connection: Connection, clientMessage: ClientMessage): void {
    const channel: number = clientMessage.getInt8();
    const message: string = clientMessage.getString();

    const charInUse = connection.getCharInUse();
    if (!charInUse) {
      new Alert("Você não está com um personagem válido, desconectando...", true).sendTo(connection);

      return;
    }

    const chat: Chat = new Chat(channel, charInUse, message);

    switch (channel) {
      case ChatChannels.Map:
        chat.sendMessageToMap();
        break;

      case ChatChannels.Global:
        chat.sendMessageToGlobal();
        break;

      default:
        new Alert("Você não está com um personagem válido, desconectando...", true).sendTo(connection);
        break;
    }
  }
}
