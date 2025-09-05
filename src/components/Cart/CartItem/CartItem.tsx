import styles from "./CartItem.module.css";
import type { CartItem as item } from "../../../types";
import { FaTrash } from "react-icons/fa6";

interface Props {
  cartItem: item;
  handleRemoveCartItem: (cartItemId: string) => void;
  isPending: boolean;
}

export const CartItem = ({
  cartItem,
  handleRemoveCartItem,
  isPending,
}: Props) => {
  return (
    <div className={styles.item} key={cartItem.id}>
      <img
        className={styles.itemImage}
        src={cartItem.product?.main_image_url}
        alt={cartItem.product?.name}
      />
      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{cartItem.product?.name}</p>
        <p className={styles.itemSize}>{cartItem.size}</p>
        <p className={styles.itemPrice}>${cartItem.product?.price}</p>
      </div>
      <button
        className={styles.removeButton}
        onClick={() => handleRemoveCartItem(cartItem.id)}
        disabled={isPending}
      >
        <FaTrash />
      </button>
    </div>
  );
};
