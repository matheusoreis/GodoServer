import { MAX_PLAYERS } from "../misc/constants";
import { Singleton } from "../misc/decorators/classes/singleton";
import { Slots } from "../misc/slots";
import type { Connection } from "../net/connection";

@Singleton()
export class Memory {
  public connections: Slots<Connection> = new Slots<Connection>(MAX_PLAYERS);
}
