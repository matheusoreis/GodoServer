import type { Connection } from "../connection";
import type { ClientMessage } from "./messages/client-message";

export interface Incoming {
	handle(connection: Connection, clientMessage: ClientMessage): void;
}
