import useWishlistContext from "../contexts/WishListContext";

export default function WishListCounter() {
  const { wishlistItems } = useWishlistContext();
  return <span>{wishlistItems.length !== 0 ? wishlistItems.length : ""}</span>;
}
