import type { Connection } from "../../net/connection";
import type { Incoming } from "../../net/messages/incoming";
import { PingCore } from "./ping.core";

export class PingIncoming implements Incoming {
	handle(connection: Connection): void {
		new PingCore().sendPing(connection);
	}
}
