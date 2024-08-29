import type { ServerWebSocket } from "bun";
import type { Connection } from "../net/connection";
import { Memory } from "../core/memory";

export class GetConnection {
  public static bySocket(ws: ServerWebSocket): Connection | undefined {
    const memory = new Memory();

    for (const index of memory.connections.getFilledSlots()) {
      const connection = memory.connections.get(index);

      if (connection && connection.ws === ws) {
        return connection;
      }
    }
    return undefined;
  }
}
