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
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return <div>{children}</div>;
};
