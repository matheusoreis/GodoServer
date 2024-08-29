import { Memory } from "../../core/memory";
import { Logger } from "../../misc/logger";
import type { Slots } from "../../misc/slots";
import type { Connection } from "../../net/connection";
import type { ServerMessage } from "../protocol/server-message";

/**
 * A classe abstrata `Outgoing` gerencia o envio de mensagens para clientes conectados.
 *
 * Fornece métodos para enviar mensagens para um único cliente, todos os clientes, ou todos exceto um específico.
 */
export abstract class Outgoing {
  /**
   * Cria uma nova instância de `Outgoing`, inicializando o logger e a lista de conexões.
   */
  constructor() {
    this.logger = new Logger();
    this.connection = new Memory().connections;
  }

  private logger: Logger;
  private connection: Slots<Connection>;

  /**
   * Envia uma mensagem para um cliente específico.
   *
   * @param {Connection} connection - A conexão do cliente para o qual a mensagem será enviada.
   * @param {ServerMessage} message - A mensagem a ser enviada.
   */
  public dataTo(connection: Connection, message: ServerMessage): void {
    try {
      connection.ws.send(message.getBuffer());
    } catch (error) {
      this.logger.error("Error sending data to the client! Error: " + error);
    }
  }

  /**
   * Envia uma mensagem para todos os clientes conectados.
   *
   * @param {ServerMessage} message - A mensagem a ser enviada a todos os clientes.
   */
  public dataToAll(message: ServerMessage): void {
    for (const index of this.connection.getFilledSlots()) {
      const connection = this.connection.get(index);
      if (connection?.ws) {
        try {
          this.dataTo(connection, message);
        } catch (error) {
          this.logger.error("Error sending data to the client! Error: " + error);
        }
      }
    }
  }

  /**
   * Envia uma mensagem para todos os clientes conectados, exceto para um cliente específico.
   *
   * @param {Connection} exceptConnection - A conexão do cliente que não deve receber a mensagem.
   * @param {ServerMessage} message - A mensagem a ser enviada a todos os clientes exceto o especificado.
   */
  public dataToAllExcept(exceptConnection: Connection, message: ServerMessage): void {
    for (const index of this.connection.getFilledSlots()) {
      const connection = this.connection.get(index);
      if (connection?.ws && connection !== exceptConnection) {
        try {
          this.dataTo(connection, message);
        } catch (error) {
          this.logger.error("Error sending data to the client! Error: " + error);
        }
      }
    }
  }

  public dataToMap(mapId: number, message: ServerMessage): void {
    throw new Error("Method not implemented.");
  }

  public dataToMapExcept(mapId: number, exceptConnection: Connection, message: ServerMessage): void {
    throw new Error("Method not implemented.");
  }
}
