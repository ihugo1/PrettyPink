import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { App } from "./App";

// Importaciones de React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Importar las Devtools

// Crear una instancia de QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Envolver la aplicación con QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Añadir las Devtools (opcional, solo para desarrollo) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);