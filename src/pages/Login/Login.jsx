import React from "react";
import style from "./Login.module.css";

export const Login = () => {
  return (
    <div className={style["login"]}>
      <form action="/login" method="POST" className={style['login-form']}>
        <div className={style["login-section"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div className={style["login-section"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
