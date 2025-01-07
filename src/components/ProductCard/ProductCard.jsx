import React from 'react'
import style from "./ProductCard.module.css"

export const ProductCard = ({ id, img, name, price }) => {
  return (
    <div className={style['product-card']} key={id}>
      <img className={style['product-img']} src={img}></img>
      <div className={style['product-info']}>
        <p className={style['product-name']}>{name}</p>
        <p className={style['product-price']}>${price}</p>
      </div>
    </div>
  )
}
