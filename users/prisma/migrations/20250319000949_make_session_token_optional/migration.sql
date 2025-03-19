-- DropIndex
DROP INDEX "User_sessionToken_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sessionToken" DROP NOT NULL;
