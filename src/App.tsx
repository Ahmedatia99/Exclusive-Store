import React from "react";
import { Route, Routes } from "react-router-dom";
import Main_Layout from "./Layout/Main_Layout";
import NotFound404Page from "./Pages/ERROR-Page";
import Contact from "./Pages/Contact-Page";
import CartPage from "./Pages/Cart-Page";
import CheckoutPage from "./Pages/Checkout-Page";
import SignUp from "./Pages/Signup-Page";
import Login from "./Pages/Login-Page";
import AccountPage from "./Pages/Account-Page";
import About from "./Pages/About-Page";
const FavouritePage = React.lazy(() => import("./Pages/Favourite-Page"));
const ProductsPage = React.lazy(() => import("./Pages/Product-Page"));
const CategoryPage = React.lazy(() => import("./Pages/Category-Page"));

import { ScrollToTop } from "./components/common/ScrollTop";
import AllProducts_Page from "./Pages/AllProducts_Page";
const HomePage = React.lazy(() => import("./Pages/Home-Page"));
import { AuthProvider } from "./hooks/AuthProvider";

function App() {

  return (
    <>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main_Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/product/:id" element={<ProductsPage />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="*" element={<NotFound404Page />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/Cart" element={<CartPage />} />
            <Route path="/Checkout" element={<CheckoutPage />} />
            <Route path="/Favourites" element={<FavouritePage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            {/* if  category navigate to AllProducts_Page  */}
            <Route path="/category" element={<AllProducts_Page />} />
            <Route path="/AllProducts" element={<AllProducts_Page />} />
            <Route
              path="/AllProducts/:category"
              element={<AllProducts_Page />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
