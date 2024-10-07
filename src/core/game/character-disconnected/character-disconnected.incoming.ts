import type { Incoming } from '../../../communication/incoming';

export class CharacterDisconnectedIncoming implements Incoming {
  handle(): void {
    throw new Error('Method not implemented.');
  }
}
