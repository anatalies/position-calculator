-- CreateTable
CREATE TABLE "BalanceLog" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "balanceChange" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BalanceLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BalanceLog" ADD CONSTRAINT "BalanceLog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
