import useCartContext from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart } = useCartContext();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const discount = totalPrice > 500 ? 100 : 0;
  const finalAmount = totalPrice - discount + deliveryCharge;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5">My Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <p className="text-center fs-1">
              Your cart is empty. Go to Home to add items.
            </p>
          ) : (
            <div className="bg-body-tertiary p-4 rounded-3 shadow-sm">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="d-flex flex-column flex-md-row align-items-start gap-4 mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-2 shadow-sm"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h4>{item.title}</h4>
                    <p className="fs-5 fw-semibold">
                      ₹{item.price} × {item.quantity} = ₹
                      {item.price * item.quantity}
                    </p>
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length !== 0 ? (
          <div className="col-md-4">
            <div className="card shadow-sm mt-4" style={{ maxWidth: "400px" }}>
              <div className="card-body">
                <h5 className="card-title">Price Details</h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Price</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Discount</span>
                  <span className="text-success">-₹{discount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Delivery Charge</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total Amount</span>
                  <span>₹{finalAmount}</span>
                </div>
                <Link to="/checkout" className="text-decoration-none">
                  <button className="btn btn-primary w-100 mt-3">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
