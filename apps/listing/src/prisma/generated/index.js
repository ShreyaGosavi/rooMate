
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PropertyScalarFieldEnum = {
  id: 'id',
  title: 'title',
  propertyType: 'propertyType',
  rent: 'rent',
  deposit: 'deposit',
  maintenance: 'maintenance',
  sharing: 'sharing',
  isAvailable: 'isAvailable',
  genderPreference: 'genderPreference',
  bhk: 'bhk',
  suitableFitFor: 'suitableFitFor',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  locality: 'locality',
  city: 'city',
  district: 'district',
  state: 'state',
  country: 'country',
  postalCode: 'postalCode',
  latitude: 'latitude',
  longitude: 'longitude',
  formattedAddress: 'formattedAddress',
  placeId: 'placeId',
  ownerId: 'ownerId',
  ownerPhone: 'ownerPhone',
  visitingHrs: 'visitingHrs',
  availableFrom: 'availableFrom',
  ownershipProof: 'ownershipProof',
  verifiedAt: 'verifiedAt',
  amenities: 'amenities',
  rules: 'rules',
  images: 'images',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  verificationStatus: 'verificationStatus'
};

exports.Prisma.PropertyStatsScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  viewCount: 'viewCount',
  saveCount: 'saveCount'
};

exports.Prisma.SavedPropertyScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  propertyId: 'propertyId',
  savedAt: 'savedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.PropertyType = exports.$Enums.PropertyType = {
  PG_HOSTEL: 'PG_HOSTEL',
  APARTMENT: 'APARTMENT',
  OTHER: 'OTHER'
};

exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

exports.BHK = exports.$Enums.BHK = {
  ONE_BHK: 'ONE_BHK',
  TWO_BHK: 'TWO_BHK',
  THREE_BHK: 'THREE_BHK',
  FOUR_BHK: 'FOUR_BHK',
  ONE_RK: 'ONE_RK'
};

exports.PropertyVerificationStatus = exports.$Enums.PropertyVerificationStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

exports.AmenityType = exports.$Enums.AmenityType = {
  WIFI: 'WIFI',
  AC: 'AC',
  PARKING: 'PARKING',
  LAUNDRY: 'LAUNDRY',
  GYM: 'GYM',
  POWER_BACKUP: 'POWER_BACKUP',
  WATER_SUPPLY: 'WATER_SUPPLY',
  FURNISHED_BED: 'FURNISHED_BED',
  ATTACHED_BATHROOM: 'ATTACHED_BATHROOM',
  SECURITY: 'SECURITY',
  CCTV: 'CCTV',
  LIFT: 'LIFT',
  PURIFIER: 'PURIFIER',
  OTHERS: 'OTHERS'
};

