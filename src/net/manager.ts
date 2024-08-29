import type { ServerWebSocket } from "bun";
import { Memory } from "../core/memory";
import { Logger } from "../misc/logger";
import type { Slots } from "../misc/slots";
import { Connection } from "./connection";
import { GetConnection } from "../misc/get-connection";

export class Manager {
  constructor() {
    this.logger = new Logger();
    this.connections = new Memory().connections;
  }

  private logger: Logger;
  private connections: Slots<Connection>;

  public websocketOpen(ws: ServerWebSocket): void {
    const firstAvailableId: number | undefined = this.connections.getFirstEmptySlot();

    if (firstAvailableId == undefined) {
      this.handleFullServer(ws);

      return;
    }

    const connectionModel: Connection = new Connection(ws, firstAvailableId);
    this.connections.add(connectionModel);
  }

  public websocketClose(ws: ServerWebSocket, _code: number, _message: string): void {
    this.cleanupConnection(ws);
  }

  public websocketMessage(ws: ServerWebSocket, message: Buffer): void {
    const connection: Connection | undefined = GetConnection.bySocket(ws);

    if (!connection) {
      this.logger.error(`Conexão não encontrada para o WebSocket.`);
      this.cleanupConnection(ws);
      return;
    }

    connection.handleMessage(message);
  }

  private handleFullServer(ws: ServerWebSocket): void {
    //   const connection: Connection = new Connection(ws, -1);
    //   new AlertMessage("O servidor está cheio, tente novamente mais tarde...").send(connection);

    this.logger.info(`O servidor está cheio, desconectando o cliente: ${ws.remoteAddress}`);
    ws.close();
  }

  private cleanupConnection(ws: ServerWebSocket): void {
    const connection: Connection | undefined = GetConnection.bySocket(ws);

    if (connection) {
      this.connections.remove(connection.id);
      this.logger.info(`Conexão removida, endereço: ${ws.remoteAddress}`);
      connection.close();
    }
  }
}
