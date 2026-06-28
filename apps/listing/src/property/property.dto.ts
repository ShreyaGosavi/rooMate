import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsArray, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AmenityType, BHK, Gender, PropertyType } from "../prisma/generated";

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  rent: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  deposit: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  maintenance: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  sharing: number;

  @IsEnum(Gender)
  genderPreference: Gender;

  @IsEnum(BHK)
  bhk: BHK;

  @IsArray()
  @IsString({ each: true })
  suitableFitFor: string[];

  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  locality: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsNumber()
  @Type(() => Number)
  latitude: number;

  @IsNumber()
  @Type(() => Number)
  longitude: number;

  @IsOptional()
  @IsString()
  formattedAddress?: string;

  @IsOptional()
  @IsString()
  placeId?: string;

  @IsString()
  @IsNotEmpty()
  ownerPhone: string;

  @IsOptional()
  @IsString()
  visitingHrs?: string;

  @IsOptional()
  availableFrom?: Date;

  @IsArray()
  @IsEnum(AmenityType, { each: true })
  amenities: AmenityType[];

  @IsOptional()
  rules?: Record<string, unknown>;
}

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  rent?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  deposit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  maintenance?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  sharing?: number;

  @IsOptional()
  isAvailable?: boolean;

  @IsOptional()
  @IsString()
  visitingHrs?: string;

  @IsOptional()
  availableFrom?: Date;

  @IsOptional()
  @IsArray()
  @IsEnum(AmenityType, { each: true })
  amenities?: AmenityType[];

  @IsOptional()
  rules?: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  suitableFitFor?: string[];
}

export class FilterPropertiesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  lat?: number;

  @IsOptional()
  @Type(() => Number)
  lng?: number;

  @IsOptional()
  @Type(() => Number)
  radius?: number;

  @IsOptional()
  @Type(() => Number)
  minRent?: number;

  @IsOptional()
  @Type(() => Number)
  maxRent?: number;

  @IsOptional()
  gender?: Gender;

  @IsOptional()
  propertyType?: PropertyType;

  @IsOptional()
  bhk?: BHK;

  @IsOptional()
  amenities?: AmenityType[];

  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;
}

export function parseCreateDto(raw: any): CreatePropertyDto {
  return {
    ...raw,
    rent: Number(raw.rent),
    deposit: Number(raw.deposit),
    maintenance: Number(raw.maintenance),
    sharing: Number(raw.sharing),
    latitude: Number(raw.latitude),
    longitude: Number(raw.longitude),
    availableFrom: raw.availableFrom ? new Date(raw.availableFrom) : undefined,
    suitableFitFor: Array.isArray(raw.suitableFitFor) ? raw.suitableFitFor : raw.suitableFitFor ? [raw.suitableFitFor] : [],
    amenities: Array.isArray(raw.amenities) ? raw.amenities : raw.amenities ? [raw.amenities] : [],
  };
}
