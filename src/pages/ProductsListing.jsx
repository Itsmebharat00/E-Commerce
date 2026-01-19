/** @format */
import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import useCartContext from "../contexts/CartContext";
import useProductContext from "../contexts/ProductContext";
import { useEffect } from "react";

const ProductsListing = () => {
  const { addToCart, addToWishlist } = useCartContext();
  const {
    selectedCategories,
    setSelectedCategories,
    minRating,
    setMinRating,
    selectedPrice,
    setSelectedPrice,
    finalProducts,
  } = useProductContext();

  const { categoryName } = useParams();

  const { data } = useFetch(
    "https://e-commerce-backend-theta-eosin.vercel.app/products",
  );

  useEffect(() => {
    if (categoryName && !selectedCategories.includes(categoryName)) {
      setSelectedCategories([categoryName]);
    }
  }, [categoryName]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  // const filteredProducts = data
  //   ?.filter((item) => {
  //     const categoryMatch =
  //       selectedCategories.length === 0 ||
  //       selectedCategories.includes(item.category.name);

  //     const ratingMatch = item.rating.rate >= minRating;
  //     const searchMatch =
  //       searchQuery === "" ||
  //       item.title?.toLowerCase().includes(searchQuery?.toLowerCase());

  //     return categoryMatch && ratingMatch && searchMatch;
  //   })
  //   .sort((a, b) => {
  //     if (selectedPrice === "lowToHigh") return a.price - b.price;
  //     if (selectedPrice === "highToLow") return b.price - a.price;
  //     return 0;
  //   });

  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  let headingText = "All Products";

  if (selectedCategories.length === 1) {
    headingText = `${selectedCategories[0]} Products`;
  }

  if (selectedCategories.length > 1) {
    headingText = "Multiple Categories Products";
  }

  return (
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-md-2">
          <div className="p-3">
            <div className="d-flex justify-content-between mb-3">
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
            {categories.map((cat) => (
              <div className="form-check" key={cat}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                <label className="form-check-label">{cat}</label>
              </div>
            ))}

            <hr />

            <h6>Rating</h6>
            <input
              type="range"
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
                type="radio"
                className="form-check-input"
                checked={selectedPrice === "lowToHigh"}
                onChange={() => setSelectedPrice("lowToHigh")}
              />
              <label className="form-check-label">Low to High</label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={selectedPrice === "highToLow"}
                onChange={() => setSelectedPrice("highToLow")}
              />
              <label className="form-check-label">High to Low</label>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="row">
            <h3 className="mb-4 text-capitalize">{headingText}</h3>
            {finalProducts?.map((product) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                key={product._id}
              >
                <div className="card h-100 shadow-sm">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  </Link>

                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{product.title}</h6>

                    <small className="text-warning d-block mb-1">
                      {"⭐".repeat(Math.round(product.rating?.rate || 0))}
                    </small>
                    <p className="fw-bold">${product.price}</p>

                    <div className="mt-auto d-flex gap-2">
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

            {finalProducts?.length === 0 && (
              <h5 className="text-danger mt-5 text-center">
                No products found
              </h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
