import React from "react";
import style from "./Footer.module.css";
import { FaFacebook, FaSquareTwitter, FaSquareInstagram  } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className={style['footer']}>
      <div className={style['footer-content']}>
        <div className={style['footer-section']}>
          <h3>About Us</h3>
          <p>
            We are a leading retailer of beauty products, offering a wide range
            of high-quality items to enhance your beauty routine.
          </p>
        </div>
        <div className={style['footer-section']}>
          <h3>Contact Us</h3>
          <p>Email: support@prettypink.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className={style['footer-section']}>
          <h3>Follow Us</h3>
          <div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook/>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareTwitter/>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareInstagram/>
            </a>
          </div>
        </div>
      </div>
      <div className={style['footer-bottom']}>
        <p>&copy; 2023 Pretty Pink. All rights reserved.</p>
      </div>
    </footer>
  );
};
