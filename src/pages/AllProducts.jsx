/** @format */
import useProductContext from "../contexts/ProductContext";
import useCartContext from "../contexts/CartContext";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { data, addToCart, addToWishlist } = useCartContext();
  const {
    finalProducts,
    selectedCategories,
    setSelectedCategories,
    minRating,
    setMinRating,
    selectedPrice,
    setSelectedPrice,
    searchQuery,
  } = useProductContext();

  console.log(data);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  let headingText = "All Products";
  if (searchQuery) {
    headingText = `Search results for "${searchQuery}"`;
  }

  if (selectedCategories.length === 1) {
    headingText = `${selectedCategories[0]} Products`;
  }

  if (selectedCategories.length > 1) {
    headingText = "Multiple Categories Products";
  }

  return (
    <>
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-md-2">
            <div className=" p-3">
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
              <h6>Category</h6>
              {[
                "men's clothing",
                "women's clothing",
                "electronics",
                "jewelery",
              ].map((cat) => (
                <div className="form-check" key={cat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={selectedCategories?.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <label className="form-check-label ">{cat}</label>
                </div>
              ))}

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
              <h3 className="mb-4 text-capitalize">{headingText}</h3>
              {finalProducts?.length === 0 ? (
                <div className="text-center mt-5">
                  <h4 className="text-danger">No Products Found</h4>
                  <p className="text-secondary">Try changing search keywords</p>
                </div>
              ) : (
                finalProducts?.map((item) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    key={item._id}
                  >
                    <div className="card h-100 shadow-sm">
                      <Link
                        to={`/products/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="card-img-top"
                          style={{ height: "220px", objectFit: "cover" }}
                        />
                      </Link>

                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title">{item.title}</h6>

                        <small className="text-warning d-block mb-1">
                          {"⭐".repeat(Math.round(item.rating?.rate || 0))}
                        </small>

                        <p className="fw-bold">${item.price}</p>

                        <div className="d-flex gap-2 mt-auto">
                          <button
                            className="btn btn-primary flex-fill"
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart
                          </button>

                          <button
                            className="btn btn-outline-danger flex-fill"
                            onClick={() => addToWishlist(item)}
                          >
                            ❤️ Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
