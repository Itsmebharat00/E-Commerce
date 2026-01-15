/** @format */

import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../useFetch";
import { toast } from "react-toastify";

const CartContext = createContext();

const useCartContext = () => useContext(CartContext);
export default useCartContext;

const storedData = () => {
  const savedValued = localStorage.getItem("cartItems");
  return savedValued ? JSON.parse(savedValued) : [];
};

export const CartProvider = ({ children }) => {
  const { data } = useFetch(
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
    toast.success("Moved to Wishlist ❤️");
  };

  const moveToCart = (product) => {
    removeFromWishlist(product._id);
    addToCart(product);
    toast.success("Moved to cart 🛒");
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
    toast.error("Removed from wishlist");
  };

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.success("Quantity increased");
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    toast.info("Quantity decreased");
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
    toast.error("Removed from cart");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item._id === product._id);

    if (existing) {
      toast.info("Item already in cart");
      return;
    }
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
    toast.success("Added to cart 🛒");
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
        moveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
