import type { Connection } from "../../../core/connection";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class AccessAccountSuccess extends ServerMessage {
  constructor(connection: Connection) {
    super(ServerHeaders.AccessAccountSuccess);

    this.putInt32(connection.id);
    this.putInt32(connection.getDatabaseId()!);
  }
}
