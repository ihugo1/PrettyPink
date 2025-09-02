import styles from "./ProductCard.module.css";
import type { Product } from "../../types";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigation = useNavigate();

  const handleProductClick = () => navigation(`/product/${product.id}`);

  return (
    <div className={styles.productCard} onClick={handleProductClick}>
      <img
        className={styles.productImage}
        src={product.main_image_url}
        alt={product.name}
      />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>${product.price}</p>
      </div>
    </div>
  );
};
