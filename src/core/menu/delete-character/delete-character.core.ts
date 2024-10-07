import { PrismaClient } from '@prisma/client';
import type { Connection } from '../../connection';
import { serviceLocator } from '../../../misc/service-locator';
import { Logger } from '../../../misc/logger';
import { DeleteCharacterOutgoing } from './delete-character.outgoing';
import { AlertCore } from '../../alert/alert.core';

export class DeleteCharacterCore {
  constructor(connection: Connection, id: number) {
    this.connection = connection;
    this.id = id;
    this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
    this.logger = serviceLocator.get<Logger>(Logger);
  }

  public readonly id: number;

  public readonly connection: Connection;
  private readonly prisma: PrismaClient;
  private readonly logger: Logger;

  public async delete(): Promise<void> {
    const accountId = this.connection.getDatabaseId();
    if (accountId === undefined) {
      return;
    }

    try {
      const character = await this.prisma.characters.findUnique({
        where: { id: this.id },
      });

      if (!character || character.accountId !== accountId) {
        new AlertCore(
          this.connection,
          'Personagem não encontrado ou não pertence a esta conta',
          false,
        ).send();
        return;
      }

      await this.prisma.characters.delete({
        where: { id: this.id },
      });

      this.connection.removeCharacter(this.id);

      new AlertCore(this.connection, 'Personagem excluído com sucesso!', false).send();
      new DeleteCharacterOutgoing().sendTo(this.connection);
    } catch (error) {
      new AlertCore(this.connection, `Error: ${error}`, true).send();

      this.logger.error(`${error}`);
    }
  }
}
