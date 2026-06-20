import { AmenityType, BHK, Gender, PropertyType } from "../prisma/generated";

export class CreatePropertyDto {
  title: string;
  description: string;
  propertyType: PropertyType;
  rent: number;
  deposit: number;
  maintenance: number;
  sharing: number;
  genderPreference: Gender;
  bhk: BHK;
  suitableFitFor?: string;
  addressLine1: string;
  addressLine2?: string;
  locality: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  formattedAddress?: string;
  placeId?: string;
  ownerPhone: string;
  visitingHrs?: string;
  amenities: AmenityType[];
  rules?: Record<string, unknown>;
}

export class UpdatePropertyDto {
  title?: string;
  description?: string;
  rent?: number;
  deposit?: number;
  maintenance?: number;
  sharing?: number;
  isAvailable?: boolean;
  visitingHrs?: string;
  amenities?: AmenityType[];
  rules?: Record<string, unknown>;
  suitableFitFor?: string;
}

export class FilterPropertiesDto {
  lat?: number;
  lng?: number;
  radius?: number;
  minRent?: number;
  maxRent?: number;
  gender?: Gender;
  propertyType?: PropertyType;
  bhk?: BHK;
  amenities?: AmenityType[];
  page?: number;
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
    amenities: Array.isArray(raw.amenities)
      ? raw.amenities
      : raw.amenities
        ? [raw.amenities]
        : [],
  };
}
