import React, { useContext, useEffect, useState } from "react";
import { GroceryContext } from "../context/GroceryContext";
import { useParams } from "react-router-dom";
import { categories, dummyProducts } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import ProductsList from "../components/ProductsList";

function ProductCategory() {
  const { products, navigate } = useContext(GroceryContext);
  const { category } = useParams();
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase === category
  );
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(products.length === 0);
  }, [products]);

  if (isLoading) {
    return <div className="mt-16 text-center text-lg">Loading products...</div>;
  }

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <h1 className="text-3xl md:text-4xl font-medium">
            {searchCategory.text.toUpperCase()}
          </h1>
        </div>
      )}
      {filteredProducts.length > 0 ? (
        <div>
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl md:text-4xl font-medium">
            No products found
          </h1>
        </div>
      )}
    </div>
  );
}

export default ProductCategory;
