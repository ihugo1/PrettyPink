import styles from "./CatalogPage.module.css";
import { useState } from "react";
import { CategorySelector } from "./CategorySelector/CategorySelector";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { ProductSorter } from "./ProductSorter/ProductSorter";
import { useGetProductList } from "../../hooks/products/useGetProductList";
import { AsyncDataHandler } from "../../components/AsyncDataHandler/AsyncDataHandler";
import type { ProductSortOptions } from "../../constants/productSort";
import { useSearchParams } from "react-router-dom";
import hero from "../../assets/images/anastasiia-nelen-6QHLVv84Dqo-unsplash.webp";

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryId = searchParams.get("category") || undefined;
  const sortedBy =
    (searchParams.get("sort") as ProductSortOptions) || undefined;

  const handleSetCategoryId = (id: string | undefined) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (id) {
      newSearchParams.set("category", id);
    } else {
      newSearchParams.delete("category");
    }
    setSearchParams(newSearchParams);
  };

  const handleSetSortedBy = (sortOption: ProductSortOptions) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", sortOption);
    setSearchParams(newSearchParams);
  };

  const handleFilterMenu = () => setIsFilterOpen(!isFilterOpen);

  const { products, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetProductList({
      categoryId: categoryId,
      sortedBy: sortedBy,
    });

  return (
    <div className={styles.catalogPage}>
      <div className={styles.hero}>
        <img className={styles.heroImage} src={hero} alt="Pretty Pink" />
        <div className={styles.heroContent}>
          <h3>Catalog</h3>
        </div>
      </div>
      <div className={styles.filtersContainer}>
        <button className={styles.filtersButton} onClick={handleFilterMenu}>
          Filters{categoryId ? `*` : ""}
        </button>
        <ProductSorter setSortedBy={handleSetSortedBy} sortedBy={sortedBy} />
      </div>
      <div className={styles.content}>
        <div className={styles.categorySelectorContainer}>
          <CategorySelector
            setCategoryId={handleSetCategoryId}
            activeCategoryId={categoryId}
          />
        </div>
        <div
          className={`${styles.categorySelectorContainerMobile} ${
            isFilterOpen ? styles.active : ""
          }`}
          onClick={handleFilterMenu}
        >
          <CategorySelector
            setCategoryId={handleSetCategoryId}
            activeCategoryId={categoryId}
          />
        </div>
        <AsyncDataHandler isLoading={isLoading} error={error?.message}>
          <ProductGrid
            products={products || []}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </AsyncDataHandler>
      </div>
    </div>
  );
};
