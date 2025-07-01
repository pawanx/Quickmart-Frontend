import { useState } from "react";
import useAddressContext from "../contexts/AddressContext";

export default function AddressBook() {
  const {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    addAddress,
    updateAddress,
    deleteAddress,
  } = useAddressContext();

  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (add) => {
    setIsEditing(true);
    setFormData(add);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateAddress(formData);
    } else {
      addAddress(formData);
    }
    setFormData({});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container mt-3">
        <h2>Address Book</h2>
        {addresses.map((add) => (
          <div className="border rounded p-3 mb-3 mt-3 " key={add._id}>
            <p>
              <strong>{add.name}</strong>
            </p>
            <p>
              {add.street}, {add.city}, {add.state} - {add.pincode}
            </p>
            <p>Phone: {add.phone}</p>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => setSelectedAddressId(add._id)}
            >
              {selectedAddressId === add._id ? "Selected" : "Select"}
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleEdit(add)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteAddress(add._id)}
            >
              Delete
            </button>
          </div>
        ))}

        <h4>{isEditing ? "Edit Address" : "Add New Address"}</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-2"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="form-control mb-2"
            value={formData.street || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="form-control mb-2"
            value={formData.city || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="form-control mb-2"
            value={formData.state || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            className="form-control mb-2"
            value={formData.pincode || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="form-control mb-2"
            value={formData.phone || ""}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-success">
            {isEditing ? "Update Address" : "Add Address"}
          </button>
        </form>
      </div>
    </>
  );
}
