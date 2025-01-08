import React, { useEffect } from "react";
import style from "./ProductGallery.module.css";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export const ProductGallery = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageIndex) => {
    setSelectedImage(images[imageIndex]);
    setIsModalOpen(true);
  };

  const handleCloseButtonClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style["product-gallery"]}>
      <div className={style["main-image-container"]}>
        <img className={style["main-image"]} src={images[0]} />
      </div>
      <div className={style["images-container"]}>
        {images.map((image, index) => {
          return (
            <img
              key={index}
              className={style["image"]}
              src={image}
              onClick={() => handleImageClick(index)}
            />
          );
        })}
      </div>
      {isModalOpen && (
        <div className={style["modal"]} onClick={handleCloseButtonClick}>
          <img className={style["image-modal"]} src={selectedImage} alt="" />
          <button
            className={style["close-modal-button"]}
            onClick={handleCloseButtonClick}
          >
            <FaXmark className={style["close-modal-button-icon"]} />
          </button>
        </div>
      )}
    </div>
  );
};
