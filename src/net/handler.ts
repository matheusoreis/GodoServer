import type { Incoming } from "../communication/incoming/incoming";
import type { ClientHeaders } from "../communication/protocol/client-headers";
import type { ClientMessage } from "../communication/protocol/client-message";
import type { Connection } from "./connection";

export class Handler {
  constructor() {
    this.requestHandlers = {};
    this.registerRequests();
  }

  private requestHandlers: Partial<Record<ClientHeaders, Incoming>>;

  public handleMessage(connection: Connection, message: ClientMessage): void {
    const messageId = message.getId() as ClientHeaders;

    if (this.requestHandlers[messageId]) {
      const handler = this.requestHandlers[messageId];

      try {
        handler?.handle(connection, message);
      } catch (error) {
        console.error(`Error handling ${handler?.constructor.name}:`, error);
        connection.close();
      }
    } else {
      console.debug(`No handler for id: ${messageId}`);
      connection.close();
    }
  }

  private registerRequests() {
    // this.requestHandlers[ClientHeaders.Ping] = new PingRequest();
  }
}
