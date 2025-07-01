import { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const addAddress = async (address) => {
    const res = await fetch("http://localhost:3000/addresses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(address),
    });
    const data = await res.json();
    setAddresses((prev) => [...prev, data.address]);
  };

  const updateAddress = async (updatedAddress) => {
    const res = await fetch(
      `http://localhost:3000/addresses/${updatedAddress._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAddress),
      }
    );
    const data = await res.json();
    setAddresses((prev) =>
      prev.map((a) => (a._id === updatedAddress._id ? data.address : a))
    );
  };

  const deleteAddress = async (id) => {
    await fetch(`https://quickmart-backend.vercel.app/addresses/${id}`, {
      method: "DELETE",
    });
    setAddresses((prev) => prev.filter((a) => a._id !== id));
  };

  // On context load, fetch addresses:
  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await fetch("https://quickmart-backend.vercel.app/addresses");
      const data = await res.json();
      setAddresses(data.addresses);
    };
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
