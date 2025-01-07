import { useState } from "react";
const API_URL =
  "https://67101f4da85f4164ef2d2416.mockapi.io/fashionplaceapi/v1/";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (endpoint) => {
    try {
      setLoading(true);
      const response = await fetch(API_URL + endpoint);
      const data = await response.json();
      setProducts(data);
    } catch {
      console.log("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, fetchProducts };
};
