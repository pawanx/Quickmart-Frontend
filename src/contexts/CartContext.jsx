import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, quantity = 1) {
    setCartItems((prev) => {
      const itemExists = prev.find((item) => item._id === product._id);
      if (itemExists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, quantity }];
    });
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  }

  function moveToWishList(id) {
    removeFromCart(id);
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, moveToWishList }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => useContext(CartContext);
export default useCartContext;
