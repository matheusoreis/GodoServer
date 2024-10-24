import type { Incoming } from "../../net/messages/incoming";

export class WorldIncoming implements Incoming {
	handle(): void {
		throw new Error("Method not implemented.");
	}
}
