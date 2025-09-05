import styles from "./Cart.module.css";
import { useAuth } from "../../context/AuthContext";
import { CartItem } from "./CartItem/CartItem";
import { useGetCart } from "../../hooks/cart/useGetCart";
import { useRemoveCartItem } from "../../hooks/cart/useRemoveCartItem";
import { FaCartShopping, FaX } from "react-icons/fa6";
import { useLockScroll } from "../../hooks/utils/useLockScroll";
import { AsyncDataHandler } from "../AsyncDataHandler/AsyncDataHandler";

interface Props {
  isOpen: boolean;
  hanldeCloseCart: () => void;
}

export const Cart = ({ isOpen, hanldeCloseCart }: Props) => {
  const { session } = useAuth();
  const { data, isLoading, error } = useGetCart();
  const { removeCartItem, isPending } = useRemoveCartItem();

  useLockScroll(isOpen);
  const handleRemoveCartItem = (cartItemId: string) =>
    removeCartItem({ cartItemId });

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
        <AsyncDataHandler isLoading={isLoading} error={error?.message}>
          <div className={styles.items}>
            {!session ? (
              <p className={styles.emptyCart}>
                You must be logged to see your cart.
              </p>
            ) : !data?.cart?.cart_items.length ? (
              <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
              data?.cart?.cart_items.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  handleRemoveCartItem={handleRemoveCartItem}
                  isPending={isPending}
                />
              ))
            )}
          </div>
        </AsyncDataHandler>
        <div className={styles.cartFooter}>
          {session && session.user.id && (
            <>
              <p>
                Total: <strong>${data?.total}</strong>
              </p>
              <div className={styles.cartAction}>
                <button>Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
