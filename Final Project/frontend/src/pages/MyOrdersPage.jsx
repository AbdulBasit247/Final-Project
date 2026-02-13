import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {

  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const mockOrders = [
  //     {
  //       _id: 12345,
  //       createdAt: new Date(),
  //       shippingAddress: { city: "New York", Country: "USA" },
  //       orderItems: [
  //         {
  //           name: "Product 1",
  //           image: "https://picsum.photos/500/500?random=1",
  //         },
  //       ],
  //       totalPrice: 100,
  //       isPaid: true,
  //     },
  //     {
  //       _id: 34567,
  //       createdAt: new Date(),
  //       shippingAddress: { city: "New York", Country: "USA" },
  //       orderItems: [
  //         {
  //           name: "Product 1",
  //           image: "https://picsum.photos/500/500?random=2",
  //         },
  //       ],
  //       totalPrice: 100,
  //       isPaid: true,
  //     },
  //   ];
  //   setOrders(mockOrders);
  // }, []);



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders , loading , error} = useSelector((state) => state.orders);


  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);


  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shpping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="cursor-pointer hover:border-gray-500 border-b"
                >
                  <td className="p-2 sm:p-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="p-2 sm:p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                    <br/>
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="p-2 sm:p-4">
                    {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.Country}` : "N/A"}
                  </td>
                  <td className="p-2 sm:p-4">
                    {order.orderItems.length}
                  </td>
                  <td className="p-2 sm:p-4">
                    ${order.totalPrice}
                  </td>
                  <td className="p-2 sm:p-4">
                    <span className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-green-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
