-- AlterTable
ALTER TABLE "Versions" ADD COLUMN     "children" JSONB,
ADD COLUMN     "dag" JSONB,
ADD COLUMN     "parents" JSONB,
ADD COLUMN     "valid" BOOLEAN;
