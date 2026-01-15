/** @format */
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-white border-top mt-auto ">
      <div className="container py-3">
        <div className="row align-items-center small">
          <div className="col-md-4 text-secondary">
            <strong className="text-dark">Style Kart</strong>
            <br />
            Your one-stop shop for fashion, electronics, and more.
          </div>

          <div className="col-md-4 text-center">
            <Link className="text-dark text-decoration-none mx-2" to="/">
              Home
            </Link>
            <Link
              className="text-dark text-decoration-none mx-2"
              to="/products"
            >
              Products
            </Link>
            <Link
              className="text-dark text-decoration-none mx-2"
              to="/wishlist"
            >
              Wishlist
            </Link>
            <Link className="text-dark text-decoration-none mx-2" to="/cart">
              Cart
            </Link>
          </div>

          <div className="col-md-4 text-end text-secondary">
            📧 support@stylekart.com
            <br />
            📍 India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
