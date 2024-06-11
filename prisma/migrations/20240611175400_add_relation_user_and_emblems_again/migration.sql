/*
  Warnings:

  - You are about to drop the column `emblems` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "emblems" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emblems";

-- AddForeignKey
ALTER TABLE "emblems" ADD CONSTRAINT "emblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
