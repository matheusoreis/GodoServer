import type { ServerWebSocket } from "bun";
import { Handler } from "./handler";
import { Memory } from "../core/memory";
import { ClientMessage } from "../communication/protocol/client-message";

export class Connection {
  constructor(ws: ServerWebSocket, id: number) {
    this.ws = ws;
    this.id = id;
    this.active = true;
    this.handler = new Handler();
  }

  public readonly ws: ServerWebSocket;
  public readonly id: number;
  private active: boolean;
  private handler: Handler;

  public close(): void {
    if (this.active) {
      const connections = new Memory().connections;

      const connection = connections.get(this.id);
      if (connection) {
        connections.remove(this.id);
      }

      this.ws.close();
      this.active = false;
    }
  }

  public handleMessage(message: Buffer): void {
    const clientMessage: ClientMessage = new ClientMessage(message);
    this.handler.handleMessage(this, clientMessage);
  }
}
