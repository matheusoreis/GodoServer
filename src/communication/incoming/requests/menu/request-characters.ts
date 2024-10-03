import { CharacterManager } from "../../../../core/menu/character-manager";
import type { Connection } from "../../../../core/shared/connection";
import type { ClientMessage } from "../../../protocol/client-message";
import type { Incoming } from "../../incoming";

export class RequestCharacters implements Incoming {
  public async handle(connection: Connection, _message: ClientMessage): Promise<void> {
    const character: CharacterManager = new CharacterManager(connection);
    await character.getListChars();
  }
}
