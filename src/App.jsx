/** @format */

import "bootstrap/dist/css/bootstrap.min.css";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsListing from "./pages/ProductsListing.jsx";
import ProductsDetail from "./pages/ProductsDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Header from "./components/Header";
import { CartProvider } from "./contexts/CartContext.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AddressManagement from "./pages/AddressManagement.jsx";
import OrderCheckout from "./pages/OrderCheckout.jsx";
import { ProductsProvider } from "./contexts/ProductContext.jsx";
import { AddressProvider } from "./contexts/AddressContext.jsx";

function App() {
  return (
    <>
      <div>
        <CartProvider>
          <ProductsProvider>
            <AddressProvider>
              <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route
                    path="/products/category/:categoryName"
                    element={<ProductsListing />}
                  />
                  <Route path="/products" element={<AllProducts />} />
                  <Route
                    path="/products/:productId"
                    element={<ProductsDetail />}
                  />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route
                    path="/addressManagement"
                    element={<AddressManagement />}
                  />
                  <Route path="/checkout" element={<OrderCheckout />} />
                </Routes>
              </Router>
            </AddressProvider>
          </ProductsProvider>
        </CartProvider>
      </div>
    </>
  );
}

export default App;
