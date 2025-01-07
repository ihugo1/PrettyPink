import { useState } from "react";
const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const products = [
    { id: "lip-liner", name: "Lip Liner" },
    { id: "lipstick", name: "Lipstick" },
    { id: "foundation", name: "Foundation" },
    { id: "eyeliner", name: "Eyeliner" },
    { id: "eyeshadow", name: "Eyeshadow" },
    { id: "blush", name: "Blush" },
    { id: "bronzer", name: "Bronzer" },
    { id: "mascara", name: "Mascara" },
    { id: "eyebrow", name: "Eyebrow" },
    { id: "nail-polish", name: "Nail Polish" },
  ];

  const fetchCategories = async () => {
    try {
      /*
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      const categories = data.map((product) => product.product_type);
      const uniqueCategories = [...new Set(categories)];
      const categoryObjects = uniqueCategories.map((category) => ({
        id: category.replace(/\s+/g, '_').toLowerCase(),
        name: category.replace(/_/g, ' ')
      }));
      setCategories(categoryObjects);
      */
     setCategories(products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, fetchCategories };
};