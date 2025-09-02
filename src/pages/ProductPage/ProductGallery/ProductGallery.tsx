import styles from "./ProductGallery.module.css";
import type { ProductImage } from "../../../types";
import { useState } from "react";

interface Props {
  mainImageUrl: string;
  images: ProductImage[];
}

export const ProductGallery = ({ images, mainImageUrl }: Props) => {
  const allImageUrls = [mainImageUrl, ...images.map((img) => img.url)];
  const [currentMainImage, setCurrentMainImage] = useState(allImageUrls[0]);

  return (
    <div className={styles.productGallery}>
      <div className={styles.mainImageContainer}>
        <img className={styles.mainImage} src={currentMainImage} />
      </div>
      {images.length > 0 && (
        <div className={styles.imagesContainer}>
          {images.length > 0 &&
            allImageUrls.map((url, index) => (
              <img
                className={currentMainImage === url ? styles.selectedImage : ""}
                key={index}
                src={url}
                onClick={() => setCurrentMainImage(url)}
              />
            ))}
        </div>
      )}
    </div>
  );
};
