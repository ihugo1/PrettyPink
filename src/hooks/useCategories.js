import { useState } from "react";
const API_URL =
  "https://67101f4da85f4164ef2d2416.mockapi.io/fashionplaceapi/v1/";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL + "product_categories");
      const data = await response.json();
      setCategories(data);
    } catch {
      console.log("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, fetchCategories };
};
