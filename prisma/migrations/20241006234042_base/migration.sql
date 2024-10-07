-- CreateTable
CREATE TABLE "Accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "characterSize" INTEGER NOT NULL DEFAULT 2,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "accountId" INTEGER,
    CONSTRAINT "Roles_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gendersId" INTEGER NOT NULL,
    "accountId" INTEGER,
    "currentMap" INTEGER NOT NULL DEFAULT 1,
    "mapPositionX" INTEGER NOT NULL DEFAULT 1,
    "mapPositionY" INTEGER NOT NULL DEFAULT 1,
    "direction" INTEGER NOT NULL DEFAULT 4,
    "defaultSprite" TEXT NOT NULL,
    "currentSprite" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Characters_gendersId_fkey" FOREIGN KEY ("gendersId") REFERENCES "Genders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Characters_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Worlds" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sizeX" INTEGER NOT NULL DEFAULT 100,
    "sizeY" INTEGER NOT NULL DEFAULT 100
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Characters_name_key" ON "Characters"("name");
