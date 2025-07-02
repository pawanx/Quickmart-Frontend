import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import useWishlistContext from "../contexts/WishListContext";
import { useState } from "react";
import useFetch from "../useFetch";

export default function AllProducts() {
  const { data, loading, error } = useFetch(
    "https://quickmart-backend.vercel.app/products"
  );

  const { category } = useParams();
  const { addToCart } = useCartContext();
  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useWishlistContext();
  const isInWishlist = (id) => wishlistItems.some((item) => item._id === id);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinrating] = useState(0);
  const [sortOrder, setSortOrder] = useState("");

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.products) return <p>No products found.</p>;

  let categoryProducts = data.products
    .filter((prod) => prod.category === category)
    .filter((prod) => prod.price <= maxPrice)
    .filter((prod) => prod.rating >= minRating);
  if (sortOrder === "asc") {
    categoryProducts = categoryProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    categoryProducts = categoryProducts.sort((a, b) => b.price - a.price);
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-2 ps-4 mt-4">
          <div className="ms-3">
            <div className="d-flex justify-content-between mb-5">
              <p>
                <strong>Filters</strong>
              </p>
              <p
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setMaxPrice(500);
                  setMinrating(0);
                  setSortOrder("");
                }}
              >
                Clear
              </p>
            </div>
            <div>
              <label htmlFor="priceRange">
                <strong>Price</strong>
              </label>
              <br />
              <br />
              <div className="d-flex justify-content-between mb-5">
                <span>0</span>
                <input
                  type="range"
                  className="form-range mx-2"
                  min="0"
                  max="500"
                  id="priceRange"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <span>{maxPrice}</span>
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="rating">
                <strong>Rating</strong>
              </label>
              <br />
              <br />
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  checked={minRating === 4}
                  onChange={(e) => setMinrating(Number(e.target.value))}
                  className="me-2"
                />
                4 Stars & above
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  onChange={(e) => setMinrating(Number(e.target.value))}
                  className="me-2"
                />
                3 Stars & above
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  onChange={(e) => setMinrating(Number(e.target.value))}
                  className="me-2"
                />
                2 Stars & above
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  onChange={(e) => setMinrating(Number(e.target.value))}
                  className="me-2"
                />
                1 Stars & above
              </label>
            </div>
            <div className="mb-5">
              <label htmlFor="sorting">
                <strong>Sort by</strong>
              </label>
              <br />
              <br />
              <label>
                <input
                  type="radio"
                  name="sorting"
                  value="asc"
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="me-2"
                />
                Price - Low to High
              </label>
              <label>
                <input
                  type="radio"
                  name="sorting"
                  value="desc"
                  checked={sortOrder === "desc"}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="me-2"
                />
                Price - High to Low
              </label>
            </div>
          </div>
        </div>

        <div className="col-md-10 bg-light ps-4 mt-4">
          <h5>Showing All Products ({categoryProducts.length})</h5>

          <div className="row mt-3 mx-3">
            {categoryProducts.map((product) => (
              <div className="col-md-3" key={product._id}>
                <div className="card mb-3 h-25 shadow">
                  <button
                    onClick={() =>
                      isInWishlist(product._id)
                        ? removeFromWishlist(product._id)
                        : addToWishlist(product)
                    }
                    className="position-absolute top-0 end-0 m-2
                 bg-white border border-dark rounded-circle
                 d-flex justify-content-center align-items-center
                 p-2 z-3"
                    style={{ zIndex: 1 }} // ensure it's clickable
                  >
                    <FaHeart
                      color={isInWishlist(product._id) ? "red" : "black"}
                    />
                  </button>
                  <Link
                    to={`/productDetails/${product._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="position-relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="card-img-top "
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p>₹ {product.price}</p>
                      <p>Rating : {product.rating}</p>
                    </div>
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
