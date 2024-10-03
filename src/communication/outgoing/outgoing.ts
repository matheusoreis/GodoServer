import { Logger } from "../../misc/logger";
import type { Connection } from "../../core/shared/connection";
import type { ServerMessage } from "../protocol/server-message";
import { serviceLocator } from "../../misc/service-locator";
import { Memory } from "../../core/shared/memory";

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
    this.logger = serviceLocator.get<Logger>(Logger);
    this.memory = serviceLocator.get<Memory>(Memory);
  }

  private logger: Logger;
  private memory: Memory;

  /**
   * Envia uma mensagem para um cliente específico.
   *
   * @param {Connection} connection - A conexão do cliente para o qual a mensagem será enviada.
   * @param {ServerMessage} message - A mensagem a ser enviada.
   */
  protected dataTo(connection: Connection, message: ServerMessage): void {
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
  protected dataToAll(message: ServerMessage): void {
    for (const index of this.memory.connections.getFilledSlots()) {
      const connection = this.memory.connections.get(index);
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
  protected dataToAllExcept(exceptConnection: Connection, message: ServerMessage): void {
    for (const index of this.memory.connections.getFilledSlots()) {
      const connection = this.memory.connections.get(index);
      if (connection?.ws && connection !== exceptConnection) {
        try {
          this.dataTo(connection, message);
        } catch (error) {
          this.logger.error("Error sending data to the client! Error: " + error);
        }
      }
    }
  }

  /**
   * Envia uma mensagem para todos os clientes no mapa especificado.
   *
   * @param {number} mapId - O ID do mapa.
   * @param {ServerMessage} message - A mensagem a ser enviada aos clientes no mapa.
   */
  protected dataToMap(mapId: number, message: ServerMessage): void {
    for (const index of this.memory.connections.getFilledSlots()) {
      const connection = this.memory.connections.get(index);
      if (connection?.getCharInUse()?.currentMap === mapId) {
        try {
          this.dataTo(connection, message);
        } catch (error) {
          this.logger.error("Error sending data to the map clients! Error: " + error);
        }
      }
    }
  }

  /**
   * Envia uma mensagem para todos os clientes no mapa especificado, exceto um cliente específico.
   *
   * @param {number} mapId - O ID do mapa.
   * @param {Connection} exceptConnection - A conexão do cliente que não deve receber a mensagem.
   * @param {ServerMessage} message - A mensagem a ser enviada aos clientes no mapa.
   */
  protected dataToMapExcept(mapId: number, exceptConnection: Connection, message: ServerMessage): void {
    for (const index of this.memory.connections.getFilledSlots()) {
      const connection = this.memory.connections.get(index);
      if (connection?.ws && connection !== exceptConnection && connection.getCharInUse()?.currentMap === mapId) {
        try {
          this.dataTo(connection, message);
        } catch (error) {
          this.logger.error("Error sending data to the map clients! Error: " + error);
        }
      }
    }
  }
}
