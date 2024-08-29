import type { Connection } from "../../net/connection";
import type { ClientMessage } from "../protocol/client-message";

export interface Incoming {
  handle(client: Connection, request: ClientMessage): void;
}
