/*
  Warnings:

  - You are about to drop the column `key` on the `CommentCluster` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CommentCluster_authorId_key_idx";

-- DropIndex
DROP INDEX "CommentCluster_key_key";

-- AlterTable
ALTER TABLE "CommentCluster" DROP COLUMN "key";

-- CreateIndex
CREATE INDEX "CommentCluster_authorId_idx" ON "CommentCluster"("authorId");
