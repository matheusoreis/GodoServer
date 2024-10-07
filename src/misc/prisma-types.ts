export type PrismaAccount = {
	id: number;
	email: string;
	password: string;
	characterSize: number;
	createdAt: Date;
	updatedAt: Date;
	characters?: PrismaCharacter[];
	roles?: PrismaRole[];
};

export type PrismaRole = {
	id: number;
	name: string;
	accountId: number | null;
	Account?: PrismaAccount | null;
};

export type PrismaCharacter = {
	id: number;
	name: string;
	gendersId: number;
	accountId: number | null;
	world?: PrismaWorld;
	positionX: number;
	positionY: number;
	direction: number;
	defaultSprite: string;
	createdAt: Date;
	updatedAt: Date;
	gender?: PrismaGender;
	Account?: PrismaAccount | null;
	worldsId: number;
};

export type PrismaGender = {
	id: number;
	name: string;
	Characters?: PrismaCharacter[];
};

export type PrismaWorld = {
	id: number;
	name: string;
	sizeX: number;
	sizeY: number;
	Characters?: PrismaCharacter[];
};

export type PrismaCharacterWithGender = PrismaCharacter & {
	gender: PrismaGender;
};

export type PrismaAccountWithCharacters = PrismaAccount & {
	characters: PrismaCharacterWithGender[];
};
