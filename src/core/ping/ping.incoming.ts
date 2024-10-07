import type { Incoming } from '../../communication/incoming';
import type { Connection } from '../connection';
import { PingCore } from './ping.core';

export class PingIncoming implements Incoming {
  handle(connection: Connection): void {
    new PingCore().sendPing(connection);
  }
}
