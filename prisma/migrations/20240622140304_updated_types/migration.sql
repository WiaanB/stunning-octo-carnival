-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "status" SET DEFAULT 'pending';
