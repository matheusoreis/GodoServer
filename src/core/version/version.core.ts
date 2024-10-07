import { MAJOR_VERSION, MINOR_VERSION, REVISION_VERSION } from '../../misc/constants';
import { AlertCore } from '../alert/alert.core';
import type { Connection } from '../connection';

export class VersionCore {
  constructor(connection: Connection, major: number, minor: number, revision: number) {
    this.connection = connection;
    this.major = major;
    this.minor = minor;
    this.revision = revision;
  }

  connection: Connection;
  major: number;
  minor: number;
  revision: number;

  public check(): boolean {
    if (
      this.major !== MAJOR_VERSION ||
      this.minor !== MINOR_VERSION ||
      this.revision !== REVISION_VERSION
    ) {
      new AlertCore(
        this.connection,
        'A versão do cliente está desatualizada, atualize para continuar jogando.',
        true,
      ).send();

      return false;
    }

    return true;
  }
}
