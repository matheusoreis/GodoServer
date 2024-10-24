import { ServerHeaders } from "../../net/protocol/server-headers";
import { ServerMessage } from "../../net/protocol/server-message";

export class DeleteAccountOutgoing extends ServerMessage {
	constructor() {
		super(ServerHeaders.DeleteAccount);
	}
}
