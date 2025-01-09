import React from 'react'
import style from './Grid.module.css'
import {ProductCard} from '../../../components/ProductCard/ProductCard'

export const Grid = ({ products }) => {
  return (
    <div className={style['grid']}>
      {
        products.map((product)=>(
          <ProductCard
            key={product.id}
            id={product.id}
            img={product.images[0]}
            name={product.name}
            price={product.price}
          />
        ))
      }
    </div>
  )
}
