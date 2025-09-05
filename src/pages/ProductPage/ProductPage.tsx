import styles from "./ProductPage.module.css";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../../hooks/useGetProductById";
import { AsyncDataHandler } from "../../components/AsyncDataHandler/AsyncDataHandler";
import { ProductGallery } from "./ProductGallery/ProductGallery";
import { ProductInfo } from "./ProductInfo/ProductInfo";
import { ProductActions } from "./ProductActions/ProductActions";
import { useGetProductList } from "../../hooks/useGetProductList";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";

export const ProductPage = () => {
  const { id } = useParams();
  const { product, isLoading, error } = useGetProductById(id);
  const {
    products: related,
    isLoading: relatedLoading,
    error: relatedError,
  } = useGetProductList({
    itemsPerPage: 4,
    sortedBy: "sales_count.asc",
    categoryId: product?.category.id,
  });

  return (
    <div className={styles.productPage}>
      {/* MAIN CONTENT*/}
      <AsyncDataHandler isLoading={isLoading} error={error?.message}>
        <>
          {product && (
            <div className={styles.mainContent}>
              <ProductGallery
                key={product.id}
                mainImageUrl={product.main_image_url}
                images={product.product_images || []}
              />
              <div className={styles.productDetails}>
                <ProductInfo
                  name={product.name}
                  price={product.price}
                  description={product.description}
                />
                <ProductActions product={product} />
              </div>
            </div>
          )}
          <AsyncDataHandler
            isLoading={relatedLoading}
            error={relatedError?.message}
          >
            <ProductGrid
              products={related.filter((p) => p.id !== product?.id).slice(0, 3)}
              title="Related Products"
            />
          </AsyncDataHandler>
        </>
      </AsyncDataHandler>
    </div>
  );
};
