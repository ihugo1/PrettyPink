import React, { useEffect, useState } from "react";
import style from "./ProductInfo.module.css";
import { FaHeart, FaCartShopping } from "react-icons/fa6";

export const ProductInfo = ({ name, category, price, description, sizes }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <div className={style["product-info"]}>
      <h1 className={style["product-name"]}>{name}</h1>
      <p className={style["product-category"]}>{category}</p>
      <p className={style["product-price"]}>${price}</p>
      <p className={style["product-description"]}>{description}</p>

      <section className={style["buying-section"]}>
        <p className={style["size-title"]}>Select a size:</p>
        <div className={style["size-selection"]}>
          {sizes.map((size, index) => (
            <div className={style["size-button"]}>
              <input
                className={style["radio-input"]}
                type="radio"
                name="size"
                value={size}
                onChange={handleSizeChange}
              />
              <label key={index} className={style["radio-label"]} for={size}>
                {size}
              </label>
            </div>
          ))}
        </div>
        <div className={style["action-buttons"]}>
          <button className={style["action-button"]}>
            <FaCartShopping  className={style['action-button-icon']}/>
            <p className={style['action-button-text']}>Add to cart</p>
          </button>
          <button className={style["action-button"]}>
            <FaHeart className={style['action-button-icon']}/>
            <p className={style['action-button-text']}>Add to favorites</p>
          </button>
        </div>
      </section>
    </div>
  );
};
