export class GameMapModel {
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
}

export class GameMap {
  // função para entrar no mapa
  // função para notificar os jogadores que o jogador entrou no mapa
  // função para mover o jogador
  // função para teleportar o jogador
  // função para remover o jogador do mapa
}
