import type { Connection } from "../../../core/connection";
import { AlertDispatcher, AlertType } from "../../outgoing/dispatcher/alert";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class MoveCharacterRequest implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const action = message.getInt8();
    const positionX = message.getInt32();
    const positionY = message.getInt32();
    const direction = message.getInt8();
    const velocityX = message.getInt32();
    const velocityY = message.getInt32();

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

    foundMap.moveCharacter(connection, charInUse, action, positionX, positionY, direction, velocityX, velocityY);
  }

  private sendAlert(connection: Connection, type: AlertType, message: string, critical: boolean): void {
    const alertDispatcher = new AlertDispatcher(type, message, critical);
    alertDispatcher.sendTo(connection);
  }
}
