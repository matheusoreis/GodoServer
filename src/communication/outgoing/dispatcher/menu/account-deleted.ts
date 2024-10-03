import type { Connection } from "../../../../core/shared/connection";
import { ServerHeaders } from "../../../protocol/server-headers";
import { ServerMessage } from "../../../protocol/server-message";

export class AccountDeleted extends ServerMessage {
  constructor(_connection: Connection) {
    super(ServerHeaders.AccountDeleted);
  }
}
