import styles from "./ProductPage.module.css";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../../hooks/useGetProductById";
import { AsyncDataHandler } from "../../components/AsyncDataHandler/AsyncDataHandler";
import { ProductGallery } from "./ProductGallery/ProductGallery";
import { ProductInfo } from "./ProductInfo/ProductInfo";
import { ProductActions } from "./ProductActions/ProductActions";

export const ProductPage = () => {
  const { id } = useParams();
  const { product, isLoading, error } = useGetProductById(id);

  return (
    <AsyncDataHandler isLoading={isLoading} error={error?.message}>
      {product && (
        <div className={styles.productPage}>
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
            <ProductActions sizes={product.sizes} />
          </div>
        </div>
      )}
    </AsyncDataHandler>
  );
};
