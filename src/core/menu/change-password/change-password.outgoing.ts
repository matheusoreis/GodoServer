import { ServerHeaders } from "../../../communication/protocol/server-headers";
import { ServerMessage } from "../../../communication/protocol/server-message";

export class ChangePasswordOutgoing extends ServerMessage {
	constructor() {
		super(ServerHeaders.ChangePassword);
	}
}
