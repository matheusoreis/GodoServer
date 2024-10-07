import type { Connection } from "../core/connection";
import type { ClientMessage } from "./protocol/client-message";

export interface Incoming {
	handle(connection: Connection, clientMessage: ClientMessage): void;
}
