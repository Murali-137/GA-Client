import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GroceryContext } from "../../context/GroceryContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(GroceryContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return <div className="mt-16 text-center text-lg">Loading orders...</div>;
  }
  
  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>

      {orders.map((order, orderIndex) => (
        <div
          key={orderIndex}
          className="border border-gray-300 rounded-md p-4 space-y-4 max-w-4xl"
        >
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentType}
            </p>
            <p>
              <strong>Status:</strong> {order.isPaid ? "Paid" : "Pending"}
            </p>
            <p>
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="space-y-4">
            {order.items.map((item, itemIndex) => {
              const product = item.product;
              const image = product?.image?.[0];

              return (
                <div
                  key={itemIndex}
                  className="flex gap-5 items-center border-b pb-4 last:border-none"
                >
                  {image ? (
                    <img
                      className="w-16 h-16 object-cover rounded-md"
                      src={`https://quibaback.onrender.com/images/${image}`}
                      alt={product?.name || "Product"}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="font-medium text-base">
                      {product?.name || "Unnamed Product"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product?.category || "Unknown Category"}
                    </p>
                    <p className="text-sm mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right text-sm font-semibold">
                    ₹
                    {product?.offerPrice
                      ? product.offerPrice * item.quantity
                      : "N/A"}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-right font-semibold text-base mt-2">
            Total: ₹{order.amount}
          </div>

          <div className="text-sm text-gray-600 mt-1">
            <strong>Customer:</strong> {order.address?.firstName}{" "}
            {order.address?.lastName} <br />
            <strong>Address:</strong>{" "}
            {order.address
              ? `${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.zipcode}, ${order.address.country}`
              : "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
