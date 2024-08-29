import { MAX_PLAYERS } from "../misc/constants";
import { Singleton } from "../misc/decorators/classes/singleton";
import { Slots } from "../misc/slots";
import type { Connection } from "../net/connection";

/**
 * A classe `Memory` gerencia a memória do servidor
 *
 * A classe contém o decorator `@Singleton()`, garantindo que apenas uma instância
 * seja criada.
 */
@Singleton()
export class Memory {
  /**
   * Armazena as conexões ativas utilizando uma estrutura de slots.
   * O número de slots é definido pela constante `MAX_PLAYERS`.
   */
  public connections: Slots<Connection> = new Slots<Connection>(MAX_PLAYERS);
}
