/** @format */
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Home = () => {
  const { data } = useFetch(
    "https://e-commerce-backend-theta-eosin.vercel.app/products"
  );

  console.log(data);

  const categories = data
    ?.map((item) => item.category)
    .filter(
      (cat, index, arr) => index === arr.findIndex((c) => c.name === cat.name)
    );

  console.log(categories);

  return (
    <>
      <div className="container-fluid">
        <div className="w-100" style={{ height: "60vh", overflow: "hidden" }}>
          <Link to="/products" className="text-decoration-none">
            <div className="position-relative h-100">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                alt="Shop All Products"
                className="img-fluid w-100 h-100"
                style={{ objectFit: "cover" }}
              />

              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

              <div className="position-absolute top-50 start-50 translate-middle text-center px-3">
                <h1 className="text-white fw-bold display-5">
                  For All Products
                </h1>
                <p className="text-white fs-5 mt-2">
                  Shop everything in one place
                </p>
                <button className="btn btn-light btn-lg mt-3 px-4">
                  Shop Now
                </button>
              </div>
            </div>
          </Link>
        </div>

        <div className="container py-4">
          <div className="row g-3">
            {categories?.map((category) => (
              <div className="col-6 col-md-3" key={category.name}>
                <Link
                  to={`/products/category/${category.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card shadow-sm text-white d-flex justify-content-center align-items-center"
                    style={{
                      height: "150px",
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <h6
                      className="m-0 text-capitalize bg-dark bg-opacity-50 px-2 py-1 rounded"
                      style={{ backdropFilter: "blur(2px)" }}
                    >
                      {category.name}
                    </h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
