export type Product = {
  id: string;
  name: string;
  price: number;
  main_image_url: string;
  category_id?: ProductCategory;
  description?: string;
  created_at: Date;
  sales_count: number;
};

export type ProductCategory ={
  id: string;
  name: string;
  description?: string;
}
