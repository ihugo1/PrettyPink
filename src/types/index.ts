export type Product = {
  id: string;
  name: string;
  price: number;
  main_image_url: string;
  category_id?: string;
  description?: string;
  created_at: Date;
  sales_count: number;
};
