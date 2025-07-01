import { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();
const BASE_URL = "https://quickmart-backend.vercel.app";

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const addAddress = async (address) => {
    try {
      const res = await fetch(`${BASE_URL}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });
      const data = await res.json();
      if (data?.address) {
        setAddresses((prev) => [...prev, data.address]);
      }
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  const updateAddress = async (updatedAddress) => {
    try {
      const res = await fetch(`${BASE_URL}/addresses/${updatedAddress._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAddress),
      });
      const data = await res.json();
      if (data?.address) {
        setAddresses((prev) =>
          prev.map((a) => (a._id === updatedAddress._id ? data.address : a))
        );
      }
    } catch (err) {
      console.error("Error updating address:", err);
    }
  };

  const deleteAddress = async (id) => {
    try {
      await fetch(`${BASE_URL}/addresses/${id}`, {
        method: "DELETE",
      });
      setAddresses((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/addresses`);
      const data = await res.json();
      setAddresses(data.addresses || []);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

const useAddressContext = () => useContext(AddressContext);
export default useAddressContext;
