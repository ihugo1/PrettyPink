// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // <-- Asegúrate de tener estas importaciones

const queryClient = new QueryClient(); // <-- Define tu QueryClient aquí

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
