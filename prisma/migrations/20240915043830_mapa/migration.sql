-- CreateTable
CREATE TABLE "Maps" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sizeX" INTEGER NOT NULL DEFAULT 50,
    "sizeY" INTEGER NOT NULL DEFAULT 33
);

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Characters_gendersId_fkey" FOREIGN KEY ("gendersId") REFERENCES "Genders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Characters_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Characters" ("accountId", "createdAt", "gendersId", "id", "name", "updatedAt") SELECT "accountId", "createdAt", "gendersId", "id", "name", "updatedAt" FROM "Characters";
DROP TABLE "Characters";
ALTER TABLE "new_Characters" RENAME TO "Characters";
CREATE UNIQUE INDEX "Characters_name_key" ON "Characters"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
