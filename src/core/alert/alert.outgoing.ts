import { ServerHeaders } from "../../communication/protocol/server-headers";
import { ServerMessage } from "../../communication/protocol/server-message";

export class AlertOutgoing extends ServerMessage {
	constructor(message: string, disconnect: boolean) {
		super(ServerHeaders.Alert);
		this.putString(message);
		this.putInt8(disconnect ? 1 : 0);
	}
}
