/*
  Warnings:

  - Added the required column `versionNum` to the `Versions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Versions" ADD COLUMN     "versionNum" INTEGER NOT NULL;
