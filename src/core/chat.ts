import { serviceLocator } from "../misc/service-locator";
import { Logger } from "../misc/logger";
import { Memory } from "./memory";
import type { CharacterModel } from "./character";
import { PrismaClient } from "@prisma/client";

export class Chat {
  constructor(sender: CharacterModel, message: number, channel: number) {
    this.sender = sender;
    this.message = message;
    this.channel = channel;

    this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
    this.logger = serviceLocator.get<Logger>(Logger);
    this.memory = serviceLocator.get<Memory>(Memory);
  }

  private sender: CharacterModel;
  private message: number;
  private channel: number;

  private prisma: PrismaClient;
  private logger: Logger;
  private memory: Memory;

  public saveHistory() {}

  public sendHistory() {}

  public sendMessage() {}

  public sendChatBubble() {}
}
