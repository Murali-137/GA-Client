import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import toast from "react-hot-toast";
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const GroceryContext = createContext(null);

function GroceryContextProvider({children}) {
    const [isLogin,setLogin] = useState(false);
    const [count, setCount] = useState(0);
    const [user,setUser] = useState(null);
    const [isAdmin,setIsAdmin] = useState(false);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : {};
    });
    const [searchQuery,setSearchQuery] = useState("");
    const [isSeller,setIsSeller] = useState(false);
    const [isTrue,setisTrue] = useState(false);


    function Count(){
      setCount(count+1);
      return count;
    }

    async function fetchSeller(){
      try {
        const {data} = await axios.get('/api/admin/is-auth');
        if(data.success){
          setIsSeller(true);
        }
        else{
          setIsSeller(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/user/is-auth");
        if (data.success) {
          setUser(data.user);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProducts = async()=>{
      try {
        const {data} = await axios.get('/api/product/list');
        if(data.success){
          setProducts(data.products);
        }
        else{
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    
    const addToCart = (itemId) => {
      let cartData = structuredClone(cartItems || {});
      if(cartData[itemId]){
        cartData[itemId]+=1
      }
      else{
        cartData[itemId]=1;
      }
      setCartItems(cartData);
      toast.success("Added to cart");
    };

    const updateCartItem = (itemId,quantity)=>{
      let cartData = structuredClone(cartItems || {});
      cartData[itemId] = quantity;
      setCartItems(cartData);
      toast.success(`cart Updated`);
    }
    const cartCount = ()=>{
      let count = 0;
      for (const item in cartItems){
        count+=cartItems[item];
      }
      return count;
    }

    const totalCartAmount =()=>{
      let total = 0;
      for (const items in cartItems){
        let itemInf = products.find((product)=>product._id===items);
        if(cartItems[items]>0){
          total+=itemInf.offerPrice*cartItems[items];
        }
      }
      return Math.floor(total*100)/100;
    }

    const removeFromCart = (itemId)=>{
      let cartData = structuredClone(cartItems || {});
      if(cartData[itemId]){
        cartData[itemId]-=1;
        if(cartData[itemId]==0){
          delete cartData[itemId];
        }
        toast.success('Removed from Cart');
        setCartItems(cartData);
      }
    }
    const navigate = useNavigate();

    useEffect(()=>{
      fetchSeller();
      fetchProducts();
      fetchUser();
    },[]);


    useEffect(()=>{
      async function UpdateCart(){
        try {
          const {data} = await axios.post('/api/cart/updatecart',{cartItems});
          if(!data.success){
            toast.error(data.message);
          }
        } 
        catch (error) {
          toast.error(error.message);
        }
      }
      if(user){
        UpdateCart();
      }
     
    },[cartItems]);


    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

  return (
    <GroceryContext.Provider value={{
        isLogin,
        setLogin,
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        navigate,
        showUserLogin,
        setShowUserLogin,
        products,
        addToCart,
        removeFromCart,
        updateCartItem,
        cartItems,
        totalCartAmount,
        fetch,
        cartCount,
        searchQuery,
        setSearchQuery,
        isSeller,
        setIsSeller,
        axios,
        fetchProducts,
        setCartItems,
        isTrue,
        setisTrue,
        Count
    }}>
        {children}
    </GroceryContext.Provider>
  )
}

export default GroceryContextProvider;
