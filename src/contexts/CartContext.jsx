/** @format */

import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../useFetch";

const CartContext = createContext();

const useCartContext = () => useContext(CartContext);
export default useCartContext;

const storedData = () => {
  const savedValued = localStorage.getItem("cartItems");
  return savedValued ? JSON.parse(savedValued) : [];
};

export const CartProvider = ({ children }) => {
  const { data, loading, error } = useFetch(
    "https://e-commerce-backend-theta-eosin.vercel.app/products"
  );

  const [cartItems, setCartItems] = useState(storedData);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  const moveToWishlist = (item) => {
    addToWishlist(item);

    removeItem(item._id);
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    const exists = cartItems.find(
      (item) => item._id === product._id && item.size === product.size
    );

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const deliveryCharge = totalPrice > 199 ? 0 : 49;
  const discount = totalPrice * 0.1;
  const finalAmount = totalPrice - discount + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        data,
        cartItems,
        addToCart,
        setCartItems,
        increaseQty,
        decreaseQty,
        removeItem,
        totalPrice,
        finalAmount,
        deliveryCharge,
        discount,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        moveToWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
