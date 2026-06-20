-- CreateEnum
CREATE TYPE "AmenityType" AS ENUM ('WIFI', 'AC', 'PARKING', 'LAUNDRY', 'GYM', 'POWER_BACKUP', 'WATER_SUPPLY', 'FURNISHED_BED', 'ATTACHED_BATHROOM', 'SECURITY', 'CCTV', 'LIFT', 'PURIFIER', 'OTHERS');

-- CreateEnum
CREATE TYPE "BHK" AS ENUM ('ONE_BHK', 'TWO_BHK', 'THREE_BHK', 'FOUR_BHK', 'ONE_RK');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('HOSTEL', 'PG', 'APARTMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "PropertyVerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "propertyType" "PropertyType" NOT NULL,
    "rent" INTEGER NOT NULL,
    "deposit" INTEGER NOT NULL,
    "maintenance" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "sharing" INTEGER NOT NULL,
    "genderPreference" "Gender" NOT NULL,
    "bhk" "BHK" NOT NULL,
    "suitableFitFor" TEXT,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "locality" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(11,8) NOT NULL,
    "formattedAddress" TEXT,
    "placeId" TEXT,
    "ownerId" TEXT NOT NULL,
    "ownerPhone" TEXT NOT NULL,
    "visitingHrs" TEXT,
    "ownershipProof" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "amenities" "AmenityType"[],
    "rules" JSONB,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verificationStatus" "PropertyVerificationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyStats" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "saveCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PropertyStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedProperty" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedProperty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_placeId_key" ON "Property"("placeId");

-- CreateIndex
CREATE INDEX "Property_bhk_idx" ON "Property"("bhk");

-- CreateIndex
CREATE INDEX "Property_city_locality_idx" ON "Property"("city", "locality");

-- CreateIndex
CREATE INDEX "Property_city_propertyType_rent_isAvailable_idx" ON "Property"("city", "propertyType", "rent", "isAvailable");

-- CreateIndex
CREATE INDEX "Property_createdAt_idx" ON "Property"("createdAt");

-- CreateIndex
CREATE INDEX "Property_genderPreference_idx" ON "Property"("genderPreference");

-- CreateIndex
CREATE INDEX "Property_isAvailable_idx" ON "Property"("isAvailable");

-- CreateIndex
CREATE INDEX "Property_latitude_longitude_idx" ON "Property"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "Property_ownerId_idx" ON "Property"("ownerId");

-- CreateIndex
CREATE INDEX "Property_propertyType_idx" ON "Property"("propertyType");

-- CreateIndex
CREATE INDEX "Property_rent_idx" ON "Property"("rent");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyStats_propertyId_key" ON "PropertyStats"("propertyId");

-- CreateIndex
CREATE INDEX "PropertyStats_propertyId_idx" ON "PropertyStats"("propertyId");

-- CreateIndex
CREATE INDEX "PropertyStats_saveCount_idx" ON "PropertyStats"("saveCount");

-- CreateIndex
CREATE INDEX "PropertyStats_viewCount_idx" ON "PropertyStats"("viewCount");

-- CreateIndex
CREATE INDEX "SavedProperty_propertyId_idx" ON "SavedProperty"("propertyId");

-- CreateIndex
CREATE INDEX "SavedProperty_savedAt_idx" ON "SavedProperty"("savedAt");

-- CreateIndex
CREATE INDEX "SavedProperty_userId_idx" ON "SavedProperty"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedProperty_userId_propertyId_key" ON "SavedProperty"("userId", "propertyId");

-- AddForeignKey
ALTER TABLE "PropertyStats" ADD CONSTRAINT "PropertyStats_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedProperty" ADD CONSTRAINT "SavedProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
