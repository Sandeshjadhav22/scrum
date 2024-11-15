/*
  Warnings:

  - You are about to drop the column `organisationId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationId,key]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_organisationId_key_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "organisationId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_organizationId_key_key" ON "Project"("organizationId", "key");
