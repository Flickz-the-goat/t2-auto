/*
  Warnings:

  - Made the column `outputs` on table `Executions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Executions" ALTER COLUMN "outputs" SET NOT NULL;
