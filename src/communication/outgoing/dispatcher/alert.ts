import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class Alert extends ServerMessage {
  constructor(message: string, disconnect: boolean) {
    super(ServerHeaders.Alert);
    this.putString(message);
    this.putInt8(disconnect ? 1 : 0);
  }
}
