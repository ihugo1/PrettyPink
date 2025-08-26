import styles from "./ProductCard.module.css";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.productCard}>
      <img className={styles.productImage} src={product.main_image_url} alt={product.name} />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>${product.price}</p>
      </div>
    </div>
  );
};
