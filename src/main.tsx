import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

import { WishlistProvider } from "./hooks/WishListContext/WishlistProvider";
import { CartProvider } from "./hooks/CartProvider";
import { AuthProvider } from "./hooks/AuthProvider";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
