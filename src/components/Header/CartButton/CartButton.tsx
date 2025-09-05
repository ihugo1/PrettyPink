import { FaCartShopping } from "react-icons/fa6";
import { useGetCart } from "../../../hooks/useGetCart";
import styles from "./CartButton.module.css";

interface Props {
  onClick: () => void;
}

export const CartButton = ({ onClick }: Props) => {
  const { data: cartData } = useGetCart();
  const numItems = cartData?.cart?.cart_items.length || 0;

  return (
    <button className={styles.cartButton} onClick={onClick}>
      <FaCartShopping />
      {numItems > 0 && <span className={styles.cartBadge}>{numItems}</span>}
    </button>
  );
};