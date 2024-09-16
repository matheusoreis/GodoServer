import type { CharacterModel } from "../../../core/character";
import type { Connection } from "../../../core/connection";
import { AlertDispatcher, AlertType } from "../../outgoing/dispatcher/alert";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class SelectCharRequest implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const charId: number = message.getInt32();
    const mapId: number = message.getInt32();

    try {
      connection.setCharacterInUseById(charId);
    } catch (error) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Error,
        "Character not found or could not be set as active!",
        false,
      );
      alertDispatcher.sendTo(connection);

      return;
    }

    const charInUse: void | CharacterModel = connection.getCharInUse();

    if (!charInUse) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Error,
        "Character not found or could not be set as active!",
        false,
      );
      alertDispatcher.sendTo(connection);

      return;
    }

    const foundMap = charInUse!.findMapById(mapId);

    if (!foundMap) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(AlertType.Error, "Map not found!", false);
      alertDispatcher.sendTo(connection);
    }

    foundMap?.enter(connection, charInUse);
  }
}
