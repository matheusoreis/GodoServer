import type { ServerWebSocket } from "bun";

export class Connection {
  constructor(ws: ServerWebSocket, id: number) {
    this.ws = ws;
    this.id = id;
    this.active = true;
  }

  private ws: ServerWebSocket;
  private id: number;
  private active: boolean;

  public getId(): number {
    return this.id;
  }

  public getWebsocket(): ServerWebSocket {
    return this.ws;
  }
}
