/**
 * A classe `ByteBuffer` fornece uma interface para manipular buffers binários, permitindo
 * a leitura e escrita de dados de diferentes tipos.
 */
export class ByteBuffer {
  private _buffer: Buffer;
  private _offset: number;

  /**
   * Cria uma nova instância de `ByteBuffer`.
   *
   * @param {Buffer} [initialBuffer=Buffer.alloc(0)] - O buffer inicial a ser usado. Se não fornecido, será um buffer vazio.
   */
  constructor(initialBuffer: Buffer = Buffer.alloc(0)) {
    this._buffer = initialBuffer;
    this._offset = 0;
  }

  /**
   * Adiciona um buffer de bytes ao final do buffer existente.
   *
   * @param {Buffer} bytes - O buffer de bytes a ser adicionado.
   */
  public putBytes(bytes: Buffer): void {
    const newSize = this._buffer.length + bytes.length;
    const newBuffer = Buffer.alloc(newSize);
    this._buffer.copy(newBuffer);
    bytes.copy(newBuffer, this._buffer.length);
    this._buffer = newBuffer;
  }

  /**
   * Adiciona um valor de 8 bits (byte) ao final do buffer.
   *
   * @param {number} value - O valor de 8 bits a ser adicionado.
   */
  public putInt8(value: number): void {
    const buffer = Buffer.alloc(1);
    buffer.writeInt8(value, 0);
    this.putBytes(buffer);
  }

  /**
   * Adiciona um valor de 16 bits (short) ao final do buffer.
   *
   * @param {number} value - O valor de 16 bits a ser adicionado.
   */
  public putInt16(value: number): void {
    const buffer = Buffer.alloc(2);
    buffer.writeInt16LE(value, 0);
    this.putBytes(buffer);
  }

  /**
   * Adiciona um valor de 32 bits (int) ao final do buffer.
   *
   * @param {number} value - O valor de 32 bits a ser adicionado.
   */
  public putInt32(value: number): void {
    const buffer = Buffer.alloc(4);
    buffer.writeInt32LE(value, 0);
    this.putBytes(buffer);
  }

  /**
   * Adiciona uma string ao final do buffer, precedida por seu comprimento em bytes.
   *
   * @param {string} value - A string a ser adicionada.
   */
  public putString(value: string): void {
    const encoded = Buffer.from(value, "utf8");
    this.putInt32(encoded.length);
    this.putBytes(encoded);
  }

  /**
   * Lê um valor de 8 bits (byte) do buffer.
   *
   * @returns {number} - O valor de 8 bits lido.
   */
  public getInt8(): number {
    const value = this._buffer.readInt8(this._offset);
    this._offset += 1;
    return value;
  }

  /**
   * Lê um valor de 16 bits (short) do buffer.
   *
   * @returns {number} - O valor de 16 bits lido.
   */
  public getInt16(): number {
    const value = this._buffer.readInt16LE(this._offset);
    this._offset += 2;
    return value;
  }

  /**
   * Lê um valor de 32 bits (int) do buffer.
   *
   * @returns {number} - O valor de 32 bits lido.
   */
  public getInt32(): number {
    const value = this._buffer.readInt32LE(this._offset);
    this._offset += 4;
    return value;
  }

  /**
   * Lê uma string do buffer, precedida por seu comprimento em bytes.
   *
   * @returns {string} - A string lida.
   */
  public getString(): string {
    const length = this.getInt32();
    const value = this._buffer.subarray(this._offset, this._offset + length);
    this._offset += length;
    return value.toString("utf8");
  }

  /**
   * Lê um número específico de bytes do buffer.
   *
   * @param {number} length - O número de bytes a serem lidos.
   * @returns {Buffer} - O buffer contendo os bytes lidos.
   */
  public getBytes(length: number): Buffer {
    const value = this._buffer.subarray(this._offset, this._offset + length);
    this._offset += length;
    return value;
  }

  /**
   * Obtém o buffer interno atual.
   *
   * @returns {Buffer} - O buffer interno.
   */
  public getBuffer(): Buffer {
    return this._buffer;
  }

  /**
   * Obtém o índice de offset atual no buffer.
   *
   * @returns {number} - O offset atual.
   */
  public getOffset(): number {
    return this._offset;
  }

  /**
   * Define um novo índice de offset no buffer.
   *
   * @param {number} offset - O novo índice de offset.
   */
  public setOffset(offset: number): void {
    this._offset = offset;
  }
}
