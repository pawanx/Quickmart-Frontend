import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderPlaced() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(
        `https://quickmart-backend.vercel.app/orders/${id}`
      );
      const data = await res.json();
      setOrder(data.order);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-success"> Order Placed Successfully!</h2>
      <h5 className="mt-3">Order ID: {order._id}</h5>
      <p className="text-muted">
        Placed on: {new Date(order.createdAt).toLocaleString()}
      </p>

      <h4 className="mt-4">Shipping Address</h4>
      <p>
        <strong>{order.address.name}</strong>
        <br />
        {order.address.street}, {order.address.city}, {order.address.state} -{" "}
        {order.address.pincode}
        <br />
        Phone: {order.address.phone}
      </p>

      <h4 className="mt-4">Ordered Items</h4>
      {order.items.map((item, i) => (
        <div key={i} className="border rounded p-2 mb-2">
          <strong>{item.title}</strong> - ₹{item.price}
        </div>
      ))}
    </div>
  );
}
