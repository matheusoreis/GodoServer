import { ServerHeaders } from "../../net/protocol/server-headers";
import { ServerMessage } from "../../net/protocol/server-message";

export class AccessAccountOutgoing extends ServerMessage {
	constructor() {
		super(ServerHeaders.AccessAccount);
	}
}
