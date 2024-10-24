import { ServerHeaders } from "../../net/protocol/server-headers";
import { ServerMessage } from "../../net/protocol/server-message";

export class DeleteCharacterOutgoing extends ServerMessage {
	constructor() {
		super(ServerHeaders.DeleteCharacter);
	}
}
