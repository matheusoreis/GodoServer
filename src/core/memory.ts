import { MAX_MAP_CHARACTERS, MAX_MAPS, MAX_PLAYERS } from '../misc/constants';
import { Slots } from '../misc/slots';
import type { Character } from './character';
import type { Connection } from './connection';
import type { WorldCore } from './game/world/world.core';

export class Memory {
  public connections: Slots<Connection> = new Slots<Connection>(MAX_PLAYERS);
  public worlds: Slots<WorldCore> = new Slots<WorldCore>(MAX_MAPS);
  public worldsCharacters: Slots<Character> = new Slots<Character>(MAX_MAP_CHARACTERS);
}
