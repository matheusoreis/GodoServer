import { Memory } from "../../core/memory";
import { Logger } from "../../misc/logger";
import type { Slots } from "../../misc/slots";
import type { Connection } from "../../net/connection";
import type { ServerMessage } from "../protocol/server-message";

export abstract class Outgoing {
  constructor() {
    this.logger = new Logger();
    this.connection = new Memory().connections;
  }

  private logger: Logger;
  private connection: Slots<Connection>;

  public dataTo(connection: Connection, message: ServerMessage): void {
    try {
      connection.ws.send(message.getBuffer());
    } catch (error) {
      this.logger.error("Error sending data to the client! Error: " + error);
    }
  }

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
