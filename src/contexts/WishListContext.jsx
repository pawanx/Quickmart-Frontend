import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  function addToWishlist(product) {
    setWishlistItems((prev) => {
      const alreadyInWishlist = prev.find((item) => item._id === product._id);
      if (alreadyInWishlist) return prev;
      return [...prev, product];
    });
  }

  function removeFromWishlist(id) {
    setWishlistItems((prev) => prev.filter((item) => item._id !== id));
  }

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

const useWishlistContext = () => useContext(WishlistContext);
export default useWishlistContext;
