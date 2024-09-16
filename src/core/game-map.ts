import { CharDeleted } from "../communication/outgoing/dispatcher/char-deleted";
import { CharSelected } from "../communication/outgoing/dispatcher/char-selected";
import { OthersChars } from "../communication/outgoing/dispatcher/others-chars";
import { MAP_LOOP } from "../misc/constants";
import { Logger } from "../misc/logger";
import { serviceLocator } from "../misc/service-locator";
import type { CharacterModel } from "./character";
import type { Connection } from "./connection";

export class GameMap {
  constructor(id: number, name: string, sizeX: number, sizeY: number) {
    this.logger = serviceLocator.get<Logger>(Logger);

    this.id = id;
    this.name = name;
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.loop();
  }

  logger: Logger;
  id: number;
  name: string;
  sizeX: number;
  sizeY: number;
  private chars: Map<number, CharacterModel> = new Map();

  public enter(connection: Connection, character: CharacterModel): void {
    character.loop();

    if (character.currentMap !== this.id) {
      console.error(`Character ${character.id} is not supposed to enter this map.`);
      return;
    }

    // Notifica todos os personagens no mapa sobre a entrada do novo personagem

    // Notifica o novo personagem sobre todos os personagens já presentes no mapa
    // const receiveOthersChars = new OthersChars(this.id, Array.from(this.chars.values()));
    // receiveOthersChars.sendTo(connection);

    // Adiciona o personagem ao mapa
    this.chars.set(character.id, character);

    const otherChars = Array.from(this.chars.values()).filter((char) => char.id !== character.id);
    const sendToOthersChars = new OthersChars(this.id, [character]);
    sendToOthersChars.sendToMapExcept(this.id, connection);

    const charSelected = new CharSelected(character);
    charSelected.sendTo(connection);
  }

  public movePlayer(character: CharacterModel, newPosition: { x: number; y: number }): void {
    if (this.chars.has(character.id)) {
      // const updatedCharacter = { ...character, mapPositionX: newPosition.x, mapPositionY: newPosition.y };
      // this.players.set(character.id, updatedCharacter);
      // this.notifyPlayersMovement(updatedCharacter);
    } else {
      console.error(`Character ${character.id} is not in this map.`);
    }
  }

  public removePlayer(char: CharacterModel): void {
    if (this.chars.has(char.id)) {
      this.chars.delete(char.id);
      this.notifyPlayersRemoval(char.id);
    } else {
      console.error(`Character ${char.id} is not in this map.`);
    }
  }

  public getPlayer(characterId: number): CharacterModel | undefined {
    return this.chars.get(characterId);
  }

  private notifyPlayersEntry(character: CharacterModel): void {
    // Notifica todos os jogadores no mapa que um novo personagem entrou
    console.log(`Character ${character.id} has entered the map.`);
    // Aqui você deve implementar a lógica para enviar notificações reais aos jogadores
  }

  private notifyPlayersMovement(character: CharacterModel): void {
    // Notifica todos os jogadores sobre a movimentação de um personagem
    console.log(`Character ${character.id} moved to position (${character.mapPositionX}, ${character.mapPositionY}).`);
    // Aqui você deve implementar a lógica para enviar notificações reais aos jogadores
  }

  private notifyPlayersRemoval(characterId: number): void {
    // Notifica todos os jogadores que um personagem foi removido
    console.log(`Character ${characterId} has been removed from the map.`);
    // Aqui você deve implementar a lógica para enviar notificações reais aos jogadores
  }

  public async loop(): Promise<void> {
    this.logger.info(`Initializing the Map ${this.id} loop`);

    const loopInterval = MAP_LOOP;

    setInterval(async () => {
      //
    }, loopInterval);
  }
}
