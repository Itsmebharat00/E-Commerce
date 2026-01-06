/** @format */
import { createContext, useContext, useState } from "react";
import useCartContext from "../contexts/CartContext";

const ProductContext = createContext();
const useProductContext = () => useContext(ProductContext);
export default useProductContext;

export const ProductsProvider = ({ children }) => {
  const { data } = useCartContext();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const applySearch = () => {
    setSearchQuery(searchInput);
  };

  const priceSorting = (products) => {
    if (!selectedPrice) return products;

    const sorted = [...products];

    if (selectedPrice === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (selectedPrice === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  };

  const filteredProducts = data?.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category.name);

    const ratingMatch = item.rating.rate >= minRating;

    const searchMatch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && ratingMatch && searchMatch;
  });

  const finalProducts = priceSorting(filteredProducts);

  return (
    <ProductContext.Provider
      value={{
        finalProducts,

        selectedCategories,
        setSelectedCategories,

        minRating,
        setMinRating,

        selectedPrice,
        setSelectedPrice,

        searchInput,
        setSearchInput,
        applySearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
