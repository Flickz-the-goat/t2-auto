-- CreateTable
CREATE TABLE "Workflows" (
    "id" SERIAL NOT NULL,
    "ownerid" INTEGER NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT,
    "active" BOOLEAN NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Versions" (
    "id" SERIAL NOT NULL,
    "workflowid" INTEGER NOT NULL,
    "nodes" JSONB NOT NULL,
    "edges" JSONB NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Versions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workflows" ADD CONSTRAINT "fk_w_o" FOREIGN KEY ("ownerid") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Versions" ADD CONSTRAINT "fk_v_w" FOREIGN KEY ("workflowid") REFERENCES "Workflows"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
