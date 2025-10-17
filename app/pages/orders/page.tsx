"use client";

import React, { useEffect, useState } from "react";
import right from "../../../public/svgs/right.svg";
import home from "../../../public/svgs/home.svg";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import mixpanelInstance from "@/lib/mixPanel";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const OrderPage = () => {
  const [orders, setOrders] = useState<
    Array<{
      _id: string;
      id: string;
      status: string;
      date: string;
      address: string;
      subtotal: number;
      Products: Array<{
        quantity: number;
        price: number;
      }>;
    }>
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState<
    Array<{
      _id: string;
      id: string;
      status: string;
      date: string;
      address: string;
      subtotal: number;
      Products: Array<{
        quantity: number;
        price: number;
      }>;
    }>
  >([]);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    mixpanelInstance.init();
    mixpanelInstance.identify(user?._id || "");
    mixpanelInstance.people.set({
      $order_tracking: true,
    });
  }, [mixpanelInstance]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(apiRoutes.GET_ORDERS);
        setOrders(response?.data?.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (orderId: string) => {
    try {
      await axiosInstance.patch(apiRoutes.REMOVE_ORDERS, {
        orderId,
      });

      toast.success("Order deleted successfully");
      setOrders(orders?.filter((order) => order?._id !== orderId));
      setFilteredOrders(
        filteredOrders?.filter((order) => order?._id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  //   // const getPaymentStatusColor = (status: string) => {
  //   switch (status) {
  //     case "pending":
  //       return "bg-yellow-100 text-yellow-800";
  //     case "completed":
  //       return "bg-green-100 text-green-800";
  //     case "failed":
  //       return "bg-red-100 text-red-800";
  //     case "refunded":
  //       return "bg-orange-100 text-orange-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleFilter = (status: string) => {
    setSelectedStatus(status);
    setFilteredOrders(
      orders?.filter((order) =>
        status === "All" ? order : order.status === status
      )
    );
  };

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[103px] px-2 pt-[20px]">
      {/* Breadcrumb */}
      <div className="w-full border-b border-gray-200 py-[6px] px-5">
        <div className="flex items-center gap-[3px]">
          <div
            className="flex items-center gap-[8px] cursor-pointer"
            // onClick={() => (window.location.href = "/")}
          >
            <Image src={home} alt="home" width={14} height={14} unoptimized />
            <p className="text-[14px] text-shopbtn font-quick-semibold-600 hidden md:block">
              Home
            </p>
            <Image src={right} alt="right" width={19} height={24} unoptimized />
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] text-bgbrown font-quick-semibold-600">
              My Orders
            </p>
          </div>
        </div>
      </div>

      <div className="py-8">
        <h1 className="text-3xl font-bold text-regalblue mb-6">My Orders</h1>

        {/* Filter */}

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "All",
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
          ].map((category, index) => {
            const selected = selectedStatus === category;
            return (
              <button
                key={index}
                onClick={() => handleFilter(category)}
                className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                  selected
                    ? "bg-shopbtn text-white border-shopbtn"
                    : "bg-white text-bgbrown border-gray-300 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-shopbtn"></div>
          </div>
        ) : orders?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders?.map((order) => (
              <div
                key={order?.id}
                className="border border-gray-300 rounded-lg p-6 shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-regalblue">
                      Order #{order?._id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order?.date?.toString())}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order?.status
                      )}`}
                    >
                      {order.status?.charAt(0)?.toUpperCase() +
                        order?.status?.slice(1)}
                    </span>
                    <MdDelete
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(order?._id)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-regalblue mb-2">
                      Shipping Address
                    </h4>
                    {/* <p className="text-sm text-gray-700">
                      Username: {order?.userName}{" "}
                    </p>
                    <p className="text-sm text-gray-700">
                      Email:{order?.email}
                    </p> */}
                    <p className="text-sm text-gray-700">
                      Address: {order?.address}{" "}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-regalblue mb-2">
                      Order Summary
                    </h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{order?.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>₹0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>₹0</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span>Total:</span>
                        <span>₹{order?.subtotal}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-regalblue mb-2">
                    Order Items
                  </h4>
                  <div className="space-y-2">
                    {order?.Products?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                        >
                          {/* <Image
                          src={item?.image}
                          alt={item.productName}
                          width={50}
                          height={50}
                          className="w-12 h-12 object-cover rounded"
                          unoptimized
                        /> */}
                          <div className="flex-1">
                            {/* <p className="font-medium text-regalblue">
                            {item?.productName}
                          </p> */}
                            <p className="text-sm text-gray-600">
                              Qty: {item?.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">₹{item?.price}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {/* {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default OrderPage;
