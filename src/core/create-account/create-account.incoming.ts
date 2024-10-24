import type { Connection } from "../../net/connection";
import type { Incoming } from "../../net/messages/incoming";
import type { ClientMessage } from "../../net/protocol/client-message";
import { CreateAccountCore } from "./create-account.core";

export class CreateAccountIncoming implements Incoming {
	public async handle(
		connection: Connection,
		clientMessage: ClientMessage,
	): Promise<void> {
		const email: string = clientMessage.getString();
		const password: string = clientMessage.getString();
		const rePassword: string = clientMessage.getString();
		const major: number = clientMessage.getInt16();
		const minor: number = clientMessage.getInt16();
		const revision: number = clientMessage.getInt16();

		await new CreateAccountCore(
			connection,
			email,
			password,
			rePassword,
			major,
			minor,
			revision,
		).create();
	}
}
