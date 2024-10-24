import { serviceLocator } from "../../../misc/service-locator";
import { ByteBuffer } from "../../buffers/byte-buffer";

export class ClientMessage {
	private byteBuffer: ByteBuffer;

	constructor() {
		this.byteBuffer = serviceLocator.get<ByteBuffer>(ByteBuffer);
	}

	public setBuffer(buffer: Uint8Array): void {
		this.byteBuffer = new ByteBuffer(buffer);
	}

	public getId(): number {
		return this.byteBuffer.getInt16();
	}

	public getContent(): Uint8Array {
		return this.byteBuffer.getBytes(
			this.byteBuffer.getBuffer().length - this.byteBuffer.getOffset(),
		);
	}

	public getInt8(): number {
		return this.byteBuffer.getInt8();
	}

	public getInt16(): number {
		return this.byteBuffer.getInt16();
	}

	public getInt32(): number {
		return this.byteBuffer.getInt32();
	}

	public getString(): string {
		return this.byteBuffer.getString();
	}

	public getBytes(length: number): Uint8Array {
		return this.byteBuffer.getBytes(length);
	}
}
