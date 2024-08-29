import { ByteBuffer } from "./byte-buffer";

export abstract class ServerMessage {
  private _buffer: ByteBuffer;

  constructor(id: number) {
    this._buffer = new ByteBuffer();
    this._buffer.putInt16(id);
  }

  public putBytes(value: Buffer): void {
    this._buffer.putBytes(value);
  }

  public putInt8(value: number) {
    this._buffer.putInt8(value);
  }

  public putInt16(value: number) {
    this._buffer.putInt16(value);
  }

  public putInt32(value: number) {
    this._buffer.putInt32(value);
  }

  public putString(value: string) {
    this._buffer.putString(value);
  }

  public getBuffer(): Buffer {
    return this._buffer.getBuffer();
  }
}
