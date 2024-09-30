import { MAX_CHAT_HISTORY, MAX_MAPS, MAX_PLAYERS } from "../misc/constants";
import { Slots } from "../misc/slots";
import type { Chat } from "./chat";
import type { Connection } from "./connection";
import type { GameMap } from "./game-map";

/**
 * A classe `Memory` gerencia a memória do servidor
 */
export class Memory {
  /**
   * Armazena as conexões ativas utilizando uma estrutura de slots.
   * O número de slots é definido pela constante `MAX_PLAYERS`.
   */
  public connections: Slots<Connection> = new Slots<Connection>(MAX_PLAYERS);
  public maps: Slots<GameMap> = new Slots<GameMap>(MAX_MAPS);
  public chatHistory: Slots<Chat> = new Slots<Chat>(MAX_CHAT_HISTORY);
}
