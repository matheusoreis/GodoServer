import type { Incoming } from "../../../communication/incoming";

export class NewCharacterToIncoming implements Incoming {
	handle(): void {
		throw new Error("Method not implemented.");
	}
}
