/** @format */
import useCartContext from "../contexts/CartContext";
import { Link } from "react-router-dom";
const Cart = () => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    totalPrice,
    deliveryCharge,
    discount,
    finalAmount,
    moveToWishlist,
  } = useCartContext();

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">
        MY CART ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
      </h3>

      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="d-flex p-3 mb-3 shadow-sm rounded bg-white"
              style={{ gap: "20px" }}
            >
              <img
                src={item.image}
                width="120"
                height="150"
                style={{ objectFit: "cover", borderRadius: "6px" }}
                alt=""
              />

              <div style={{ flex: 1 }}>
                <h5>{item.title}</h5>

                <h6 className="mt-2">${item.price * item.quantity} </h6>
                {(item.category.name === "men's clothing" ||
                  item.category.name === "women's clothing") && (
                  <h6>Size: {item.size}</h6>
                )}

                <div className="d-flex align-items-center">
                  <span className="me-2 fw-bold">Quantity:</span>
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => decreaseQty(item._id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => increaseQty(item._id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-secondary w-50 mt-3"
                  onClick={() => removeItem(item._id)}
                >
                  Remove From Cart
                </button>

                <button
                  className="btn btn-light border w-50 mt-2"
                  onClick={() => moveToWishlist(item)}
                >
                  Move to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <h5 className="p-3 shadow-sm bg-white rounded">PRICE DETAILS</h5>

          <p className="d-flex justify-content-between">
            <span>Price ({cartItems.length} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </p>

          <p className="d-flex justify-content-between">
            <span>Discount (10%)</span>
            <span className="text-success">-${discount.toFixed(2)}</span>
          </p>

          <p className="d-flex justify-content-between">
            <span>Delivery Charges</span>
            <span>{deliveryCharge === 0 ? "Free" : `$${deliveryCharge}`}</span>
          </p>

          <hr />

          <h6 className="d-flex justify-content-between fw-bold">
            <span>Total Amount</span>
            <span>${finalAmount.toFixed(2)}</span>
          </h6>

          <p className="text-success mt-2">
            You saved ${discount.toFixed(2)} on this order!
          </p>

          <Link className="btn btn-primary w-100 mt-3" to="/checkout">
            PLACE ORDER
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
