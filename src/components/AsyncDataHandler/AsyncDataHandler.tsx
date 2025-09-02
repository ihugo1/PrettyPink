import styles from "./AsyncDataHandler.module.css";

interface AsyncDataHandlerProps {
  children: React.ReactNode;
  isLoading: boolean;
  error: string | undefined;
}

export const AsyncDataHandler = ({
  children,
  isLoading,
  error,
}: AsyncDataHandlerProps) => {
  if (isLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return <div className={styles.container}>{children}</div>;
};
