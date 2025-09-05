import styles from "./Cart.module.css";
import { useGetCart } from "../../hooks/cart/useGetCart";
import { useRemoveCartItem } from "../../hooks/cart/useRemoveCartItem";
import { FaCartShopping, FaX, FaTrash } from "react-icons/fa6";
import { useLockScroll } from "../../hooks/utils/useLockScroll";

interface Props {
  isOpen: boolean;
  hanldeCloseCart: () => void;
}

export const Cart = ({ isOpen, hanldeCloseCart }: Props) => {
  const { data } = useGetCart();
  const { removeCartItem, isPending } = useRemoveCartItem();

  useLockScroll(isOpen);
  const handleRemoveCartItem = (cartItemId: string) => {
    removeCartItem({ cartItemId });
  };

  return (
    <div className={styles.cart}>
      <div
        className={`${styles.overlay} ${isOpen ? styles.activeOverlay : ""}`}
      ></div>
      <div
        className={`${styles.cartContainer} ${isOpen ? styles.activeCart : ""}`}
      >
        <div className={styles.cartHeader}>
          <p className={styles.icon}>
            <FaCartShopping />
          </p>
          <h2>Your Cart</h2>
          <button className={styles.closeButton} onClick={hanldeCloseCart}>
            <FaX />
          </button>
        </div>
        <div className={styles.items}>
          {data?.cart?.cart_items.map((cartItem) => (
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
          ))}
        </div>
        <div className={styles.cartFooter}>
          <p>
            Total: <strong>${data?.total}</strong>
          </p>
          <div className={styles.cartAction}>
            <button>Checkout</button>
            <button>EmptyCart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
