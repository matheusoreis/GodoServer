import { CharacterManager } from "../../../../core/menu/character-manager";
import type { Connection } from "../../../../core/shared/connection";
import type { ClientMessage } from "../../../protocol/client-message";
import type { Incoming } from "../../incoming";

export class CreateCharacter implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const name: string = message.getString();
    const genderId: number = message.getInt32();
    const defaultSprite: string = message.getString();

    const character: CharacterManager = new CharacterManager(connection);
    await character.createChar(name, genderId, defaultSprite);
  }
}
