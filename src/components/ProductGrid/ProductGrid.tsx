import styles from "./ProductGrid.module.css";
import type { Product } from "../../types";
import { ProductCard } from "../ProductCard/ProductCard";
import { Button } from "../Button/Button";

interface ProductGridProps {
  products: Product[];
  title?: string;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  icon?: React.ReactNode;
  isFetchingNextPage?: boolean;
}

export const ProductGrid = ({
  products,
  title,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  icon,
}: ProductGridProps) => {
  return (
    <div className={styles.productGrid}>
      {title && (
        <h3 className={styles.title}>
          {icon}
          {title}
        </h3>
      )}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {hasNextPage && (
            <Button onClick={fetchNextPage}>
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
