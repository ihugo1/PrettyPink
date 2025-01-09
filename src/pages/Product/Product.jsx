import React, { useEffect } from "react";
import style from "./Product.module.css";
import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { ProductGallery, ProductInfo } from "./ProductComponents";

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
          <ProductGallery images={products.images}/>
          <ProductInfo 
            id={products.id}
            name={products.name} 
            price={products.price} 
            category={products.category} 
            description={products.description}
            sizes={products.sizes}
            img={products.images[0]}
          />
        </>
      )}
    </div>
  );
};
