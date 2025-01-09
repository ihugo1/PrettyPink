import React, { useEffect } from "react";
import style from "./BestSellers.module.css";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "../ProductCard/ProductCard";

export const BestSellers = () => {
  const { products, loading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts("products?best_seller=true");
  }, []);

  return (
    <section className={style["best-sellers"]}>
      <p className={style["title"]}>CHECK OUT OUR BEST SELLERS</p>
      <div className={style["best-sellers-container"]}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              img={product.images[0]}
              name={product.name}
              price={product.price}
            />
          ))
        )}
      </div>
      <Link to="/products" className={style["link"]}>
        CHECK OUT ALL OUR PRODUCTS
      </Link>
    </section>
  );
};
