import React, { useContext } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { GroceryContext } from "./context/GroceryContext";
import Auth from "./models/Auth";
import ProductCategory from "./pages/ProductCategory";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import Address from "./pages/Address";
import SellerPage from "./pages/seller/SellerPage";
import SellerLogin from "./components/seller/SellerLogin";
// import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";
import AddProduct from "./pages/seller/AddProduct";
import MyOrders from "./pages/MyOrders";
import Orders from "./pages/seller/Orders";
import { Navigate } from "react-router-dom";

const App = () => {
  const { showUserLogin,isSeller,user,setShowUserLogin} = useContext(GroceryContext);
  const isSellerPath = useLocation().pathname.includes("admin");
  return (
    <div>
      <div className="text-default min-h-screen">
        {isSellerPath ? null : <Navbar />}
        {showUserLogin ? <Auth /> : null}
        <Toaster />
        <div
          className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
          onClick={()=>setShowUserLogin(false)}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetails/:category/:id" element={<ProductDetails />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/add-address" element={<Address/>}/>
            <Route path="/my-orders" element={<MyOrders/>}/>
            <Route path="/admin" element ={isSeller?<SellerPage/>:<SellerLogin/>}>
              <Route index element={<Navigate to="add-product" />} />
              <Route index path="orders" element={isSeller?<Orders/>:null}/>
              <Route path="add-product" element={isSeller?<AddProduct/>:null}/>
              <Route path="product-list" element={isSeller?<ProductList/>:null}/>
            </Route>
          </Routes>
        </div>
        {isSellerPath?null:<Footer/>}
      </div>
    </div>
  );
};

export default App;
