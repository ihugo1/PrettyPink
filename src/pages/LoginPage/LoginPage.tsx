import styles from "./LoginPage.module.css";
import { useAuth } from "../../context/AuthContext"; // Importamos nuestro hook useAuth

export const LoginPage = () => {
  const { signInWithGoogle, isLoading } = useAuth(); // Obtenemos la función y el estado del contexto

  return (
    <div className={styles.loginPage}>
      <h2>Iniciar Sesión</h2>
      <button onClick={signInWithGoogle} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Iniciar sesión con Google"}
      </button>
    </div>
  );
};
