import React from 'react'
import style from "./ProductCard.module.css"
import { Link } from 'react-router-dom'

export const ProductCard = ({ id, img, name, price }) => {
  return (
    <Link to={`/products/${id}`} className={style['product-card']} key={id}>
      <img className={style['product-img']} src={img}></img>
      <div className={style['product-info']}>
        <p className={style['product-name']}>{name}</p>
        <p className={style['product-price']}>${price}</p>
      </div>
    </Link>
  )
}
