/*
  Warnings:

  - You are about to drop the column `weedingId` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `weddingId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgPath" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "preview" BOOLEAN NOT NULL,
    "weddingId" TEXT NOT NULL,
    CONSTRAINT "Portfolio_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Portfolio" ("height", "id", "imgPath", "preview", "width") SELECT "height", "id", "imgPath", "preview", "width" FROM "Portfolio";
DROP TABLE "Portfolio";
ALTER TABLE "new_Portfolio" RENAME TO "Portfolio";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
