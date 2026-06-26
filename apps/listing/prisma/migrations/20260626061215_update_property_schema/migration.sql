/*
  Warnings:

  - The values [HOSTEL,PG] on the enum `PropertyType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `Property` table. All the data in the column will be lost.
  - The `suitableFitFor` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PropertyType_new" AS ENUM ('PG_HOSTEL', 'APARTMENT', 'OTHER');
ALTER TABLE "Property" ALTER COLUMN "propertyType" TYPE "PropertyType_new" USING ("propertyType"::text::"PropertyType_new");
ALTER TYPE "PropertyType" RENAME TO "PropertyType_old";
ALTER TYPE "PropertyType_new" RENAME TO "PropertyType";
DROP TYPE "PropertyType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "description",
ADD COLUMN     "availableFrom" TIMESTAMP(3),
DROP COLUMN "suitableFitFor",
ADD COLUMN     "suitableFitFor" TEXT[];
