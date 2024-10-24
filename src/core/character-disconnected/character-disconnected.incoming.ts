import type { Incoming } from "../../net/messages/incoming";

export class CharacterDisconnectedIncoming implements Incoming {
	handle(): void {
		throw new Error("Method not implemented.");
	}
}
