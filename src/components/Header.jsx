/** @format */

import { Link } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import useProductContext from "../contexts/ProductContext";

const Header = () => {
  const { cartItems } = useCartContext();
  const { searchInput, setSearchInput, applySearch } = useProductContext();

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    applySearch(); // apply search only when button is clicked
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          A to Z Kart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <form
            className="d-flex mx-auto"
            style={{ width: "45%" }}
            onSubmit={handleSearchSubmit}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-outline-success ms-2" type="submit">
              Search
            </button>
          </form>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                ❤️ Wishlist
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                🛒 Cart ({cartCount})
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/userProfile">
                👤
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
