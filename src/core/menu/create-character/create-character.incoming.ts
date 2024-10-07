import type { Incoming } from '../../../communication/incoming';
import type { ClientMessage } from '../../../communication/protocol/client-message';
import type { Connection } from '../../connection';
import { CreateCharacterCore } from './create-character.core';

export class CreateCharacterIncoming implements Incoming {
  public async handle(connection: Connection, clientMessage: ClientMessage): Promise<void> {
    const name: string = clientMessage.getString();
    const gender: number = clientMessage.getInt8();
    const sprite: string = clientMessage.getString();

    await new CreateCharacterCore(connection, name, gender, sprite).create();
  }
}
