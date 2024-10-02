import { CharacterManager } from "../../../core/character-manager";
import type { Connection } from "../../../core/connection";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class RequestCharacters implements Incoming {
  public async handle(connection: Connection, _message: ClientMessage): Promise<void> {
    const character: CharacterManager = new CharacterManager(connection);
    await character.getListChars();
  }
}
