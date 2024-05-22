/*
  Warnings:

  - Added the required column `height` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgPath" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "preview" BOOLEAN NOT NULL,
    "weedingId" TEXT NOT NULL,
    CONSTRAINT "Portfolio_weedingId_fkey" FOREIGN KEY ("weedingId") REFERENCES "Weeding" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Portfolio" ("id", "imgPath", "preview", "weedingId") SELECT "id", "imgPath", "preview", "weedingId" FROM "Portfolio";
DROP TABLE "Portfolio";
ALTER TABLE "new_Portfolio" RENAME TO "Portfolio";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
