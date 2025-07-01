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

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (address) => {
    setFormData(address);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing && formData._id) {
      updateAddress(formData);
    } else {
      addAddress(formData);
    }

    // Reset form
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h2>Address Book</h2>

      {addresses.length === 0 && <p>No addresses added yet.</p>}

      {addresses.map((add) => (
        <div className="border rounded p-3 mb-3" key={add._id}>
          <p>
            <strong>{add.name}</strong>
          </p>
          <p>
            {add.street}, {add.city}, {add.state} - {add.pincode}
          </p>
          <p>Phone: {add.phone}</p>

          <button
            className={`btn ${
              selectedAddressId === add._id
                ? "btn-primary"
                : "btn-outline-primary"
            } me-2`}
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

      <h4 className="mt-4">{isEditing ? "Edit Address" : "Add New Address"}</h4>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          className="form-control mb-2"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="street"
          placeholder="Street"
          className="form-control mb-2"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          className="form-control mb-2"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          placeholder="State"
          className="form-control mb-2"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          className="form-control mb-2"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          className="form-control mb-2"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success">
          {isEditing ? "Update Address" : "Add Address"}
        </button>
      </form>
    </div>
  );
}
