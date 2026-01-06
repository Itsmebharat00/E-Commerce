/** @format */
import { useState } from "react";
import useCartContext from "../contexts/CartContext";

const OrderCheckout = () => {
  const savedAddresses = JSON.parse(localStorage.getItem("addresses"));
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems, finalAmount } = useCartContext();

  const handleOrders = () => {
    if (selectedAddress) {
      setOrderPlaced(true);
    }
  };

  return (
    <div className="container mt-4">
      <h3> Checkout</h3>
      <h5 className="mt-3"> Select delivery address:</h5>
      <div className="row">
        {savedAddresses?.map((address) => (
          <div key={address.id} className="col-md-6 mb-3">
            <div
              className={` card ${
                selectedAddress?.id === address.id ? "border-success" : ""
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div className="card-body">
                <h6 className="card-title">{address.label} Address</h6>
                <p className="mb-1">{address.address}</p>
                {selectedAddress?.id === address.id ? (
                  <span className="badge rounded-pill text-bg-success">
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
