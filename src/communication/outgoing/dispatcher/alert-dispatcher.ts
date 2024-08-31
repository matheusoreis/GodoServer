import type { Connection } from "../../../net/connection";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export enum AlertType {
  Info,
  Warn,
  Error,
}

export interface AlertData {
  type: AlertType;
  message: string;
}

export class AlertDispatcher extends ServerMessage {
  constructor(data: AlertData) {
    super(ServerHeaders.Alert);
    this.putInt8(data.type);
    this.putString(data.message);
  }
}
