import styles from "./HomePage.module.css";
import { Hero } from "./Hero/Hero";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { AsyncDataHandler } from "../../components/AsyncDataHandler/AsyncDataHandler";
import { useGetProductList } from "../../hooks/useGetProductList";
import { IoIosStar } from "react-icons/io";

export const HomePage = () => {
  const { products, isLoading, error } = useGetProductList({
    itemsPerPage: 3,
    sortedBy: "sales_count.desc",
  });

  return (
    <div className={styles.homePage}>
      <Hero />
      <section className={styles.bestSellers}>
        <AsyncDataHandler isLoading={isLoading} error={error?.message}>
          <ProductGrid products={products || []} title="Best Sellers" icon={<IoIosStar />}/>
        </AsyncDataHandler>
      </section>
    </div>
  );
};
