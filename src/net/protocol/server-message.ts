import type { Connection } from "../../../core/connection";
import { serviceLocator } from "../../../misc/service-locator";
import { ByteBuffer } from "../../buffers/byte-buffer";
import { Outgoing } from "../outgoing";

export abstract class ServerMessage extends Outgoing {
	constructor(id: number) {
		super();
		this.byteBuffer = serviceLocator.get<ByteBuffer>(ByteBuffer);
		this.byteBuffer.putInt16(id);
	}

	private byteBuffer: ByteBuffer;

	protected putBytes(value: Uint8Array): void {
		this.byteBuffer.putBytes(value);
	}

	protected putInt8(value: number) {
		this.byteBuffer.putInt8(value);
	}

	protected putInt16(value: number) {
		this.byteBuffer.putInt16(value);
	}

	protected putInt32(value: number): void {
		this.byteBuffer.putInt32(value);
	}

	protected putString(value: string): void {
		this.byteBuffer.putString(value);
	}

	public getBuffer(): Uint8Array {
		return this.byteBuffer.getBuffer();
	}

	public sendTo(connection: Connection): void {
		this.dataTo(connection, this);
	}

	public sendToAll(): void {
		this.dataToAll(this);
	}

	public sendToAllExcept(exceptConnection: Connection): void {
		this.dataToAllExcept(exceptConnection, this);
	}

	public sendToWorld(worldId: number): void {
		this.dataToWorld(worldId, this);
	}

	public sendToWorldExcept(
		worldId: number,
		exceptConnection: Connection,
	): void {
		this.dataToWorldExcept(worldId, exceptConnection, this);
	}
}
