import type { ServerWebSocket } from "bun";
import { Memory } from "../core/memory";
import { Logger } from "../misc/logger";
import type { Slots } from "../misc/slots";
import { Connection } from "../core/connection";
import { GetConnection } from "../misc/get-connection";
import { AlertDispatcher, AlertType, type AlertData } from "../communication/outgoing/dispatcher/alert-dispatcher";
import { serviceLocator } from "../misc/service-locator";

/**
 * A classe `Manager` gerencia as conexões WebSocket ativas, lida com a abertura, fechamento,
 * e mensagens de WebSocket, além de coordenar o armazenamento dessas conexões em slots de memória.
 */
export class Manager {
  /**
   * Cria uma instância da classe `Manager`.
   * Inicializa o logger e a estrutura de armazenamento de conexões.
   */
  constructor() {
    this.logger = serviceLocator.get<Logger>(Logger);
    this.memory = serviceLocator.get<Memory>(Memory);
  }

  private logger: Logger;
  private memory: Memory;

  /**
   * Manipulador chamado quando uma nova conexão WebSocket é aberta.
   *
   * @param {ServerWebSocket} ws - O WebSocket que foi conectado.
   */
  public websocketOpen(ws: ServerWebSocket): void {
    const firstAvailableId: number | undefined = this.memory.connections.getFirstEmptySlot();

    if (firstAvailableId == undefined) {
      this.handleFullServer(ws);

      return;
    }

    const connectionModel: Connection = new Connection(ws, firstAvailableId);
    this.memory.connections.add(connectionModel);
  }

  /**
   * Manipulador chamado quando uma conexão WebSocket é fechada.
   * Remove a conexão dos slots de memória.
   *
   * @param {ServerWebSocket} ws - O WebSocket que foi desconectado.
   * @param {number} _code - Código de status de fechamento (não utilizado).
   * @param {string} _message - Mensagem de fechamento (não utilizada).
   */
  public websocketClose(ws: ServerWebSocket, _code: number, _message: string): void {
    this.cleanupConnection(ws);
  }

  /**
   * Manipulador chamado quando uma mensagem é recebida por um WebSocket.
   * Envia a mensagem recebida para a conexão correspondente.
   *
   * @param {ServerWebSocket} ws - O WebSocket que enviou a mensagem.
   * @param {Buffer} message - A mensagem recebida.
   */
  public websocketMessage(ws: ServerWebSocket, message: Buffer): void {
    const connection: Connection | undefined = GetConnection.bySocket(ws, this.memory);

    if (!connection) {
      this.logger.error(`Connection not found for WebSocket.`);
      this.cleanupConnection(ws);
      return;
    }

    connection.handleMessage(message);
  }

  /**
   * Manipula o caso em que o servidor está cheio e não pode aceitar novas conexões.
   * Fecha o WebSocket do cliente que tentou se conectar.
   *
   * @param {ServerWebSocket} ws - O WebSocket que tentou se conectar.
   */
  private handleFullServer(ws: ServerWebSocket): void {
    const connection: Connection = new Connection(ws, -1);

    const alertData: AlertData = {
      type: AlertType.Error,
      message: "Server is full! disconnecting...",
    };

    const alertDispatcher: AlertDispatcher = new AlertDispatcher(alertData);
    alertDispatcher.sendTo(connection);

    this.logger.info(`Server is full, disconnecting client: ${ws.remoteAddress}`);
  }

  /**
   * Limpa a conexão de um WebSocket específico, removendo-o da lista de conexões
   * e fechando a conexão.
   *
   * @param {ServerWebSocket} ws - O WebSocket que está sendo limpo.
   */
  private cleanupConnection(ws: ServerWebSocket): void {
    const connection: Connection | undefined = GetConnection.bySocket(ws, this.memory);

    if (connection) {
      this.memory.connections.remove(connection.id);
      this.logger.info(`Connection removed, address: ${ws.remoteAddress}`);
      connection.close();
    }
  }
}
