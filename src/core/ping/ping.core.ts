import type { Connection } from "../../net/connection";
import { PingOutgoing } from "./ping.outgoing";

export class PingCore {
	public sendPing(connection: Connection): void {
		new PingOutgoing().sendTo(connection);
	}
}
