export type PrismaAccount = {
  id: number;
  email: string;
  password: string;
  characterSize: number;
  coins: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PrismaAccountWithCharacters = PrismaAccount & {
  characters: PrismaCharacterWithGender[];
};

export type PrismaGender = {
  id: number;
  name: string;
};

export type PrismaCharacter = {
  id: number;
  name: string;
  gendersId: number;
  accountId: number | null;
  mapPositionX: number;
  mapPositionY: number;
  direction: number;
  defaultSprite: string;
  currentSprite: string;
  createdAt: Date;
  updatedAt: Date;
  worldsId: number;
};

export type PrismaCharacterWithGender = PrismaCharacter & {
  gender: PrismaGender;
};

export type PrismaWorlds = {
  id: number;
  name: string;
  sizeX: number;
  sizeY: number;
};
