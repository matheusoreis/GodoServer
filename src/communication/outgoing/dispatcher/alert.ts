import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export enum AlertType {
  Info,
  Warn,
  Error,
}

export class Alert extends ServerMessage {
  constructor(type: AlertType, message: string, disconnect: boolean) {
    super(ServerHeaders.Alert);
    this.putInt8(type);
    this.putString(message);
    this.putInt8(disconnect ? 1 : 0);
  }
}
