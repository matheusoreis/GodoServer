import { ServerHeaders } from "../../../communication/protocol/server-headers";
import { ServerMessage } from "../../../communication/protocol/server-message";

export class CreateCharacterOutgoing extends ServerMessage {
	constructor() {
		super(ServerHeaders.CreateCharacter);
	}
}