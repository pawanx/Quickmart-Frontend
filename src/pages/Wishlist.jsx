import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import useWishlistContext from "../contexts/WishListContext";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();
  const [clickedHearts, setClickedHearts] = useState({});

  const handleHeartClick = (id) => {
    removeFromWishlist(id);
    setClickedHearts((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setClickedHearts((prev) => ({ ...prev, [id]: false }));
    }, 300);
  };

  const handleMoveToCart = (product) => {
    removeFromWishlist(product._id);
    addToCart(product);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="mt-5">Your wishlist is empty.</p>
      ) : (
        <div className="row  mt-4">
          {wishlistItems.map((product) => (
            <div className="col-md-3" key={product._id}>
              <div className="card mb-3 shadow-sm">
                <Link
                  to={`/productDetails/${product._id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="position-relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleHeartClick(product._id);
                      }}
                      className="position-absolute top-0 end-0 m-2
                        bg-white border border-dark rounded-circle
                        d-flex justify-content-center align-items-center p-2"
                    >
                      <FaHeart
                        color="red"
                        className={`heart-icon ${
                          clickedHearts[product._id] ? "clicked" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div className="card-body">
                    <p className="card-title fw-bold">{product.title}</p>
                    <p>₹ {product.price}</p>
                  </div>
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() => handleMoveToCart(product)}
                >
                  Move To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
