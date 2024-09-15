/*
  Warnings:

  - You are about to drop the `Maps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Maps";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameMaps" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sizeX" INTEGER NOT NULL DEFAULT 50,
    "sizeY" INTEGER NOT NULL DEFAULT 33
);
