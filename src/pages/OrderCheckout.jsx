/** @format */
import { useState } from "react";
import useCartContext from "../contexts/CartContext";
import useAddressContext from "../contexts/AddressContext";
import { Link } from "react-router-dom";

const OrderCheckout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems, finalAmount } = useCartContext();
  const {
    addresses,
    handleSaveAddress,
    addressForm,
    setAddressForm,
    setShowAddressForm,
    showAddressForm,
    setShowForm,
    showForm,
  } = useAddressContext();

  const handleOrders = async () => {
    if (!selectedAddress) return;

    const orderData = {
      items: cartItems,
      totalAmount: finalAmount,
      address: selectedAddress,
    };

    try {
      const res = await fetch(
        "https://e-commerce-backend-theta-eosin.vercel.app/orders",
        {
          method: "POST",
          body: JSON.stringify(orderData),
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.ok) {
        console.log("Saved order:");
        setOrderPlaced(true);
      } else {
        console.log("Server error:");
      }
    } catch (error) {
      console.log("Order failed", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3> Order Checkout</h3>
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowAddressForm(!showAddressForm)}
        >
          Add New Address
        </button>

        <Link to="/addressManagement" className="nav-link fw-semibold">
          Address Management
        </Link>
      </div>

      <h5 className="mt-3"> Select delivery address:</h5>
      <div className="row">
        {addresses?.map((address) => (
          <div key={address.id} className="col-md-6 mb-3">
            <div
              className={` card position-relative ${
                selectedAddress?.id === address.id ? "border-success" : ""
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div className="card-body">
                <h6 className="card-title">{address.label} Address</h6>
                <p className="mb-1">{address.address}</p>
                {selectedAddress?.id === address.id ? (
                  <span className=" position-absolute top-0 end-0 m-3 badge rounded-pill text-bg-success">
                    {" "}
                    Selected{" "}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedAddress && (
        <div>
          <button
            className="btn btn-outline-primary"
            disabled={orderPlaced}
            onClick={() => handleOrders()}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      )}

      {showForm && (
        <div className="card mt-4" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h5 className="card-title mb-3">Add New Address</h5>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Full Name"
              value={addressForm.name}
              onChange={(e) =>
                setAddressForm({ ...addressForm, name: e.target.value })
              }
            />

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Phone Number"
              value={addressForm.phone}
              onChange={(e) =>
                setAddressForm({ ...addressForm, phone: e.target.value })
              }
            />

            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Full Address"
              value={addressForm.address}
              onChange={(e) =>
                setAddressForm({ ...addressForm, address: e.target.value })
              }
            />

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-primary" onClick={handleSaveAddress}>
                Save Address
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddressForm && (
        <div className="card mt-4" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h5 className="card-title mb-3">Add New Address</h5>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Full Name"
              value={addressForm.name}
              onChange={(e) =>
                setAddressForm({ ...addressForm, name: e.target.value })
              }
            />

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Phone Number"
              value={addressForm.phone}
              onChange={(e) =>
                setAddressForm({ ...addressForm, phone: e.target.value })
              }
            />

            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Full Address"
              value={addressForm.address}
              onChange={(e) =>
                setAddressForm({ ...addressForm, address: e.target.value })
              }
            />

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-primary" onClick={handleSaveAddress}>
                Save Address
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowAddressForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {orderPlaced && (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title"> Order Summary </h5>
            <p className="mb-1">
              {" "}
              <strong> Cart Items: </strong> {cartItems.length}{" "}
            </p>
            <p className="mb-3">
              {" "}
              <strong> Total Amount: </strong> ${finalAmount.toFixed(2)}{" "}
            </p>
          </div>
        </div>
      )}
      {orderPlaced && (
        <div className="p-3 mb-2 bg-success text-white mt-4">
          <h5> Order Placed Successfully! </h5>
        </div>
      )}
    </div>
  );
};

export default OrderCheckout;
