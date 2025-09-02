import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GroceryContext } from "../context/GroceryContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(GroceryContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-12 pb-16">
      <div>
        <p className="text-2xl md:text-3xl font-medium">My Orders</p>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between items-center gap-6 ">
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: ₹{order.amount}</span>
          </p>

          {order.items.map((item, index) => {
            const product = item.product; // for readability

            return (
              <div
                key={index}
                className={`relative bg-white text-gray-800/70 ${
                  order.items.length !== index + 1 && "border-b"
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 w-full max-w-4xl`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="p-4 rounded-lg">
                    {product?.image?.[0] ? (
                      <img
                        src={`https://quibaback.onrender.com/images/${product.image[0]}`}
                        alt={product?.name || "Product"}
                        className="w-16 h-16"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    <h2 className="text-xl font-medium">
                      {product?.name || "Unknown Product"}
                    </h2>
                    <p>{product?.category || "No Category"}</p>
                  </div>
                </div>

                <div className="text-lg font-medium">
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <p className="text-lg">
                  Amount: ₹
                  {product?.offerPrice
                    ? product.offerPrice * item.quantity
                    : "N/A"}
                </p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
