import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class AccessSuccessful extends ServerMessage {
  constructor() {
    super(ServerHeaders.AccessSuccessful);
  }
}
