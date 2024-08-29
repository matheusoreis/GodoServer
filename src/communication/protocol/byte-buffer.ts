export class ByteBuffer {
  private _buffer: Buffer;
  private _offset: number;

  constructor(initialBuffer: Buffer = Buffer.alloc(0)) {
    this._buffer = initialBuffer;
    this._offset = 0;
  }

  public putBytes(bytes: Buffer): void {
    const newSize = this._buffer.length + bytes.length;
    const newBuffer = Buffer.alloc(newSize);
    this._buffer.copy(newBuffer);
    bytes.copy(newBuffer, this._buffer.length);
    this._buffer = newBuffer;
  }

  public putInt8(value: number): void {
    const buffer = Buffer.alloc(1);
    buffer.writeInt8(value, 0);
    this.putBytes(buffer);
  }

  public putInt16(value: number): void {
    const buffer = Buffer.alloc(2);
    buffer.writeInt16LE(value, 0);
    this.putBytes(buffer);
  }

  public putInt32(value: number): void {
    const buffer = Buffer.alloc(4);
    buffer.writeInt32LE(value, 0);
    this.putBytes(buffer);
  }

  public putString(value: string): void {
    const encoded = Buffer.from(value, "utf8");
    this.putInt32(encoded.length);
    this.putBytes(encoded);
  }

  public getInt8(): number {
    const value = this._buffer.readInt8(this._offset);
    this._offset += 1;
    return value;
  }

  public getInt16(): number {
    const value = this._buffer.readInt16LE(this._offset);
    this._offset += 2;
    return value;
  }

  public getInt32(): number {
    const value = this._buffer.readInt32LE(this._offset);
    this._offset += 4;
    return value;
  }

  public getString(): string {
    const length = this.getInt32();
    const value = this._buffer.subarray(this._offset, this._offset + length);
    this._offset += length;
    return value.toString("utf8");
  }

  public getBytes(length: number): Buffer {
    const value = this._buffer.subarray(this._offset, this._offset + length);
    this._offset += length;
    return value;
  }

  public getBuffer(): Buffer {
    return this._buffer;
  }

  public getOffset(): number {
    return this._offset;
  }

  public setOffset(offset: number): void {
    this._offset = offset;
  }
}
