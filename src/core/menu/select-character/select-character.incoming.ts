import type { Incoming } from '../../../communication/incoming';
import type { ClientMessage } from '../../../communication/protocol/client-message';
import { Logger } from '../../../misc/logger';
import { serviceLocator } from '../../../misc/service-locator';
import { AlertCore } from '../../alert/alert.core';
import type { Character } from '../../character';
import type { Connection } from '../../connection';
import type { WorldCore } from '../../game/world/world.core';

export class SelectCharacterIncoming implements Incoming {
  constructor() {
    this.logger = serviceLocator.get<Logger>(Logger);
  }

  logger: Logger;

  public async handle(connection: Connection, clientMessage: ClientMessage): Promise<void> {
    const id: number = clientMessage.getInt32();

    try {
      connection.setCharacterInUseById(id);
    } catch (error) {
      new AlertCore(
        connection,
        'Personagem não encontrado ou não pôde ser definido como ativo!',
        true,
      ).send();

      this.logger.error(`${error}`);
      return;
    }

    const charInUse: Character | void = connection.getCharInUse();
    if (!charInUse) {
      new AlertCore(
        connection,
        'Personagem não encontrado ou não pôde ser definido como ativo!',
        true,
      ).send();
      return;
    }

    const foundMap: WorldCore | undefined = charInUse.findMapById(charInUse.currentMap);
    if (!foundMap) {
      new AlertCore(connection, 'Mapa não encontrado').send();
      return;
    }

    foundMap.add(connection, charInUse);
  }
}
