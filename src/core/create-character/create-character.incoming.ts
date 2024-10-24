import type { Connection } from "../../net/connection";
import type { Incoming } from "../../net/messages/incoming";
import type { ClientMessage } from "../../net/protocol/client-message";
import { CreateCharacterCore } from "./create-character.core";

export class CreateCharacterIncoming implements Incoming {
	public async handle(
		connection: Connection,
		clientMessage: ClientMessage,
	): Promise<void> {
		const name: string = clientMessage.getString();
		const gender: number = clientMessage.getInt8();
		const sprite: string = clientMessage.getString();

		await new CreateCharacterCore(connection, name, gender, sprite).create();
	}
}
