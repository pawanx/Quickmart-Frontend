import useAddressContext from "../contexts/AddressContext";
import useCartContext from "../contexts/CartContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const { addresses, selectedAddressId, setSelectedAddressId } =
    useAddressContext();

  const { cartItems } = useCartContext();

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const discount = totalPrice > 500 ? 100 : 0;
  const finalAmount = totalPrice - discount + deliveryCharge;

  useEffect(() => {
    if (addresses.length && !selectedAddressId) {
      setSelectedAddressId(addresses[0]._id);
    }
  }, [addresses, selectedAddressId, setSelectedAddressId]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress || cartItems.length === 0) return;

    const res = await fetch("https://quickmart-backend.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems, address: selectedAddress }),
    });
    const data = await res.json();

    if (data.order?._id) {
      navigate(`/order/${data.order._id}`);
    } else {
      alert("Something went wrong while placing your order. Please try again.");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Checkout</h2>
        <div className="row">
          <div className="col-md-6">
            <h4>Order Summary</h4>
            <ul className="list-group mb-4">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <div>
                    {item.title} × {item.quantity}
                  </div>
                  <div>₹{item.price * item.quantity}</div>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <strong>₹{finalAmount}</strong>
              </li>
            </ul>
          </div>

          <div className="col-md-6">
            <h4>Select Delivery Address</h4>
            {addresses.map((add) => (
              <div
                key={add._id}
                className={`border p-3 rounded mb-3 ${
                  selectedAddressId === add._id ? "border-primary" : ""
                }`}
              >
                <p>
                  <strong>{add.name}</strong>
                </p>
                <p>
                  {add.street}, {add.city}, {add.state} - {add.pincode}
                </p>
                <p>Phone: {add.phone}</p>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setSelectedAddressId(add._id)}
                >
                  {selectedAddressId === add._id ? "Selected" : "Select"}
                </button>
              </div>
            ))}
            <Link to="/addresses">
              <button className="btn btn-link p-0 mt-1">
                Manage Addresses
              </button>
            </Link>
            <button
              className="btn btn-success w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
