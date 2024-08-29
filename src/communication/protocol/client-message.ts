import { ByteBuffer } from "./byte-buffer";

/**
 * A classe `ClientMessage` encapsula uma mensagem recebida de um cliente,
 * fornecendo métodos para acessar e interpretar os dados da mensagem.
 */
export class ClientMessage {
  private _buffer: ByteBuffer;

  /**
   * Cria uma nova instância de `ClientMessage`.
   *
   * @param {Buffer} buffer - O buffer que contém a mensagem do cliente.
   */
  constructor(buffer: Buffer) {
    this._buffer = new ByteBuffer(buffer);
  }

  /**
   * Obtém o identificador da mensagem a partir do buffer.
   *
   * @returns {number} - O identificador da mensagem.
   */
  public getId(): number {
    return this._buffer.getInt16();
  }

  /**
   * Obtém o conteúdo da mensagem a partir do buffer, excluindo o identificador.
   *
   * @returns {Buffer} - O buffer contendo o conteúdo da mensagem.
   */
  public getContent(): Buffer {
    return this._buffer.getBytes(this._buffer.getBuffer().length - this._buffer.getOffset());
  }

  /**
   * Lê um valor de 8 bits (byte) do buffer da mensagem.
   *
   * @returns {number} - O valor de 8 bits lido.
   */
  public getInt8(): number {
    return this._buffer.getInt8();
  }

  /**
   * Lê um valor de 16 bits (short) do buffer da mensagem.
   *
   * @returns {number} - O valor de 16 bits lido.
   */
  public getInt16(): number {
    return this._buffer.getInt16();
  }

  /**
   * Lê um valor de 32 bits (int) do buffer da mensagem.
   *
   * @returns {number} - O valor de 32 bits lido.
   */
  public getInt32(): number {
    return this._buffer.getInt32();
  }

  /**
   * Lê uma string do buffer da mensagem.
   *
   * @returns {string} - A string lida do buffer.
   */
  public getString(): string {
    return this._buffer.getString();
  }

  /**
   * Lê um número específico de bytes do buffer da mensagem.
   *
   * @param {number} length - O número de bytes a serem lidos.
   * @returns {Buffer} - O buffer contendo os bytes lidos.
   */
  public getBytes(length: number): Buffer {
    return this._buffer.getBytes(length);
  }
}
