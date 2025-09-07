import styles from "./HomePage.module.css";
import { Hero } from "./Hero/Hero";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { AsyncDataHandler } from "../../components/AsyncDataHandler/AsyncDataHandler";
import { useGetProductList } from "../../hooks/products/useGetProductList";
import { NewsletterSignup } from "./NewsletterSignup/NewsletterSignup";
import { SocialLinks } from "./SocialLinks/SocialLinks";
import { IoIosStar, IoIosTime } from "react-icons/io";

export const HomePage = () => {
  const {
    products: newest,
    isLoading: isNewestLoading,
    error: newestError,
  } = useGetProductList({
    itemsPerPage: 3,
    sortedBy: "created_at.asc",
  });

  const {
    products: bestSellers,
    isLoading: isBestSellersLoading,
    error: bestSellersError,
  } = useGetProductList({
    itemsPerPage: 3,
    sortedBy: "sales_count.desc",
  });

  return (
    <div className={styles.homePage}>
      <Hero />
      <section className={styles.newestArrivals}>
        <AsyncDataHandler
          isLoading={isNewestLoading}
          error={newestError?.message}
        >
          <ProductGrid
            products={newest || []}
            title="Newest Arrivals"
            icon={<IoIosTime />}
          />
        </AsyncDataHandler>
      </section>
      <SocialLinks />
      <section className={styles.bestSellers}>
        <AsyncDataHandler
          isLoading={isBestSellersLoading}
          error={bestSellersError?.message}
        >
          <ProductGrid
            products={bestSellers || []}
            title="Best Sellers"
            icon={<IoIosStar />}
          />
        </AsyncDataHandler>
      </section>
      <NewsletterSignup />
    </div>
  );
};
