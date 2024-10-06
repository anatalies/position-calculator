/*
  Warnings:

  - You are about to drop the `BalanceLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BalanceLog" DROP CONSTRAINT "BalanceLog_accountId_fkey";

-- DropTable
DROP TABLE "BalanceLog";

-- CreateTable
CREATE TABLE "DailySummary" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dailyBalance" DOUBLE PRECISION NOT NULL,
    "dailyProfit" DOUBLE PRECISION NOT NULL,
    "dailyLoss" DOUBLE PRECISION NOT NULL,
    "tradeCount" INTEGER NOT NULL,

    CONSTRAINT "DailySummary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailySummary" ADD CONSTRAINT "DailySummary_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
