import { ServerHeaders } from "../../net/protocol/server-headers";
import { ServerMessage } from "../../net/protocol/server-message";

export class ChangePasswordOutgoing extends ServerMessage {
	constructor() {
		super(ServerHeaders.ChangePassword);
	}
}
