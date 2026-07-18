export interface ICreateGearPayload {
  name: string;
  description: string;
  pricePerDay: number;
  brand?: string;
  images: string[];
  categoryId: string;
}

export interface IUpdateGearPayload {
  name?: string;
  description?: string;
  pricePerDay?: number;
  brand?: string;
  images?: string[];
  availability?: boolean;
  categoryId?: string;
}

export interface IGearFilters {
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  availability?: string;
}