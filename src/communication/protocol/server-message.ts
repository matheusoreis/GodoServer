import { ByteBuffer } from "./byte-buffer";

/**
 * A classe abstrata `ServerMessage` fornece a base para a construção de mensagens a serem enviadas
 * pelo servidor para os clientes. Ela gerencia o bytebuffer usado para armazenar e manipular
 * os dados da mensagem.
 */
export abstract class ServerMessage {
  private _buffer: ByteBuffer;

  /**
   * Cria uma nova instância de `ServerMessage` com um identificador.
   *
   * @param {number} id - O identificador da mensagem.
   */
  constructor(id: number) {
    this._buffer = new ByteBuffer();
    this._buffer.putInt16(id);
  }

  /**
   * Adiciona uma sequência de bytes ao buffer da mensagem.
   *
   * @param {Buffer} value - O buffer contendo os bytes a serem adicionados.
   */
  protected putBytes(value: Buffer): void {
    this._buffer.putBytes(value);
  }

  /**
   * Adiciona um valor de 8 bits (byte) ao buffer da mensagem.
   *
   * @param {number} value - O valor de 8 bits a ser adicionado.
   */
  protected putInt8(value: number) {
    this._buffer.putInt8(value);
  }

  /**
   * Adiciona um valor de 16 bits (short) ao buffer da mensagem.
   *
   * @param {number} value - O valor de 16 bits a ser adicionado.
   */
  protected putInt16(value: number) {
    this._buffer.putInt16(value);
  }

  /**
   * Adiciona um valor de 32 bits (int) ao buffer da mensagem.
   *
   * @param {number} value - O valor de 32 bits a ser adicionado.
   */
  protected putInt32(value: number): void {
    this._buffer.putInt32(value);
  }

  /**
   * Adiciona uma string codificada ao buffer da mensagem.
   *
   * @param {string} value - A string a ser adicionada ao buffer.
   */
  protected putString(value: string): void {
    this._buffer.putString(value);
  }

  /**
   * Obtém o buffer completo da mensagem.
   *
   * @returns {Buffer} - O buffer que contém todos os dados da mensagem.
   */
  public getBuffer(): Buffer {
    return this._buffer.getBuffer();
  }
}
