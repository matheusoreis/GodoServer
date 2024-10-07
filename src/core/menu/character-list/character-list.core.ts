/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import type { Connection } from '../../connection';
import { serviceLocator } from '../../../misc/service-locator';
import { Logger } from '../../../misc/logger';
import { CharacterListOutgoing } from './character-list.outgoing';
import { AlertCore } from '../../alert/alert.core';
import { Character } from '../../character';
import { Vector2 } from '../../../misc/vector2';

export class CharacterListCore {
  constructor(connection: Connection) {
    this.connection = connection;
    this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
    this.logger = serviceLocator.get<Logger>(Logger);
  }

  public readonly connection: Connection;
  private readonly prisma: PrismaClient;
  private readonly logger: Logger;

  public async list(): Promise<void> {
    const accountId: number | void = this.connection.getDatabaseId();

    if (accountId === undefined) {
      this.connection.close();
      return;
    }

    try {
      const account = await this.prisma.accounts.findUnique({
        where: { id: accountId },
        include: {
          characters: true,
        },
      });

      if (!account) {
        new AlertCore(this.connection, 'A conta informada não foi encontrada!', false).send();
        this.connection.close();
        return;
      }

      const characterModelList = account.characters.map(this.mapToCharacterModel);
      this.connection.addCharacters(characterModelList);

      new CharacterListOutgoing(characterModelList, account?.characterSize ?? 1).sendTo(
        this.connection,
      );
    } catch (error) {
      new AlertCore(this.connection, `Error: ${error}`, true).send();
      this.logger.error(`${error}`);
    }
  }

  private mapToCharacterModel(character: any): Character {
    return new Character(
      character.id,
      character.name,
      character.gendersId,
      character.accountId,
      character.currentMap,
      new Vector2(character.mapPositionX, character.mapPositionY),
      character.direction,
      character.createdAt,
      character.updatedAt,
      character.gender,
      character.defaultSprite,
      character.currentSprite,
    );
  }
}
