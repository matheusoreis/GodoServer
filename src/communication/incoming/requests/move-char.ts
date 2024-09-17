import type { Connection } from "../../../core/connection";
import { AlertDispatcher, AlertType } from "../../outgoing/dispatcher/alert";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class MoveCharRequest implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const posX: number = message.getInt32();
    const posY: number = message.getInt32();
    const direction: number = message.getInt32();
    const animation: number = message.getInt32();

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

    foundMap.movePlayer(connection, charInUse, posX, posY, direction, animation);
  }

  private sendAlert(connection: Connection, type: AlertType, message: string, critical: boolean): void {
    const alertDispatcher = new AlertDispatcher(type, message, critical);
    alertDispatcher.sendTo(connection);
  }
}
