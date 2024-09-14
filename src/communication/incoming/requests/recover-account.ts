import type { Connection } from "../../../core/connection";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class RecoverAccountRequest implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {}
}
