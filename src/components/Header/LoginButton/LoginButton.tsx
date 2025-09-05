import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../context/AuthContext";
import styles from "./LoginButton.module.css";

export const LoginButton = () => {
  const { session, signInWithGoogle, signOut } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginModalOpen = () => setLoginModalOpen(!loginModalOpen);
  const handleCloseModal = () => setLoginModalOpen(false);

  return (
    <div className={styles.loginContainer}>
      <button className={styles.loginButton} onClick={handleLoginModalOpen}>
        {session?.user ? (
          session.user.user_metadata?.avatar_url ||
          session.user.user_metadata?.picture ? (
            <img
              src={
                session.user.user_metadata.avatar_url ||
                session.user.user_metadata.picture
              }
              className={styles.avatarImage}
              alt="User Avatar"
            />
          ) : session.user.user_metadata?.name ? (
            <div className={styles.avatarInitial}>
              {session.user.user_metadata.name[0].toUpperCase()}
            </div>
          ) : (
            <FaUser />
          )
        ) : (
          <FaUser />
        )}
      </button>

      <div
        className={`${styles.loginModal} ${
          loginModalOpen ? styles.loginModalOpen : ""
        }`}
      >
        <div className={styles.userInfoContainer}>
          {session?.user ? (
            <>
              <p>Logged in as:</p>
              <p>
                <strong>{session.user.user_metadata?.name}</strong>
              </p>
            </>
          ) : (
            <p>You are not logged in.</p>
          )}
        </div>
        <div className={styles.modalButtons}>
          <button onClick={session?.user ? signOut : signInWithGoogle}>
            {session?.user ? (
              <>Logout</>
            ) : (
              <>
                <FcGoogle />
                Sign in
              </>
            )}
          </button>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    </div>
  );
};
