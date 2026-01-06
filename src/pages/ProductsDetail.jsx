/** @format */
import { useState } from "react";
import useCartContext from "../contexts/CartContext";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";

const ProductsDetail = () => {
  const { addToCart } = useCartContext();
  const { productId } = useParams();
  const { data } = useFetch(
    `https://e-commerce-backend-theta-eosin.vercel.app/products/${productId}`
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const clothSize = ["S", "M", "L", "XL", "XXL"];

  console.log(data);

  return (
    <>
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="border p-3 text-center">
              <img
                src={data?.products.image}
                alt={data?.products.title}
                className="img-fluid mb-3"
                style={{ maxHeight: "420px", objectFit: "contain" }}
              />

              <button className="btn btn-primary w-100 mb-2">Buy Now</button>
              <button
                className="btn btn-secondary w-100"
                onClick={() =>
                  addToCart({
                    ...data?.products,
                    quantity,
                    size: selectedSize,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="col-md-8">
            <h4>{data?.products.title}</h4>

            <p className="text-warning mb-1">⭐⭐⭐⭐</p>

            <h3 className="fw-bold">
              ${data?.products.price}
              <span className="text-muted fs-6 text-decoration-line-through ms-2">
                ${data?.products.price + 99}
              </span>
            </h3>

            <p className="text-success">50% off</p>

            <div className="d-flex align-items-center mb-3">
              <strong className="me-3">Quantity:</strong>
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <span className="mx-3"> {quantity} </span>
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            {(data?.products.category.name == "men's clothing" ||
              data?.products.category.name == "women's clothing") && (
              <div className="mb-4">
                <strong className="d-block mb-2">Size:</strong>
                <div className="d-flex gap-2">
                  {clothSize.map((item) => (
                    <button
                      key={item}
                      className={`btn btn-sm ${
                        selectedSize === item
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setSelectedSize(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="row text-center mb-4">
              <div className="col">
                🚚
                <br />
                Free Delivery
              </div>
              <div className="col">
                💳
                <br />
                Pay on Delivery
              </div>
              <div className="col">
                🔒
                <br />
                Secure Payment
              </div>
            </div>

            <div>
              <h6>Description</h6>
              <p className="text-muted">{data?.products.description}</p>
            </div>
          </div>
        </div>

        <hr className="my-5" />
        <h5 className="mb-4">More items you may like</h5>

        <div className="row g-3">{}</div>
      </div>
    </>
  );
};

export default ProductsDetail;
