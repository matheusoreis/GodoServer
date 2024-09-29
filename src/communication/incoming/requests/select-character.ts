import type { Connection } from "../../../core/connection";
import { Alert, AlertType } from "../../outgoing/dispatcher/alert";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class SelectCharacter implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const charId: number = message.getInt32();

    try {
      connection.setCharacterInUseById(charId);
    } catch (error) {
      this.sendAlert(connection, AlertType.Error, "Character not found or could not be set as active!", true);
      return;
    }

    const charInUse = connection.getCharInUse();
    if (!charInUse) {
      this.sendAlert(connection, AlertType.Error, "Character not found or could not be set as active!", false);
      return;
    }

    const foundMap = charInUse.findMapById(charInUse.currentMap);
    if (!foundMap) {
      this.sendAlert(connection, AlertType.Error, "Map not found!", false);
      return;
    }

    foundMap?.addCharacter(connection, charInUse);
  }

  private sendAlert(connection: Connection, type: AlertType, message: string, critical: boolean): void {
    const alertDispatcher = new Alert(type, message, critical);
    alertDispatcher.sendTo(connection);
  }
}
