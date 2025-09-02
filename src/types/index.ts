export type Product = {
  id: string;
  name: string;
  price: number;
  main_image_url: string;
  category: ProductCategory;
  description?: string;
  created_at: Date;
  sales_count: number;
  product_images?: ProductImage[];
  sizes: string[];
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  alt_text: string;
}

export type ProductCategory ={
  id: string;
  name: string;
  description?: string;
}
