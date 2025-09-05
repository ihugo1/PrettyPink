import styles from "./ProductActions.module.css";
import { useState } from "react";
import type { Product } from "../../../types";
import { useAddCartItem } from "../../../hooks/cart/useAddCartItem";
import { Button } from "../../../components/Button/Button";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../../../context/AuthContext";

interface Props {
  product: Product;
}

export const ProductActions = ({ product }: Props) => {
  const { session } = useAuth();
  const { addCartItem, isPending } = useAddCartItem();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedSize(event.target.value);

  const handleAddToCart = () => {
    if (!session?.user.id) {
      alert("You must be logged in to add items to the cart");
      return;
    }
    if (selectedSize === null) {
      alert("Select a size");
      return;
    }
    addCartItem({ size: selectedSize, productId: product.id });
  };

  return (
    <div className={styles.productActions}>
      <div className={styles.sizeSelector}>
        <p className={styles.selectorLabel}>Select a size:</p>
        <div className={styles.radioGroup}>
          {product.sizes.map((size) => (
            <div key={size} className={styles.radioOption}>
              <input
                type="radio"
                id={`size-${size}`}
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={handleSizeChange}
                className={styles.radioInput}
              />
              <label htmlFor={`size-${size}`} className={styles.radioLabel}>
                {size}
              </label>
            </div>
          ))}
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={isPending}
          variant="primary"
          size="large"
        >
          <FaCartShopping />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
