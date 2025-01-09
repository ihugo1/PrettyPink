import React, { useEffect } from "react";
import style from "./Filter.module.css";
import { useCategories } from "../../../hooks/useCategories";

export const Filter = ({ setSelectedCategory }) => {
  const { categories, loading, fetchCategories } = useCategories();

  const handleOnchange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={style["products-filter"]}>
      <h1 className={style["filter-text"]}>Filter By Categories:</h1>
      <select
        className={style["categories-select"]}
        name="category"
        id=""
        onChange={handleOnchange}
      >
        <option value="">All</option>
        {loading ? (
          <option>Loading...</option>
        ) : (
          categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};
