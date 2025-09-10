import styles from "./AdminPage.module.css";
import { ProductEditor } from "./ProductEditor/ProductEditor";
import { ProductSorter } from "../CatalogPage/ProductSorter/ProductSorter";
import { AsyncDataHandler } from "../../components/AsyncDataHandler/AsyncDataHandler";
import { Button } from "../../components/Button/Button";
import { useGetProductList } from "../../hooks/products/useGetProductList";
import { useDeleteProduct } from "../../hooks/products/useDeleteProduct";
import { useState } from "react";
import type { ProductSortOptions } from "../../constants/productSort";
import type { Product } from "../../types";
import toast from "react-hot-toast";

export const AdminPage = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(
    undefined
  );

  const [sortedBy, setSortedBy] =
    useState<ProductSortOptions>("created_at.desc");
  const {
    products,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetProductList({
    itemsPerPage: 10,
    sortedBy: sortedBy,
  });
  const { deleteProduct } = useDeleteProduct();

  const handleOpenCreate = () => {
    setProductToEdit(undefined);
    setEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    toast((t) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <span>DELETE THIS PRODUCT?</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            onClick={() => {
              deleteProduct({ id });
              toast.dismiss(t.id);
            }}
            variant="secondary"
            size="medium"
          >
            CONFIRM
          </Button>
          <Button
            onClick={() => toast.dismiss(t.id)}
            variant="secondary"
            size="medium"
          >
            CANCEL
          </Button>
        </div>
      </div>
    ));
  };

  const handleOpenEdit = (product: Product) => {
    setProductToEdit(product);
    setEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setEditorOpen(false);
  };

  return (
    <div className={styles.adminPage}>
      <h3>Admin panel</h3>
      <div className={styles.adminBar}>
        <Button onClick={handleOpenCreate}>Add New Product</Button>
        <ProductSorter setSortedBy={setSortedBy} sortedBy={sortedBy} />
      </div>
      <div className={styles.productlist}>
        <AsyncDataHandler isLoading={isLoading} error={error?.message}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{new Date(product.created_at).toLocaleDateString()}</td>
                  <td className={styles.actions}>
                    <Button
                      onClick={() => handleOpenEdit(product)}
                      variant="secondary"
                      size="medium"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="secondary"
                      size="medium"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {hasNextPage && (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    <Button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                    >
                      {isFetchingNextPage ? "Loading..." : "Load More"}
                    </Button>
                  </td>
                </tr>
              )}
            </tfoot>
          </table>
        </AsyncDataHandler>
      </div>

      <ProductEditor
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        productToEdit={productToEdit}
      />
    </div>
  );
};
