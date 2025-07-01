import { useState, useEffect } from "react";
import useCartContext from "../contexts/CartContext";

import { useParams, useNavigate } from "react-router-dom";
export default function ProductDetails() {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://quickmart-backend.vercel.app/products/${id}`
        );
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const increase = () => setQuantity((quant) => quant + 1);
  const decrease = () => setQuantity((quant) => Math.max(1, quant - 1));

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (!product) return <p className="text-danger">Product not found.</p>;
  return (
    <>
      <div className="container mt-3 bg-light">
        <h4>Product Details</h4>
        <div className="d-flex justify-content-between gap-5">
          <div className="d-flex flex-column align-items-center gap-3">
            <img
              src={product.image}
              alt={product.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                addToCart(product, quantity);
                navigate("/checkout"); // or wherever your checkout route is
              }}
            >
              Buy Now
            </button>
            <button
              className="btn btn-success w-100"
              onClick={() => addToCart(product, quantity)}
            >
              Add To Cart
            </button>
          </div>
          <div className="flex-grow-1">
            <h5>{product.title}</h5>
            <p className="text-warning mb-3">
              {"★".repeat(Math.floor(4))}
              {4 % 1 >= 0.5 && "½"}
              <span className="text-muted ms-1">{product.rating}</span>
            </p>
            <h4>₹ {product.price}</h4>
            <div className="d-flex align-items-center mt-3 gap-2">
              <span>
                <strong>Quantity:</strong>
              </span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={decrease}
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="form-control form-control-sm text-center"
                style={{ width: "50px" }}
              />
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={increase}
              >
                +
              </button>
            </div>
            <hr />
            <h5>Description:</h5>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
