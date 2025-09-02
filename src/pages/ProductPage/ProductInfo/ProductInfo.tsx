import styles from "./ProductInfo.module.css";

interface Props {
  name: string;
  price: number;
  description?: string;
}

export const ProductInfo = ({ name, price, description }: Props) => {
  return (
    <div className={styles.productInfo}>
      <h2 className={styles.productName}>{name}</h2>
      <h3 className={styles.productPrice}>${price}</h3>
      <div className={styles.descriptionContainer}>
        <h3>{description ? "about this product:" : "no description availabled"}</h3>
        <p className={styles.productDescription}>
          {description}
        </p>
      </div>
    </div>
  )
}
