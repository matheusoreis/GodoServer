/*
  Warnings:

  - You are about to drop the column `direction` on the `Characters` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Characters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gendersId" INTEGER NOT NULL,
    "accountId" INTEGER,
    "currentMap" INTEGER NOT NULL DEFAULT 1,
    "mapPositionX" INTEGER NOT NULL DEFAULT 1,
    "mapPositionY" INTEGER NOT NULL DEFAULT 1,
    "directionX" INTEGER NOT NULL DEFAULT 1,
    "directionY" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Characters_gendersId_fkey" FOREIGN KEY ("gendersId") REFERENCES "Genders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Characters_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Characters" ("accountId", "createdAt", "currentMap", "gendersId", "id", "mapPositionX", "mapPositionY", "name", "updatedAt") SELECT "accountId", "createdAt", "currentMap", "gendersId", "id", "mapPositionX", "mapPositionY", "name", "updatedAt" FROM "Characters";
DROP TABLE "Characters";
ALTER TABLE "new_Characters" RENAME TO "Characters";
CREATE UNIQUE INDEX "Characters_name_key" ON "Characters"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
