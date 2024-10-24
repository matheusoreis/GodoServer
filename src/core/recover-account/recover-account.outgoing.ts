import { ServerHeaders } from "../../net/protocol/server-headers";
import { ServerMessage } from "../../net/protocol/server-message";

export class RecoverAccountOutgoing extends ServerMessage {
	constructor() {
		super(ServerHeaders.RecoverAccount);
	}
}
