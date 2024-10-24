import type { Connection } from "../../net/connection";
import type { Incoming } from "../../net/messages/incoming";
import type { ClientMessage } from "../../net/protocol/client-message";
import { ChatChannel, ChatCore } from "./chat.core";

export class ChatIncoming implements Incoming {
	public handle(connection: Connection, clientMessage: ClientMessage): void {
		const channel: number = clientMessage.getInt8();
		const message: string = clientMessage.getString();
		const worldId: number = clientMessage.getInt32();

		if (channel < 0 || channel > ChatChannel.GLOBAL) {
			connection.close();

			return;
		}

		if (!this.isValidMessage(message)) {
			connection.close();

			return;
		}

		if (channel === ChatChannel.MAP) {
			new ChatCore(connection, channel, message).mapMessage(worldId);
		} else if (channel === ChatChannel.GLOBAL) {
			new ChatCore(connection, channel, message).globalMessage();
		}
	}

	private isValidMessage(message: string): boolean {
		return (
			message.length > 0 && /^[\p{L}\p{M}\p{Z}\p{S}\p{P}\p{N}]+$/u.test(message)
		);
	}
}
