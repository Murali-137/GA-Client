import React, { useContext, useEffect, useState } from 'react'
import { GroceryContext } from '../../context/GroceryContext';
import toast from "react-hot-toast";

function SellerLogin() {
    const {isSeller,setIsSeller,axios,navigate} = useContext(GroceryContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmit(e){
      try {
        e.preventDefault();
        const { data } = await axios.post("/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          setIsSeller(true);
          navigate("/admin");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    useEffect(() => {
        if (isSeller) {
          navigate("/admin");
        }
      }, [isSeller]);

    return !isSeller && (
        <div className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center  bg-black/50 text-gray-600">
          <form  onClick={(e)=>e.stopPropagation()} onSubmit={handleSubmit}className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
              <span className="text-purple-500">Admin</span>{" "}
              Login
            </p>
            <div className="w-full ">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="type here"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
                type="email"
                required
              />
            </div>
            <div className="w-full ">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="type here"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
                type="password"
                required
              />
            </div>
            <button className="bg-purple-500 hover:bg-purple-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
              Login
            </button>
          </form>
        </div>
      );
}

export default SellerLogin;
