import React, { useEffect } from "react";
import style from "./Product.module.css";
import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts.js";
import { ProductGallery } from "../Product/ProductGallery/ProductGallery.jsx";
import { ProductInfo } from "../Product/ProductInfo/ProductInfo.jsx";
import { BestSellers } from "../../components/BestSellers/BestSellers.jsx";

export const Product = () => {
  const { productId } = useParams();
  const { products, loading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts(`products/${productId}`);
  }, [productId]);

  return (
    <div className={style["product"]}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={style["product-section"]}>
            <ProductGallery images={products.images} />
            <ProductInfo
              id={products.id}
              name={products.name}
              price={products.price}
              category={products.category}
              description={products.description}
              sizes={products.sizes}
              img={products.images[0]}
            />
          </div>
          <BestSellers />
        </>
      )}
    </div>
  );
};
