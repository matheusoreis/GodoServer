export class ByteBuffer {
	private byteBuffer: Uint8Array;
	private offset: number;

	constructor(initialBuffer: Uint8Array = new Uint8Array(0)) {
		this.byteBuffer = initialBuffer;
		this.offset = 0;
	}

	private ensureCapacity(additionalBytes: number): void {
		const requiredCapacity = this.byteBuffer.length + additionalBytes;
		if (requiredCapacity > this.byteBuffer.length) {
			const newBuffer = new Uint8Array(requiredCapacity);
			newBuffer.set(this.byteBuffer);
			this.byteBuffer = newBuffer;
		}
	}

	public putBytes(bytes: Uint8Array): void {
		this.ensureCapacity(bytes.length);
		this.byteBuffer.set(bytes, this.byteBuffer.length - bytes.length);
	}

	public putInt8(value: number): void {
		const buffer = new Uint8Array(1);
		const dataView = new DataView(buffer.buffer);
		dataView.setInt8(0, value);
		this.putBytes(buffer);
	}

	public putInt16(value: number): void {
		const buffer = new Uint8Array(2);
		const dataView = new DataView(buffer.buffer);
		dataView.setInt16(0, value, true);
		this.putBytes(buffer);
	}

	public putInt32(value: number): void {
		const buffer = new Uint8Array(4);
		const dataView = new DataView(buffer.buffer);
		dataView.setInt32(0, value, true);
		this.putBytes(buffer);
	}

	public putString(value: string): void {
		const encoded = new TextEncoder().encode(value);
		this.putInt32(encoded.length);
		this.putBytes(encoded);
	}

	public getInt8(): number {
		const value = new DataView(this.byteBuffer.buffer).getInt8(this.offset);
		this.offset += 1;
		return value;
	}

	public getInt16(): number {
		const value = new DataView(this.byteBuffer.buffer).getInt16(
			this.offset,
			true,
		);
		this.offset += 2;
		return value;
	}

	public getInt32(): number {
		const value = new DataView(this.byteBuffer.buffer).getInt32(
			this.offset,
			true,
		);
		this.offset += 4;
		return value;
	}

	public getString(): string {
		const length = this.getInt32();
		const value = this.byteBuffer.subarray(this.offset, this.offset + length);
		this.offset += length;
		return new TextDecoder().decode(value);
	}

	public getBytes(length: number): Uint8Array {
		const value = this.byteBuffer.subarray(this.offset, this.offset + length);
		this.offset += length;
		return value;
	}

	public getBuffer(): Uint8Array {
		return this.byteBuffer;
	}

	public getOffset(): number {
		return this.offset;
	}

	public setOffset(offset: number): void {
		this.offset = offset;
	}
}
