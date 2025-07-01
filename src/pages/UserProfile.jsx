import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UserProfile() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = {
    name: "Pawan Mishra",
    email: "pawan@example.com",
    phone: "9876543210",
    address: "123 Main St, Mumbai, Maharashtra - 400001",
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("https://quickmart-backend.vercel.app/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.order || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user._id]);

  return (
    <div className="container">
      <h1>User Profile</h1>
      <div className="border rounded p-3 mb-3">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
      </div>

      <Link to="/addresses" className="btn btn-primary me-3">
        Manage Addresses
      </Link>
      <h3 className="mt-5">Order History</h3>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && orders.length === 0 && <p>No orders found.</p>}

      {!loading &&
        orders.map((order) => (
          <div key={order._id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Order ID: {order._id}{" "}
                <span
                  className={`badge bg-${
                    order.status === "Delivered" ? "success" : "secondary"
                  }`}
                >
                  {order.status}
                </span>
              </h5>
              <p className="text-muted">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <ul className="list-group mb-3">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>
                      {item.title} (x{item.quantity})
                    </span>
                    <span>₹ {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              {/* <h6>Total: ₹ {order.totalAmount}</h6> */}
            </div>
          </div>
        ))}
    </div>
  );
}
