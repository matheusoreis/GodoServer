import { ServerHeaders } from "../../net/protocol/server-headers";
import { ServerMessage } from "../../net/protocol/server-message";

export class ChatOutgoing extends ServerMessage {
	constructor(channel: number, message: string) {
		super(ServerHeaders.ChatMessage);

		this.putInt8(channel);
		this.putString(message);
	}
}
