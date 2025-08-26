import styles from "./ProductGrid.module.css";
import type { Product } from "../../types";
import { ProductCard } from "../ProductCard/ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  icon?: React.ReactNode;
}

export const ProductGrid = ({
  products,
  title,
  hasNextPage,
  fetchNextPage,
  icon,
}: ProductGridProps) => {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className={styles.productGrid}>
      <h3 className={styles.title}>
        {icon}
        {title}
      </h3>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasNextPage && <button onClick={fetchNextPage}>Load More</button>}
    </div>
  );
};
