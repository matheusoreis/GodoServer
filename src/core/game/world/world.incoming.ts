import type { Incoming } from "../../../communication/incoming";

export class WorldIncoming implements Incoming {
	handle(): void {
		throw new Error("Method not implemented.");
	}
}
