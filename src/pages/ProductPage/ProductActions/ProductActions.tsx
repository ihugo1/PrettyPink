import styles from "./ProductActions.module.css";
import { useState } from "react";

interface Props {
  sizes: string[];
}

export const ProductActions = ({ sizes }: Props) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedSize(event.target.value);

  return (
    <div className={styles.productActions}>
      <div className={styles.sizeSelector}>
        <p className={styles.selectorLabel}>Select a size:</p>
        <div className={styles.radioGroup}>
          {sizes.map((size) => (
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
      </div>
    </div>
  );
};
