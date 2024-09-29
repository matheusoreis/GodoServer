import { Alert } from "../communication/outgoing/dispatcher/alert";
import type { Connection } from "../core/connection";
import { MAJOR_VERSION, MINOR_VERSION, REVISION_VERSION } from "./constants";

export class VersionChecker {
  /**
   * Verifica a versão e, caso incorreta, envia um alerta para o cliente.
   *
   * @param major Versão majoritária recebida do cliente.
   * @param minor Versão minoritária recebida do cliente.
   * @param revision Revisão recebida do cliente.
   * @param connection Conexão do cliente.
   * @returns `true` se a versão estiver correta, `false` se estiver incorreta.
   */
  public static checkAndAlert(major: number, minor: number, revision: number, connection: Connection): boolean {
    if (major !== MAJOR_VERSION || minor !== MINOR_VERSION || revision !== REVISION_VERSION) {
      new Alert("The client version is out of date, please update to continue playing.", true).sendTo(connection);

      return false;
    }

    return true;
  }
}
