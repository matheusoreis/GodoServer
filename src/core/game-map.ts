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

  public enter(character: CharacterModel): void {
    // Ativa o loop do personagem
    character.loop();

    if (character.currentMap !== this.id) {
      console.error(`Character ${character.id} is not supposed to enter this map.`);
      return;
    }

    // Adiciona o personagem ao mapa
    this.chars.set(character.id, character);

    // Notifica todos os jogadores no mapa sobre a entrada do novo personagem
    this.notifyPlayersEntry(character);

    // Notifica o novo personagem sobre todos os jogadores já presentes no mapa
    this.notifyCharacterAboutOtherPlayers(character);
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

  // public getPlayer(characterId: number): CharacterModel | undefined {
  //   return this.chars.get(characterId);
  // }

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

  private notifyCharacterAboutOtherPlayers(character: CharacterModel): void {
    // Notifica o novo personagem sobre todos os jogadores já presentes no mapa
    this.chars.forEach((player) => {
      if (player.id !== character.id) {
        console.log(`Notifying ${character.id} about existing player ${player.id}.`);
        // Implementar a lógica de notificação real
      }
    });
  }

  public async loop(): Promise<void> {
    this.logger.info(`Initializing the Map ${this.id} loop`);

    const loopInterval = MAP_LOOP;

    setInterval(async () => {
      //
    }, loopInterval);
  }
}
