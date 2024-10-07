import type { Incoming } from "../../../communication/incoming";
import type { ClientMessage } from "../../../communication/protocol/client-message";
import { Vector2 } from "../../../misc/vector2";
import type { Connection } from "../../connection";
import { MoveCharacterCore } from "./move-character.core";

export class MoveCharacterIncoming implements Incoming {
	public async handle(
		connection: Connection,
		clientMessage: ClientMessage,
	): Promise<void> {
		const action: number = clientMessage.getInt8();
		const positionX: number = clientMessage.getInt32();
		const positionY: number = clientMessage.getInt32();
		const direction: number = clientMessage.getInt8();
		const velocityX: number = clientMessage.getInt32();
		const velocityY: number = clientMessage.getInt32();

		const position: Vector2 = new Vector2(positionX, positionY);
		const velocity: Vector2 = new Vector2(velocityX, velocityY);

		await new MoveCharacterCore(
			connection,
			action,
			position,
			direction,
			velocity,
		).move();
	}
}
