/**
 * A classe `ByteBuffer` fornece uma interface para manipular buffers binários, permitindo
 * a leitura e escrita de dados de diferentes tipos utilizando `Uint8Array`.
 */
export class ByteBuffer {
  private byteBuffer: Uint8Array;
  private offset: number;

  /**
   * Cria uma nova instância de `ByteBuffer`.
   *
   * @param {Uint8Array} [initialBuffer=new Uint8Array(0)] - O buffer inicial a ser usado. Se não fornecido, será um buffer vazio.
   */
  constructor(initialBuffer: Uint8Array = new Uint8Array(0)) {
    this.byteBuffer = initialBuffer;
    this.offset = 0;
  }

  /**
   * Adiciona um `Uint8Array` ao final do buffer existente.
   *
   * @param {Uint8Array} bytes - O buffer de bytes a ser adicionado.
   */
  public putBytes(bytes: Uint8Array): void {
    const newSize = this.byteBuffer.length + bytes.length;
    const newBuffer = new Uint8Array(newSize);
    newBuffer.set(this.byteBuffer);
    newBuffer.set(bytes, this.byteBuffer.length);
    this.byteBuffer = newBuffer;
  }

  /**
   * Adiciona um valor de 8 bits (byte) ao final do buffer.
   *
   * @param {number} value - O valor de 8 bits a ser adicionado.
   */
  public putInt8(value: number): void {
    const buffer = new Uint8Array(1);
    const dataView = new DataView(buffer.buffer);
    dataView.setInt8(0, value);
    this.putBytes(buffer);
  }

  /**
   * Adiciona um valor de 16 bits (short) ao final do buffer.
   *
   * @param {number} value - O valor de 16 bits a ser adicionado.
   */
  public putInt16(value: number): void {
    const buffer = new Uint8Array(2);
    const dataView = new DataView(buffer.buffer);
    dataView.setInt16(0, value, true);
    this.putBytes(buffer);
  }

  /**
   * Adiciona um valor de 32 bits (int) ao final do buffer.
   *
   * @param {number} value - O valor de 32 bits a ser adicionado.
   */
  public putInt32(value: number): void {
    const buffer = new Uint8Array(4);
    const dataView = new DataView(buffer.buffer);
    dataView.setInt32(0, value, true);
    this.putBytes(buffer);
  }

  /**
   * Adiciona uma string ao final do buffer, precedida por seu comprimento em bytes.
   *
   * @param {string} value - A string a ser adicionada.
   */
  public putString(value: string): void {
    const encoded = new TextEncoder().encode(value);
    this.putInt32(encoded.length);
    this.putBytes(encoded);
  }

  /**
   * Lê um valor de 8 bits (byte) do buffer.
   *
   * @returns {number} - O valor de 8 bits lido.
   */
  public getInt8(): number {
    const value = new DataView(this.byteBuffer.buffer).getInt8(this.offset);
    this.offset += 1;
    return value;
  }

  /**
   * Lê um valor de 16 bits (short) do buffer.
   *
   * @returns {number} - O valor de 16 bits lido.
   */
  public getInt16(): number {
    const value = new DataView(this.byteBuffer.buffer).getInt16(this.offset, true);
    this.offset += 2;
    return value;
  }

  /**
   * Lê um valor de 32 bits (int) do buffer.
   *
   * @returns {number} - O valor de 32 bits lido.
   */
  public getInt32(): number {
    const value = new DataView(this.byteBuffer.buffer).getInt32(this.offset, true);
    this.offset += 4;
    return value;
  }

  /**
   * Lê uma string do buffer, precedida por seu comprimento em bytes.
   *
   * @returns {string} - A string lida.
   */
  public getString(): string {
    const length = this.getInt32();
    const value = this.byteBuffer.subarray(this.offset, this.offset + length);
    this.offset += length;
    return new TextDecoder().decode(value);
  }

  /**
   * Lê um número específico de bytes do buffer.
   *
   * @param {number} length - O número de bytes a serem lidos.
   * @returns {Uint8Array} - O buffer contendo os bytes lidos.
   */
  public getBytes(length: number): Uint8Array {
    const value = this.byteBuffer.subarray(this.offset, this.offset + length);
    this.offset += length;
    return value;
  }

  /**
   * Obtém o buffer interno atual.
   *
   * @returns {Uint8Array} - O buffer interno.
   */
  public getBuffer(): Uint8Array {
    return this.byteBuffer;
  }

  /**
   * Obtém o índice de offset atual no buffer.
   *
   * @returns {number} - O offset atual.
   */
  public getOffset(): number {
    return this.offset;
  }

  /**
   * Define um novo índice de offset no buffer.
   *
   * @param {number} offset - O novo índice de offset.
   */
  public setOffset(offset: number): void {
    this.offset = offset;
  }
}
