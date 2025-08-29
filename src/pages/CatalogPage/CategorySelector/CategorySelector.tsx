import styles from "./CategorySelector.module.css";
import { useGetProductCategories } from "../../../hooks/useGetProductCategories";
import { AsyncDataHandler } from "../../../components/AsyncDataHandler/AsyncDataHandler";

interface Props {
  activeCategoryId: string | undefined;
  setCategoryId: (categoryId: string | undefined) => void;
}

export const CategorySelector = ({
  activeCategoryId,
  setCategoryId,
}: Props) => {
  const { categories, isLoading, error } = useGetProductCategories();



  return (
    <div className={styles.categorySelector}>
      <h2>Categories</h2>
      <AsyncDataHandler isLoading={isLoading} error={error?.message}>
        <div className={styles.categories}>
          <div
            className={`${styles.categoryItem} ${
              activeCategoryId === undefined ? styles.active : ""
            }`}
            onClick={() => {
              setCategoryId(undefined);
            }}
          >
            All Categories
          </div>
          {categories?.map((category) => (
            <div
              key={category.id}
              className={`${styles.categoryItem} ${
                activeCategoryId === category.id ? styles.active : ""
              }`}
              onClick={() => {
                setCategoryId(category.id);
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      </AsyncDataHandler>
    </div>
  );
};
