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
import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div>
        <CartProvider>
          <ProductsProvider>
            <AddressProvider>
              <Router>
                <div className="d-flex flex-column min-vh-100">
                  <Header />

                  <main className="flex-fill">
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
                  </main>

                  <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="light"
                  />

                  <Footer />
                </div>
              </Router>
            </AddressProvider>
          </ProductsProvider>
        </CartProvider>
      </div>
      <script src="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

export default App;
