/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to drop the column `profitLoss` on the `Trade` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderType` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeResult` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "totalProfit" REAL NOT NULL DEFAULT 0,
    "totalLoss" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Account" ("balance", "createdAt", "id", "totalLoss", "totalProfit", "updatedAt") SELECT "balance", "createdAt", "id", "totalLoss", "totalProfit", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE TABLE "new_Trade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pair" TEXT NOT NULL,
    "tradeResult" TEXT NOT NULL,
    "orderType" TEXT NOT NULL,
    "lotSize" REAL NOT NULL,
    "entryPrice" REAL NOT NULL,
    "exitPrice" REAL NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "Trade_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trade" ("accountId", "createdAt", "entryPrice", "exitPrice", "id", "lotSize", "pair") SELECT "accountId", "createdAt", "entryPrice", "exitPrice", "id", "lotSize", "pair" FROM "Trade";
DROP TABLE "Trade";
ALTER TABLE "new_Trade" RENAME TO "Trade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
