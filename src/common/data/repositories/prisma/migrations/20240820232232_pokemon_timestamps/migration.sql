-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pokemon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_pokemon" ("id", "image", "name") SELECT "id", "image", "name" FROM "pokemon";
DROP TABLE "pokemon";
ALTER TABLE "new_pokemon" RENAME TO "pokemon";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
