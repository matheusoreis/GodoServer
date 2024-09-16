import type { Connection } from "../../core/connection";
import { serviceLocator } from "../../misc/service-locator";
import { Outgoing } from "../outgoing/outgoing";
import { ByteBuffer } from "./byte-buffer";

/**
 * A classe abstrata `ServerMessage` fornece a base para a construção de mensagens a serem enviadas
 * pelo servidor para os clientes. Ela gerencia o bytebuffer usado para armazenar e manipular
 * os dados da mensagem.
 */
export abstract class ServerMessage extends Outgoing {
  /**
   * Cria uma nova instância de `ServerMessage` com um identificador.
   *
   * @param {number} id - O identificador da mensagem.
   */
  constructor(id: number) {
    super();
    this.byteBuffer = serviceLocator.get<ByteBuffer>(ByteBuffer);
    this.byteBuffer.putInt16(id);
  }

  private byteBuffer: ByteBuffer;

  /**
   * Adiciona uma sequência de bytes ao buffer da mensagem.
   *
   * @param {Buffer} value - O buffer contendo os bytes a serem adicionados.
   */
  protected putBytes(value: Buffer): void {
    this.byteBuffer.putBytes(value);
  }

  /**
   * Adiciona um valor de 8 bits (byte) ao buffer da mensagem.
   *
   * @param {number} value - O valor de 8 bits a ser adicionado.
   */
  protected putInt8(value: number) {
    this.byteBuffer.putInt8(value);
  }

  /**
   * Adiciona um valor de 16 bits (short) ao buffer da mensagem.
   *
   * @param {number} value - O valor de 16 bits a ser adicionado.
   */
  protected putInt16(value: number) {
    this.byteBuffer.putInt16(value);
  }

  /**
   * Adiciona um valor de 32 bits (int) ao buffer da mensagem.
   *
   * @param {number} value - O valor de 32 bits a ser adicionado.
   */
  protected putInt32(value: number): void {
    this.byteBuffer.putInt32(value);
  }

  /**
   * Adiciona uma string codificada ao buffer da mensagem.
   *
   * @param {string} value - A string a ser adicionada ao buffer.
   */
  protected putString(value: string): void {
    this.byteBuffer.putString(value);
  }

  /**
   * Obtém o buffer completo da mensagem.
   *
   * @returns {Buffer} - O buffer que contém todos os dados da mensagem.
   */
  public getBuffer(): Buffer {
    return this.byteBuffer.getBuffer();
  }

  /**
   * Envia a mensagem para o cliente especificado.
   *
   * @param {Connection} connection - A conexão do cliente para o qual a mensagem será enviada.
   */
  public sendTo(connection: Connection): void {
    this.dataTo(connection, this);
  }

  /**
   * Envia a mensagem para todos os clientes conectados.
   *
   * O método `dataToAll` da classe `Outgoing` é usado para enviar a mensagem a todos os clientes conectados.
   */
  public sendToAll(): void {
    this.dataToAll(this);
  }

  /**
   * Envia a mensagem para todos os clientes conectados, exceto para o cliente especificado.
   *
   * @param {Connection} exceptConnection - A conexão do cliente que não deve receber a mensagem.
   */
  public sendToAllExcept(exceptConnection: Connection): void {
    this.dataToAllExcept(exceptConnection, this);
  }

  public sendToMap(mapId: number): void {
    this.dataToMap(mapId, this);
  }

  public sendToMapExcept(mapId: number, exceptConnection: Connection): void {
    this.dataToMapExcept(mapId, exceptConnection, this);
  }
}
