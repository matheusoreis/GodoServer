import { ServerHeaders } from "../../../communication/protocol/server-headers";
import { ServerMessage } from "../../../communication/protocol/server-message";

export class ChatOutgoing extends ServerMessage {
	constructor(channel: number, message: string) {
		super(ServerHeaders.ChatMessage);

		this.putInt8(channel);
		this.putString(message);
	}
}
