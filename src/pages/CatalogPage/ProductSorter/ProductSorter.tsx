import styles from "./ProductSorter.module.css";
import { useProductSortOptions } from "../../../hooks/products/useProductSortOptions";
import type { ProductSortOptions } from "../../../constants/productSort";

interface Props {
  sortedBy: ProductSortOptions;
  setSortedBy: (option: ProductSortOptions) => void;
}

export const ProductSorter = ({ setSortedBy, sortedBy }: Props) => {
  const { options } = useProductSortOptions();

  return (
    <select
      className={styles.productSorter}
      value={sortedBy}
      onChange={(e) => setSortedBy(e.target.value as ProductSortOptions)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
