import { createContext, useContext, useState, useEffect } from "react";
import type { Session } from "../types/auth";
import { getUser, authSignOut, authSignInWithGoogle } from "../api/authService";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      setIsLoading(true);

      const params = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        try {
          const userResponse = await getUser(accessToken);
          const user = userResponse.data;

          const newSession: Session = {
            user,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: 3600,
            token_type: "Bearer",
            expires_at: Math.floor(Date.now() / 1000) + 3600,
          };

          setSession(newSession);
          localStorage.setItem(
            "supabase.auth.session",
            JSON.stringify(newSession)
          );
          navigate("/"); // Redirect to home page after successful login
        } catch (error) {
          console.error(
            "Error al obtener usuario después de redirección:",
            error
          );
          setSession(null);
          localStorage.removeItem("supabase.auth.session");
        }
      } else {
        const storedSession = localStorage.getItem("supabase.auth.session");
        if (storedSession) {
          try {
            const parsedSession: Session = JSON.parse(storedSession);
            if (parsedSession.expires_at > Math.floor(Date.now() / 1000)) {
              setSession(parsedSession);
            } else {
              localStorage.removeItem("supabase.auth.session");
            }
          } catch (error) {
            console.error("Error al parsear sesión de localStorage:", error);
            localStorage.removeItem("supabase.auth.session");
          }
        }
      }
      setIsLoading(false);
    };
    handleAuth();
  }, []);

  const signInWithGoogle = () => {
    authSignInWithGoogle();
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      if (session?.access_token) {
        await authSignOut(session.access_token);
      } else {
        console.warn(
          "No access token found for signOut, clearing local session only."
        );
      }
      setSession(null);
      localStorage.removeItem("supabase.auth.session");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      console.error("Error during server-side sign out:", error);
    } finally {
      setSession(null);
      localStorage.removeItem("supabase.auth.session");
      setIsLoading(false);
      navigate("/");
    }
  };

  const value = {
    session,
    isLoading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
