import type { ServerWebSocket } from "bun";
import type { Connection } from "../net/connection";
import { Memory } from "../core/memory";

export class GetConnection {
  public static bySocket(ws: ServerWebSocket): Connection | undefined {
    const memory = new Memory();

    for (const connection of memory.connections.getFilledSlotsAsList()) {
      if (connection && connection.getWebsocket() === ws) {
        return connection;
      }
    }
    return undefined;
  }
}
