import type { Connection } from "../../net/connection";
import type { Incoming } from "../../net/messages/incoming";
import type { ClientMessage } from "../../net/protocol/client-message";
import { DeleteCharacterCore } from "./delete-character.core";

export class DeleteCharacterIncoming implements Incoming {
	public async handle(
		connection: Connection,
		clientMessage: ClientMessage,
	): Promise<void> {
		const id: number = clientMessage.getInt32();

		await new DeleteCharacterCore(connection, id).delete();
	}
}
