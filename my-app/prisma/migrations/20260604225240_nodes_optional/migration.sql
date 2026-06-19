/*
  Warnings:

  - Added the required column `currVersion` to the `Workflows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workflows" ADD COLUMN     "currVersion" INTEGER NOT NULL;
