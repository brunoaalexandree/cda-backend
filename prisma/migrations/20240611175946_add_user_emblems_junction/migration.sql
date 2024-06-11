/*
  Warnings:

  - You are about to drop the column `userId` on the `emblems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "emblems" DROP CONSTRAINT "emblems_userId_fkey";

-- AlterTable
ALTER TABLE "emblems" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "user_emblems" (
    "userId" TEXT NOT NULL,
    "emblemId" TEXT NOT NULL,

    CONSTRAINT "user_emblems_pkey" PRIMARY KEY ("userId","emblemId")
);

-- AddForeignKey
ALTER TABLE "user_emblems" ADD CONSTRAINT "user_emblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_emblems" ADD CONSTRAINT "user_emblems_emblemId_fkey" FOREIGN KEY ("emblemId") REFERENCES "emblems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