exports.Prisma.ModelName = {
  Property: 'Property',
  PropertyStats: 'PropertyStats',
  SavedProperty: 'SavedProperty'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/mac/Desktop/RooMate/apps/listing/src/prisma/generated",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/mac/Desktop/RooMate/apps/listing/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/prisma/generated\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Property {\n  id                 String                     @id @default(cuid())\n  title              String\n  propertyType       PropertyType\n  rent               Int\n  deposit            Int\n  maintenance        Int\n  sharing            Int\n  isAvailable        Boolean                    @default(true)\n  genderPreference   Gender\n  bhk                BHK\n  suitableFitFor     String[]\n  addressLine1       String\n  addressLine2       String?\n  locality           String\n  city               String\n  district           String\n  state              String\n  country            String\n  postalCode         String\n  latitude           Decimal                    @db.Decimal(10, 8)\n  longitude          Decimal                    @db.Decimal(11, 8)\n  formattedAddress   String?\n  placeId            String?                    @unique\n  ownerId            String\n  ownerPhone         String\n  visitingHrs        String?\n  availableFrom      DateTime?\n  ownershipProof     String?\n  verifiedAt         DateTime?\n  amenities          AmenityType[]\n  rules              Json?\n  images             String[]\n  createdAt          DateTime                   @default(now())\n  updatedAt          DateTime                   @updatedAt\n  verificationStatus PropertyVerificationStatus @default(PENDING)\n  PropertyStats      PropertyStats?\n  SavedProperty      SavedProperty[]\n\n  @@index([bhk])\n  @@index([city, locality])\n  @@index([city, propertyType, rent, isAvailable])\n  @@index([createdAt])\n  @@index([genderPreference])\n  @@index([isAvailable])\n  @@index([latitude, longitude])\n  @@index([ownerId])\n  @@index([propertyType])\n  @@index([rent])\n}\n\nmodel PropertyStats {\n  id         String   @id @default(cuid())\n  propertyId String   @unique\n  viewCount  Int      @default(0)\n  saveCount  Int      @default(0)\n  Property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)\n\n  @@index([propertyId])\n  @@index([saveCount])\n  @@index([viewCount])\n}\n\nmodel SavedProperty {\n  id         String   @id @default(cuid())\n  userId     String\n  propertyId String\n  savedAt    DateTime @default(now())\n  Property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, propertyId])\n  @@index([propertyId])\n  @@index([savedAt])\n  @@index([userId])\n}\n\nenum AmenityType {\n  WIFI\n  AC\n  PARKING\n  LAUNDRY\n  GYM\n  POWER_BACKUP\n  WATER_SUPPLY\n  FURNISHED_BED\n  ATTACHED_BATHROOM\n  SECURITY\n  CCTV\n  LIFT\n  PURIFIER\n  OTHERS\n}\n\nenum BHK {\n  ONE_BHK\n  TWO_BHK\n  THREE_BHK\n  FOUR_BHK\n  ONE_RK\n}\n\nenum Gender {\n  MALE\n  FEMALE\n}\n\nenum PropertyType {\n  PG_HOSTEL\n  APARTMENT\n  OTHER\n}\n\nenum PropertyVerificationStatus {\n  PENDING\n  VERIFIED\n  REJECTED\n}\n",
  "inlineSchemaHash": "9f4b2bfcf19a8068f161a82616f020f75d28700e01bf3d30b9caef22bfae07c8",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/prisma/generated",
    "prisma/generated",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Property\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"propertyType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PropertyType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deposit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maintenance\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sharing\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isAvailable\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"genderPreference\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Gender\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bhk\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BHK\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"suitableFitFor\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"addressLine1\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"addressLine2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locality\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"district\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postalCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"longitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"formattedAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"placeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerPhone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"visitingHrs\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"availableFrom\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownershipProof\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verifiedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amenities\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AmenityType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rules\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"verificationStatus\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PropertyVerificationStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"PropertyStats\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PropertyStats\",\"relationName\":\"PropertyToPropertyStats\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"SavedProperty\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SavedProperty\",\"relationName\":\"PropertyToSavedProperty\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PropertyStats\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"viewCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"saveCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Property\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Property\",\"relationName\":\"PropertyToPropertyStats\",\"relationFromFields\":[\"propertyId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SavedProperty\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"savedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Property\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Property\",\"relationName\":\"PropertyToSavedProperty\",\"relationFromFields\":[\"propertyId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"propertyId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"propertyId\"]}],\"isGenerated\":false}},\"enums\":{\"AmenityType\":{\"values\":[{\"name\":\"WIFI\",\"dbName\":null},{\"name\":\"AC\",\"dbName\":null},{\"name\":\"PARKING\",\"dbName\":null},{\"name\":\"LAUNDRY\",\"dbName\":null},{\"name\":\"GYM\",\"dbName\":null},{\"name\":\"POWER_BACKUP\",\"dbName\":null},{\"name\":\"WATER_SUPPLY\",\"dbName\":null},{\"name\":\"FURNISHED_BED\",\"dbName\":null},{\"name\":\"ATTACHED_BATHROOM\",\"dbName\":null},{\"name\":\"SECURITY\",\"dbName\":null},{\"name\":\"CCTV\",\"dbName\":null},{\"name\":\"LIFT\",\"dbName\":null},{\"name\":\"PURIFIER\",\"dbName\":null},{\"name\":\"OTHERS\",\"dbName\":null}],\"dbName\":null},\"BHK\":{\"values\":[{\"name\":\"ONE_BHK\",\"dbName\":null},{\"name\":\"TWO_BHK\",\"dbName\":null},{\"name\":\"THREE_BHK\",\"dbName\":null},{\"name\":\"FOUR_BHK\",\"dbName\":null},{\"name\":\"ONE_RK\",\"dbName\":null}],\"dbName\":null},\"Gender\":{\"values\":[{\"name\":\"MALE\",\"dbName\":null},{\"name\":\"FEMALE\",\"dbName\":null}],\"dbName\":null},\"PropertyType\":{\"values\":[{\"name\":\"PG_HOSTEL\",\"dbName\":null},{\"name\":\"APARTMENT\",\"dbName\":null},{\"name\":\"OTHER\",\"dbName\":null}],\"dbName\":null},\"PropertyVerificationStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"VERIFIED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin.dylib.node");
path.join(process.cwd(), "src/prisma/generated/libquery_engine-darwin.dylib.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/prisma/generated/schema.prisma")
