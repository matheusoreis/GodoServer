import type { Connection } from "../../../../core/shared/connection";
import { ServerHeaders } from "../../../protocol/server-headers";
import { ServerMessage } from "../../../protocol/server-message";

export class PasswordChanged extends ServerMessage {
  constructor(_connection: Connection) {
    super(ServerHeaders.PasswordChanged);
  }
}