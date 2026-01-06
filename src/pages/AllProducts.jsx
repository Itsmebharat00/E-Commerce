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
  } = useProductContext();

  console.log(data);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

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
                className="form-range"
                min="0"
                max="5"
                step="1"
                onChange={(e) => setMinRating(Number(e.target.value))}
              />
              <small>⭐ {minRating} & above</small>
              <hr />
              <div>
                <h6>Sort by Price </h6>
                <input
                  type="radio"
                  value="lowToHigh"
                  checked={selectedPrice === "lowToHigh"}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                />{" "}
                Low to High{" "}
                <input
                  type="radio"
                  value="highToLow"
                  checked={selectedPrice === "highToLow"}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                />{" "}
                High to Low
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row">
              {finalProducts?.map((item) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item._id}>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
