-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Weeding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgPath" TEXT NOT NULL,
    "preview" BOOLEAN NOT NULL,
    "width" REAL NOT NULL,
    "height" REAL NOT NULL,
    "weedingId" TEXT NOT NULL,
    CONSTRAINT "Portfolio_weedingId_fkey" FOREIGN KEY ("weedingId") REFERENCES "Weeding" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
