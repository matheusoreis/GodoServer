import type { Connection } from "../../../../core/shared/connection";
import { ServerHeaders } from "../../../protocol/server-headers";
import { ServerMessage } from "../../../protocol/server-message";

export class Pong extends ServerMessage {
  sendTo(connection: Connection) {
    throw new Error("Method not implemented.");
  }
  constructor() {
    super(ServerHeaders.Pong);
  }
}
