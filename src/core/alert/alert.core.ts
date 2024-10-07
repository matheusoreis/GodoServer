import type { Connection } from '../connection';
import { AlertOutgoing } from './alert.outgoing';

export class AlertCore {
  constructor(connection: Connection, message: string, disconnect: boolean = false) {
    this.connection = connection;
    this.message = message;
    this.disconnect = disconnect;
  }

  public readonly connection: Connection;
  public readonly message: string;
  public readonly disconnect: boolean;

  public send(): void {
    new AlertOutgoing(this.message, this.disconnect).sendTo(this.connection);
  }
}
