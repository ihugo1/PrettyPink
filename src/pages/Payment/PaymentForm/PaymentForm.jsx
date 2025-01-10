import React, { useContext, useState } from "react";
import style from "./PaymentForm.module.css";
import { CartContext } from "../../../context/ShoppingCartContext";

export const PaymentForm = () => {
  const { cart, totalCart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    alert("Order Sent")
  };
  return (
    <form className={style["payment-form"]} onSubmit={handleSubmit}>
      <div className={style["payment-form-left"]}>
        <h3 className={style["section-title"]}>Card Information</h3>
        <div className={style["input-section"]}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
            value={formData.cardNumber}
            onChange={handleChange}
          />
        </div>
        <div className={style["input-section"]}>
          <label htmlFor="cardHolder">Cardholder Name</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            placeholder="John Doe"
            required
            value={formData.cardHolder}
            onChange={handleChange}
          />
        </div>
        <div className={style["input-section"]}>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="month"
            id="expiryDate"
            name="expiryDate"
            required
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>
        <div className={style["input-section"]}>
          <label htmlFor="cvv">CVV</label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            placeholder="123"
            maxLength="3"
            required
            value={formData.cvv}
            onChange={handleChange}
          />
        </div>
        <h3 className={style["section-title"]}>Billing Address</h3>
        <div className={style["input-section"]}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="123 Main St"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={style["input-section"]}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="New York"
            required
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className={style["input-section"]}>
          <label htmlFor="zip">ZIP/Postal Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            placeholder="10001"
            required
            value={formData.zip}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={style["payment-form-right"]}>
        <div className={style["cart-total"]}>
          <p className={style["label"]}>Products: </p>
          <p className={style["ammount"]}>{cart.length}</p>
        </div>
        <div className={style["cart-total"]}>
          <p className={style["label"]}>Total Payment: </p>
          <p className={style["ammount"]}>${totalCart}</p>
        </div>
        <button className={style["summit-button"]} type="submit">
          Submit Payment
        </button>
      </div>
    </form>
  );
};
