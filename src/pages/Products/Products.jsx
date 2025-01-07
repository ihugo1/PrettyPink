import React, { useState, useEffect } from "react";
import style from "./Products.module.css";
import { Filter, Grid } from "./ProductsComponents.js";
import { useProducts } from "../../hooks/useProducts.js";

export const Products = () => {
  const { products, loading, fetchProducts } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    fetchProducts(
      selectedCategory ? `products?category=${selectedCategory}` : "products"
    );
  }, [selectedCategory]);

  return (
    <div className={style["products"]}>
      <Filter setSelectedCategory={setSelectedCategory} />
      {loading ? (
        <div className={style["loading"]}>
          <p className={style['loading-text']}>Loading...</p>
        </div>
      ) : (
        <Grid products={products} />
      )}
    </div>
  );
};
