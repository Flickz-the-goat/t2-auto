/*
  Warnings:

  - Added the required column `currExecution` to the `Versions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Versions" ADD COLUMN     "currExecution" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Executions" (
    "id" SERIAL NOT NULL,
    "versionid" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NodeExecutionData" (
    "id" SERIAL NOT NULL,
    "executionid" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "output" JSONB NOT NULL,
    "nodeid" TEXT NOT NULL,

    CONSTRAINT "NodeExecutionData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Executions" ADD CONSTRAINT "fk_e_v" FOREIGN KEY ("versionid") REFERENCES "Versions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NodeExecutionData" ADD CONSTRAINT "fk_n_e" FOREIGN KEY ("executionid") REFERENCES "Executions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
