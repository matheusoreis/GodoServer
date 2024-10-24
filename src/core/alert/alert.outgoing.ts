import { ServerHeaders } from "../../net/protocol/server-headers";
import { ServerMessage } from "../../net/protocol/server-message";

export class AlertOutgoing extends ServerMessage {
	constructor(message: string, disconnect: boolean) {
		super(ServerHeaders.Alert);
		this.putString(message);
		this.putInt8(disconnect ? 1 : 0);
	}
}
