/** @format */

import { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();

const useAddressContext = () => useContext(AddressContext);
export default useAddressContext;

export const AddressProvider = ({ children }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [addressEdit, setAddressEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [addressForm, setAddressForm] = useState({
    label: "",
    name: "",
    phone: "",
    address: "",
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("addresses");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            label: "Home",
            name: "Bharat Singh",
            phone: "9876543210",
            address: "123, MG Road, Andheri East, Mumbai – 400069",
          },
          {
            id: 2,
            label: "Office",
            name: "Bharat Singh",
            phone: "9123456789",
            address: "456, Business Park, Lower Parel, Mumbai – 400013",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const handleEdit = (item) => {
    setShowForm(true);
    setAddressEdit(item.id);
    setAddressForm({
      label: item.label,
      name: item.name,
      phone: item.phone,
      address: item.address,
    });
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((item) => item.id !== id));
  };

  const handleSaveAddress = () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.address) {
      alert("Please fill all fields");
      return;
    }

    if (addressEdit) {
      setAddresses(
        addresses.map((item) =>
          item.id === addressEdit ? { ...item, ...addressForm } : item
        )
      );
    } else {
      const newAddress = {
        id: Date.now(),
        ...addressForm,
      };

      setAddresses((prev) => [...prev, newAddress]);
    }

    setShowForm(false);
    setShowAddressForm(true);
    setAddressEdit(null);
    setAddressForm({
      label: "",
      name: "",
      phone: "",
      address: "",
    });
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        handleEdit,
        handleDelete,
        handleSaveAddress,
        showOrders,
        setShowOrders,
        addressForm,
        showAddressForm,
        showForm,
        setShowAddressForm,
        setShowForm,
        setAddressForm,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
