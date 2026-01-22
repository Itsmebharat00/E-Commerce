/** @format */
import useAddressContext from "../contexts/AddressContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const UserProfile = () => {
  const {
    addresses,
    handleSaveAddress,
    addressForm,
    setAddressForm,
    setShowAddressForm,
    showOrders,
    setShowOrders,
    showAddressForm,
  } = useAddressContext();
  const [orders, setOrders] = useState([]);

  const user = {
    name: "Bharat Singh",
    email: "bharat@gmail.com",
    phone: "9876543210",
  };

  useEffect(() => {
    fetch("https://e-commerce-backend-theta-eosin.vercel.app/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-4 gy-2">
        <div className="col-12 col-md-4 text-center text-md-start">
          <h3 className="mb-0">User Profile</h3>
        </div>

        <div className="col-12 col-md-4 text-center">
          <button
            className="btn btn-outline-primary w-md-auto"
            onClick={() => setShowAddressForm(!showAddressForm)}
          >
            Add New Address
          </button>
        </div>

        <div className="col-12 col-md-4 text-center text-md-end">
          <Link
            to="/addressManagement"
            className="fw-semibold text-decoration-none"
          >
            Address Management
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">User Details</h5>
          <p className="mb-1">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-1">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-1">
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>
      </div>

      <div className="row mb-4">
        {addresses.map((item) => (
          <div key={item.id} className="col-md-6 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-title">{item.label} Address</h6>
                <p className="mb-0">{item.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

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

      <button
        className="btn btn-link mb-3"
        onClick={() => setShowOrders(!showOrders)}
      >
        View Order History
      </button>

      {showOrders && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Order History</h5>

            {orders
              .slice()
              .reverse()
              .map((order) => (
                <div key={order._id} className="card mb-3">
                  <div className="card-body">
                    <p>
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <div>
                      <strong>Items Ordered:</strong>
                      <ul>
                        {order.items?.map((item) => (
                          <li key={item._id}>
                            {item.title} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p>
                      <strong>Total:</strong> ${order.totalAmount}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
