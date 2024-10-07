import { PrismaClient } from '@prisma/client';
import type { Connection } from '../../connection';
import { serviceLocator } from '../../../misc/service-locator';
import { Logger } from '../../../misc/logger';
import { AccessAccountOutgoing } from './access-account.outgoing';
import { AlertCore } from '../../alert/alert.core';
import { Password } from '../../../misc/password';
import { VersionCore } from '../../version/version.core';
import { PrismaAccount } from '../../prisma';

export class AccessAccountCore {
  constructor(
    connection: Connection,
    email: string,
    password: string,
    major: number,
    minor: number,
    revision: number,
  ) {
    this.connection = connection;
    this.email = email;
    this.password = password;
    this.major = major;
    this.minor = minor;
    this.revision = revision;
    this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
    this.hash = serviceLocator.get<Password>(Password);
    this.logger = serviceLocator.get<Logger>(Logger);
  }

  public readonly connection: Connection;
  public readonly email: string;
  public readonly password: string;
  public readonly major: number;
  public readonly minor: number;
  public readonly revision: number;

  private readonly prisma: PrismaClient;
  private readonly hash: Password;
  private readonly logger: Logger;

  public async access(): Promise<void> {
    const version: boolean = new VersionCore(
      this.connection,
      this.major,
      this.minor,
      this.revision,
    ).check();

    if (!version) {
      return;
    }

    if (!this.email) {
      new AlertCore(this.connection, 'O email é obrigatório!', false).send();
    }

    if (!this.password) {
      new AlertCore(this.connection, 'A senha é obrigatória!', false).send();
    }

    try {
      const account: PrismaAccount | null = await this.prisma.accounts.findUnique({
        where: { email: this.email },
      });

      if (!account) {
        new AlertCore(this.connection, 'A conta informada não foi encontrada!', false).send();
        return;
      }

      const hashedPassword = await this.hash.verify(this.password, account!.password);
      if (!hashedPassword) {
        new AlertCore(this.connection, 'A senha informada está inválida!', false).send();
        return;
      }

      this.connection.addDatabaseId(account!.id);

      new AccessAccountOutgoing().sendTo(this.connection);
    } catch (error) {
      new AlertCore(this.connection, `Error: ${error}`, true).send();
      this.logger.error(`${error}`);
    }
  }
}
