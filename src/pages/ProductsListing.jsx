/** @format */
import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import useCartContext from "../contexts/CartContext";

const ProductsListing = () => {
  const { addToCart } = useCartContext();
  const { categoryName } = useParams();
  const { data } = useFetch(
    `https://e-commerce-backend-theta-eosin.vercel.app/products/category/${categoryName}`
  );
  console.log(data);

  const filteredProducts = data?.filter(
    (item) => item.category.name === categoryName
  );
  console.log(filteredProducts);

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-capitalize">{categoryName} Products</h3>

      <div className="row g-3">
        {filteredProducts?.map((product) => (
          <div className="col-6 col-md-3" key={product._id}>
            <Link
              to={`/products/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card shadow-sm p-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              </div>
            </Link>
            <div className="card-body">
              <h6 className="m-0">{product.title}</h6>
              <h6 className="text-muted m-0">${product.price}</h6>
              <button
                className="btn btn-primary px-4 md-3"
                onClick={() => addToCart(product)}
              >
                {" "}
                Add to cart{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsListing;
