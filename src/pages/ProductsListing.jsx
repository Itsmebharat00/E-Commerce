/** @format */
import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import useCartContext from "../contexts/CartContext";
import useProductContext from "../contexts/ProductContext";

const ProductsListing = () => {
  const { addToCart, addToWishlist } = useCartContext();
  const {
    setSelectedCategories,
    minRating,
    setMinRating,
    selectedPrice,
    setSelectedPrice,
  } = useProductContext();
  const { categoryName } = useParams();
  const { data } = useFetch(
    `https://e-commerce-backend-theta-eosin.vercel.app/products/category/${categoryName}`
  );
  // console.log(data);

  const filteredProducts = data
    ?.filter((item) => item.rating?.rate >= minRating)
    .sort((a, b) => {
      if (selectedPrice === "lowToHigh") return a.price - b.price;
      if (selectedPrice === "highToLow") return b.price - a.price;
      return 0;
    });

  console.log(filteredProducts);

  return (
    <div className="container-fluid my-4 ">
      <div className="row">
        <div className="col-md-2">
          <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Filters</h5>
              <button
                className="btn btn-sm btn-link"
                onClick={() => {
                  setSelectedCategories([]);
                  setMinRating(0);
                  setSelectedPrice("");
                }}
              >
                Clear
              </button>
            </div>

            <hr />

            <h6>Rating</h6>
            <input
              type="range"
              className=""
              min="0"
              max="5"
              step="1"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            />
            <small>⭐ {minRating} & above</small>

            <hr />

            <h6>Sort by Price</h6>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="lowToHigh"
                checked={selectedPrice === "lowToHigh"}
                onChange={(e) => setSelectedPrice(e.target.value)}
              />
              <label className="form-check-label">Low to High</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="highToLow"
                checked={selectedPrice === "highToLow"}
                onChange={(e) => setSelectedPrice(e.target.value)}
              />
              <label className="form-check-label">High to Low</label>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="row">
            <h3 className="mb-4 text-capitalize">{categoryName} Products</h3>
            {filteredProducts?.map((product) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                key={product._id}
              >
                <div className="card h-100 shadow-sm">
                  <Link
                    to={`/products/${product._id}`}
                    className="text-decoration-none"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  </Link>

                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{product.title}</h6>
                    <p className="fw-bold mb-2">${product.price}</p>

                    <div className="d-flex gap-2 mt-auto">
                      <button
                        className="btn btn-primary flex-fill"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>

                      <button
                        className="btn btn-outline-danger flex-fill"
                        onClick={() => addToWishlist(product)}
                      >
                        ❤️ Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
