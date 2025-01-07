import React, { useEffect } from 'react'
import style from "./BestSellers.module.css"
import { useProducts } from '../../../../hooks/useProducts'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'

export const BestSellers = () => {
  const { products, loading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts("products?best_seller=true");
  }, []);

  return (
    <section className={style['best-sellers']}>
      <p className={style['title']}>CHECK OUT OUR BEST SELLERS</p>
      <div className={style['best-sellers-container']}>
        {
          loading ? ( <p>Loading...</p> ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                img={product.images[0]}
                name={product.name}
                price={product.price}
              />
            ))
          )
        }
      </div>
      <a className={style['link']} href="#">CHECK OUT ALL OUR PRODUCTS</a>
    </section>
  )
}
