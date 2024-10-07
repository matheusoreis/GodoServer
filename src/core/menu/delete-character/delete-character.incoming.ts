import type { Incoming } from "../../../communication/incoming";
import type { ClientMessage } from "../../../communication/protocol/client-message";
import type { Connection } from "../../connection";
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
