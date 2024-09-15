import type { CharacterModel } from "./character";

export class GameMap {
  constructor(id: number, name: string, sizeX: number, sizeY: number) {
    this.id = id;
    this.name = name;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  id: number;
  name: string;
  sizeX: number;
  sizeY: number;
  private players: Map<number, CharacterModel> = new Map();

  public enter(character: CharacterModel): void {
    if (character.currentMap !== this.id) {
      console.error(`Character ${character.id} is not supposed to enter this map.`);
      return;
    }

    // Adiciona o personagem ao mapa
    this.players.set(character.id, character);

    // Notifica todos os jogadores no mapa sobre a entrada do novo personagem
    this.notifyPlayersEntry(character);

    // Notifica o novo personagem sobre todos os jogadores já presentes no mapa
    this.notifyCharacterAboutOtherPlayers(character);
  }

  public movePlayer(character: CharacterModel, newPosition: { x: number; y: number }): void {
    if (this.players.has(character.id)) {
      const updatedCharacter = { ...character, mapPositionX: newPosition.x, mapPositionY: newPosition.y };
      this.players.set(character.id, updatedCharacter);
      this.notifyPlayersMovement(updatedCharacter);
    } else {
      console.error(`Character ${character.id} is not in this map.`);
    }
  }

  public removePlayer(characterId: number): void {
    if (this.players.has(characterId)) {
      this.players.delete(characterId);
      this.notifyPlayersRemoval(characterId);
    } else {
      console.error(`Character ${characterId} is not in this map.`);
    }
  }

  public getPlayer(characterId: number): CharacterModel | undefined {
    return this.players.get(characterId);
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

  private notifyCharacterAboutOtherPlayers(character: CharacterModel): void {
    // Notifica o novo personagem sobre todos os jogadores já presentes no mapa
    this.players.forEach((player) => {
      if (player.id !== character.id) {
        console.log(`Notifying ${character.id} about existing player ${player.id}.`);
        // Implementar a lógica de notificação real
      }
    });
  }

  public mapLoop(): void {
    // Atualiza o mapa e processa eventos
  }
}
