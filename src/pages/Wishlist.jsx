/** @format */
import useCartContext from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCartContext();

  if (wishlist.length === 0) {
    return (
      <div className="container mt-4">
        <h4>Your wishlist is empty ❤️</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Wishlist</h3>

      <div className="row">
        {wishlist?.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card h-100 shadow-sm">
              <Link to={`/products/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </Link>

              <div className="card-body d-flex flex-column">
                <h6>{item.title}</h6>
                <p className="fw-bold">${item.price}</p>

                <button
                  className="btn btn-primary mb-2"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
