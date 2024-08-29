import { ByteBuffer } from "./byte-buffer";

export class ClientMessage {
  private _buffer: ByteBuffer;

  constructor(buffer: Buffer) {
    this._buffer = new ByteBuffer(buffer);
  }

  public getId(): number {
    return this._buffer.getInt16();
  }

  public getContent(): Buffer {
    return this._buffer.getBytes(this._buffer.getBuffer().length - this._buffer.getOffset());
  }

  public getInt8(): number {
    return this._buffer.getInt8();
  }

  public getInt16(): number {
    return this._buffer.getInt16();
  }

  public getInt32(): number {
    return this._buffer.getInt32();
  }

  public getString(): string {
    return this._buffer.getString();
  }

  public getBytes(length: number): Buffer {
    return this._buffer.getBytes(length);
  }
}
