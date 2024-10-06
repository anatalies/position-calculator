/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `profit` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `loss` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `amount` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE INTEGER,
ALTER COLUMN "profit" SET DEFAULT 0,
ALTER COLUMN "profit" SET DATA TYPE INTEGER,
ALTER COLUMN "loss" SET DEFAULT 0,
ALTER COLUMN "loss" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "amount" INTEGER NOT NULL;
