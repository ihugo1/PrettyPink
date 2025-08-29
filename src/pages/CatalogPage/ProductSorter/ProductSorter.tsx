import styles from "./ProductSorter.module.css";
import { productSortDisplayOptions } from "../../../api/productsService";
import type { ProductSortOptions } from "../../../api/productsService";

interface Props {
  sortedBy: ProductSortOptions;
  setSortedBy: (option: ProductSortOptions) => void;
}

export const ProductSorter = ({ setSortedBy, sortedBy }: Props) => {
  return (
    <select
    className={styles.productSorter}
      value={sortedBy}
      onChange={(e) => setSortedBy(e.target.value as ProductSortOptions)}
    >
      {productSortDisplayOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
