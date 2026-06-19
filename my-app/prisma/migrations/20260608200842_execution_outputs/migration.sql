/*
  Warnings:

  - You are about to drop the column `outputs` on the `Versions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Executions" ADD COLUMN     "outputs" JSONB;

-- AlterTable
ALTER TABLE "Versions" DROP COLUMN "outputs";
