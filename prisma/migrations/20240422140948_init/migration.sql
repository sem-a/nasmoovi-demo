/*
  Warnings:

  - You are about to drop the column `height` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Portfolio` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgPath" TEXT NOT NULL,
    "preview" BOOLEAN NOT NULL,
    "weedingId" TEXT NOT NULL,
    CONSTRAINT "Portfolio_weedingId_fkey" FOREIGN KEY ("weedingId") REFERENCES "Weeding" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Portfolio" ("id", "imgPath", "preview", "weedingId") SELECT "id", "imgPath", "preview", "weedingId" FROM "Portfolio";
DROP TABLE "Portfolio";
ALTER TABLE "new_Portfolio" RENAME TO "Portfolio";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
