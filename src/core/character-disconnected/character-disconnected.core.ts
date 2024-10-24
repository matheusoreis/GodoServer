import { CharacterDisconnectedOutgoing } from "./character-disconnected.outgoing";

export class CharacterDisconnectedCore {
	constructor(id: number, worldId: number) {
		this.id = id;
		this.worldId = worldId;
	}

	private readonly id: number;
	private readonly worldId: number;

	public async disconnect(): Promise<void> {
		new CharacterDisconnectedOutgoing(this.id, this.worldId).sendToWorld(
			this.worldId,
		);
	}
}
