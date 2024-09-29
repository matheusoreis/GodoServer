import type { Connection } from "../../../core/connection";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharacterTeleported extends ServerMessage {
  constructor(_connection: Connection) {
    super(ServerHeaders.CharacterTeleported);
  }
}