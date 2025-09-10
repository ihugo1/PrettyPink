import styles from "./ProductEditor.module.css";
import { useEffect, useState } from "react";
import type { NewProduct, Product, ProductSize } from "../../../types";
import { useCreateProduct } from "../../../hooks/products/useCreateProduct";
import { useUpdateProduct } from "../../../hooks/products/useUpdateProduct";
import { Button } from "../../../components/Button/Button";
import { useAuth } from "../../../context/AuthContext";
import { useGetProductCategories } from "../../../hooks/products/useGetProductCategories";
import toast from "react-hot-toast";

const availableSizes: ProductSize[] = ["S", "M", "L", "XL", "XXL"];

interface ProductEditorProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product;
}

const initialProductState: NewProduct = {
  name: "",
  description: "",
  price: 0,
  main_image_url: "",
  category_id: "",
  sizes: [],
};

export const ProductEditor = ({
  isOpen,
  onClose,
  productToEdit,
}: ProductEditorProps) => {
  const isEditMode = productToEdit !== undefined;
  const [product, setProduct] = useState<NewProduct>(initialProductState);
  const { createNewProduct, isPending: isCreating } = useCreateProduct();
  const { updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { session } = useAuth();
  const { categories, isLoading, error } = useGetProductCategories();

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && productToEdit) {
        const initialSizes = Array.isArray(productToEdit.sizes)
          ? productToEdit.sizes.map((size: any) =>
              typeof size === "object" && size !== null
                ? size.name || size.size
                : size
            )
          : [];

        setProduct({
          name: productToEdit.name,
          description: productToEdit.description,
          price: productToEdit.price,
          main_image_url: productToEdit.main_image_url,
          category_id: productToEdit.category?.id,
          sizes: initialSizes,
        });
      } else {
        setProduct(initialProductState);
      }
    }
  }, [isOpen, isEditMode, productToEdit]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const size = value as ProductSize;

    setProduct((prev) => {
      const currentSizes = prev.sizes;
      if (checked) {
        return { ...prev, sizes: [...currentSizes, size] };
      } else {
        return { ...prev, sizes: currentSizes.filter((s) => s !== size) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("You must be logged in to modify a product");
      return;
    }
    if (
      product.name === "" ||
      product.description === "" ||
      product.price === 0 ||
      product.main_image_url === "" ||
      product.category_id === "" ||
      product.sizes.length === 0
    ) {
      toast.error("All fields are required, including at least one size.");
      return;
    }

    if (isEditMode) {
      console.log("Updating product...", productToEdit.id, product);
      updateProduct({ id: productToEdit.id, Product: product });
    } else {
      console.log("Creating product...", product);
      createNewProduct({ Product: product });
    }
    onClose();
  };

  const isPending = isCreating;

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2>{isEditMode ? "Editar Producto" : "Crear Nuevo Producto"}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </header>
        <main className={styles.body}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
            />
            <input
              name="description"
              value={product.description}
              onChange={handleChange}
              type="text"
              placeholder="Description"
            />
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              type="number"
              placeholder="Price"
            />
            <input
              name="main_image_url"
              value={product.main_image_url}
              onChange={handleChange}
              type="text"
              placeholder="Main Image URL"
            />
            <select
              name="category_id"
              value={product.category_id}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a category
              </option>
              {isLoading && <option>Loading...</option>}
              {error && <option>Error loading categories</option>}
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>

            <fieldset>
              <legend>Sizes</legend>
              {availableSizes.map((size) => (
                <div key={size} className={styles.sizeCheckbox}>
                                    <label htmlFor={`size-${size}`}>{size}</label>
                  <input
                    type="checkbox"
                    id={`size-${size}`}
                    value={size}
                    checked={product.sizes.includes(size)}
                    onChange={handleSizeChange}
                  />
                </div>
              ))}
            </fieldset>

            <div className={styles.formActions}>
              <Button type="submit">
                {isUpdating || isCreating
                  ? isEditMode
                    ? "Saving..."
                    : "Creating..."
                  : isEditMode
                  ? "Save Changes"
                  : "Create Product"}
              </Button>
              <Button type="button" onClick={onClose} variant="secondary">
                Cancel
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
