import type { ServerWebSocket } from "bun";
import { Handler } from "../net/handler";
import { Memory } from "./memory";
import { ClientMessage } from "../communication/protocol/client-message";
import { serviceLocator } from "../misc/service-locator";
import type { Account } from "./account";
import type { Character } from "./character";
import { AlertDispatcher, AlertType } from "../communication/outgoing/dispatcher/alert";

/**
 * A classe `Connection` gerencia uma conexão WebSocket, incluindo o fechamento
 * da conexão e o processamento de mensagens recebidas.
 */
export class Connection {
  /**
   * Cria uma nova instância da classe `Connection`.
   *
   * @param {ServerWebSocket} ws - O WebSocket associado a esta conexão.
   * @param {number} id - O identificador único da conexão.
   */
  constructor(ws: ServerWebSocket, id: number) {
    this.ws = ws;
    this.id = id;
    this.active = true;

    this.handler = serviceLocator.get<Handler>(Handler);
    this.memory = serviceLocator.get<Memory>(Memory);
    this.clientMessage = serviceLocator.get<ClientMessage>(ClientMessage);
  }

  public readonly ws: ServerWebSocket;
  public readonly id: number;
  private connectionDatabaseId?: number;
  private chars?: Character[];
  private charInUse?: Character;

  private active: boolean;

  private handler: Handler;
  private memory: Memory;
  private clientMessage: ClientMessage;

  /**
   * Fecha a conexão, remove-a da memória e define seu status como inativa.
   */
  public close(): void {
    if (this.active) {
      const connections = this.memory.connections;

      const connection = connections.get(this.id);
      if (connection) {
        connections.remove(this.id);
      }

      this.ws.close();
      this.active = false;
    }
  }

  /**
   * Processa uma mensagem recebida pelo WebSocket.
   * Converte o buffer recebido em uma mensagem despacha para o handler.
   *
   * @param {Buffer} message - A mensagem recebida do WebSocket.
   */
  public handleMessage(message: Buffer): void {
    this.clientMessage.setBuffer(message);
    this.handler.handleMessage(this, this.clientMessage);
  }

  /**
   * Adiciona a connection a memória do servidor.
   */
  public addToMemory(): void {
    this.memory.connections.add(this);
  }

  /**
   * Adiciona o id do banco de dados a connection.
   */
  public addDatabaseId(databaseId: number): void {
    this.connectionDatabaseId = databaseId;
  }

  public getDatabaseId(): number | void {
    if (this.connectionDatabaseId == undefined) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Error,
        "An error occurred while retrieving your data. Please try again later.",
        true,
      );

      alertDispatcher.sendTo(this);

      return;
    }

    return this.connectionDatabaseId!;
  }

  /**
   * Adiciona os personagens a connection
   *
   * @param {Character[]} chars - A lista de personagens da connection
   */
  public addCharacters(chars: Character[]): void {}

  /**
   * Adiciona o personagem ao personagem ativo no momento.
   *
   * @param {Character} char - O personagem escolhido.
   */
  public setCharacterInUse(char: Character): void {}
}
