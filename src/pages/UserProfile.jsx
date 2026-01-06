/** @format */
import useAddressContext from "../contexts/AddressContext";
import { Link } from "react-router-dom";

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

  const user = {
    name: "Bharat Singh",
    email: "bharat@gmail.com",
    phone: "9876543210",
  };

  const orders = [
    {
      id: "ORD12345",
      date: "12 Jan 2025",
      total: "$199",
      status: "Delivered",
    },
    {
      id: "ORD12346",
      date: "20 Jan 2025",
      total: "$299",
      status: "Delivered",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>User Profile</h3>
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

            {orders.map((order) => (
              <div key={order.id} className="border rounded p-3 mb-3">
                <p className="mb-1">
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p className="mb-1">
                  <strong>Date:</strong> {order.date}
                </p>
                <p className="mb-1">
                  <strong>Total:</strong> {order.total}
                </p>
                <p className="mb-0">
                  <strong>Status:</strong> {order.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
