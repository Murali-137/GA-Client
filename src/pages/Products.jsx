import React, { useContext, useEffect,useState } from 'react'
import { GroceryContext } from '../context/GroceryContext'
import { dummyProducts } from '../assets/assets';
import ProductCard from '../components/ProductCard';

function Products() {
  const {products,searchQuery} = useContext(GroceryContext);
  

  const [filteredProducts,setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false); 
    }
  }, [products]);

  useEffect(()=>{
    if(searchQuery.length>0){
      setFilteredProducts(
        products.filter((product)=>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    else{
      setFilteredProducts(products);
    }
  },[products,searchQuery]);


  if (isLoading) {
    return <div className="mt-16 text-center text-xl">Loading products...</div>;
  }
  
  return (
    <div className="mt-16">
      <h1 className="text-3xl lg:text-4xl font-medium">All Products</h1>
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center justify-center">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Products;
