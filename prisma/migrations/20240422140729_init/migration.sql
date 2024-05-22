/*
  Warnings:

  - You are about to alter the column `height` on the `Portfolio` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to alter the column `width` on the `Portfolio` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgPath" TEXT NOT NULL,
    "preview" BOOLEAN NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weedingId" TEXT NOT NULL,
    CONSTRAINT "Portfolio_weedingId_fkey" FOREIGN KEY ("weedingId") REFERENCES "Weeding" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Portfolio" ("height", "id", "imgPath", "preview", "weedingId", "width") SELECT "height", "id", "imgPath", "preview", "weedingId", "width" FROM "Portfolio";
DROP TABLE "Portfolio";
ALTER TABLE "new_Portfolio" RENAME TO "Portfolio";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
