import { ByteBuffer } from "./byte-buffer";

export abstract class ServerMessage {
  private _buffer: ByteBuffer;

  constructor(id: number) {
    this._buffer = new ByteBuffer();
    this._buffer.putInt16(id);
  }

  protected putBytes(value: Buffer): void {
    this._buffer.putBytes(value);
  }

  protected putInt8(value: number) {
    this._buffer.putInt8(value);
  }

  protected putInt16(value: number) {
    this._buffer.putInt16(value);
  }

  protected putInt32(value: number) {
    this._buffer.putInt32(value);
  }

  protected putString(value: string) {
    this._buffer.putString(value);
  }

  public getBuffer(): Buffer {
    return this._buffer.getBuffer();
  }
}
