/** @format */

import { Link } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import useProductContext from "../contexts/ProductContext";

const Header = () => {
  const { cartItems, wishlist } = useCartContext();
  const { searchInput, setSearchInput, applySearch, searchQuery, resetSearch } =
    useProductContext();

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const wishListCount = wishlist?.length;
  // console.log(wishListCount);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applySearch();
    setSearchInput("");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <h1>Style Kart </h1>
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
            className="d-flex mx-auto gap-2"
            style={{ width: "45%" }}
            onSubmit={handleSearchSubmit}
          >
            <div className="d-flex w-100 position-relative">
              <input
                className="form-control"
                type="search"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm ms-2 px-3 py-1"
                  onClick={resetSearch}
                >
                  reset
                </button>
              )}
            </div>

            <Link
              to="/products"
              className="btn btn-outline-success ms-2"
              onClick={() => {
                applySearch();
                setSearchInput("");
              }}
            >
              Search
            </Link>
          </form>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                ❤️ Wishlist ({wishListCount})
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
