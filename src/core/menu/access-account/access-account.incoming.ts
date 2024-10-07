import type { Incoming } from "../../../communication/incoming";
import type { ClientMessage } from "../../../communication/protocol/client-message";
import type { Connection } from "../../connection";
import { AccessAccountCore } from "./access-account.core";

export class AccessAccountIncoming implements Incoming {
	public async handle(
		connection: Connection,
		clientMessage: ClientMessage,
	): Promise<void> {
		const email: string = clientMessage.getString();
		const password: string = clientMessage.getString();
		const major: number = clientMessage.getInt16();
		const minor: number = clientMessage.getInt16();
		const revision: number = clientMessage.getInt16();

		await new AccessAccountCore(
			connection,
			email,
			password,
			major,
			minor,
			revision,
		).access();
	}
}
