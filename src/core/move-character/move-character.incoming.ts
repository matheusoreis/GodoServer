import { Vector2 } from "../../misc/vector2";
import type { Connection } from "../../net/connection";
import type { Incoming } from "../../net/messages/incoming";
import type { ClientMessage } from "../../net/protocol/client-message";
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
