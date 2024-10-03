import type { Connection } from "../../../../core/shared/connection";
import type { ClientMessage } from "../../../protocol/client-message";
import type { Incoming } from "../../incoming";

export class RecoverAccount implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {}
}
