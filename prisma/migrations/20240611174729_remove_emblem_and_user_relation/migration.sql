-- DropForeignKey
ALTER TABLE "emblems" DROP CONSTRAINT "emblems_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emblems" TEXT[];
