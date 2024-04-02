/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `CommentCluster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[secret]` on the table `CommentCluster` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `secret` to the `CommentCluster` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CommentCluster_authorId_idx";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "scope" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "CommentCluster" ADD COLUMN     "secret" TEXT NOT NULL,
ALTER COLUMN "key" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "CommentCluster_key_key" ON "CommentCluster"("key");

-- CreateIndex
CREATE UNIQUE INDEX "CommentCluster_secret_key" ON "CommentCluster"("secret");

-- CreateIndex
CREATE INDEX "CommentCluster_authorId_key_idx" ON "CommentCluster"("authorId", "key");
