export const PRODUCT_SORT_OPTIONS = {
  BEST_SELLING: "sales_count.desc",
  NAME_ASC: "name.asc",
  NAME_DESC: "name.desc",
  PRICE_LOW_HIGH: "price.asc",
  PRICE_HIGH_LOW: "price.desc",
  DATE_OLD_NEW: "created_at.asc",
  DATE_NEW_OLD: "created_at.desc",
} as const;

export type ProductSortOptions = typeof PRODUCT_SORT_OPTIONS[keyof typeof PRODUCT_SORT_OPTIONS];

export const PRODUCT_SORT_LABELS: Record<ProductSortOptions, string> = {
  "sales_count.desc": "Best Selling",
  "name.asc": "Name (A-Z)",
  "name.desc": "Name (Z-A)",
  "price.asc": "Price (Low to High)",
  "price.desc": "Price (High to Low)",
  "created_at.asc": "Date (Old to New)",
  "created_at.desc": "Date (New to Old)",
};

export const PRODUCT_SORT_OPTIONS_ARRAY = Object.values(PRODUCT_SORT_OPTIONS);