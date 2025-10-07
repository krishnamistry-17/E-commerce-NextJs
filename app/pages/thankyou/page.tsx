"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Order, OrderResponse } from "@/types/order";
import { OrderService } from "@/services/orderService";
import Image from "next/image";

const ThankyouContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("orderId");

  const fetchOrderDetails = useCallback(async () => {
    try {
      if (!orderId) return;

      const response: OrderResponse = await OrderService.getOrderById(orderId);

      if (response.success && response.order) {
        setOrder(response.order);
      } else {
        console.error(response.message || "Failed to fetch order details");
      }
    } catch (error: unknown) {
      console.error("Error fetching order:", error);
      console.error("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (orderId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [orderId, fetchOrderDetails]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center justify-center bg-white text-center mb-8">
        <div className="bg-green-100 rounded-full p-6 mb-6">
          <FaCheckCircle className="text-green-600 w-10 h-10" />
        </div>

        <h1 className="text-4xl font-bold text-green-700 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 max-w-md mb-8">
          Your order has been successfully placed. We appreciate your business
          and will send you a confirmation email shortly.
        </p>

        {order && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">
              Order Number: #{order.orderNumber}
            </p>
            <p className="text-green-700 text-sm">
              Total Amount: ₹{order.total.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {order && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-regalblue mb-6">
            Order Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-regalblue mb-3">
                Shipping Address
              </h3>
              <div className="text-gray-700">
                <p>
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">📞 {order.shippingAddress.phone}</p>
                <p>📧 {order.shippingAddress.email}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-regalblue mb-3">
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹{order.shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.orderStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.orderStatus === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : order.orderStatus === "shipped"
                      ? "bg-purple-100 text-purple-800"
                      : order.orderStatus === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Status:{" "}
                  {order.orderStatus.charAt(0).toUpperCase() +
                    order.orderStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-regalblue mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.productName}
                    width={60}
                    height={60}
                    className="w-15 h-15 object-cover rounded"
                    unoptimized
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-regalblue">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ₹{item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {order.notes && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Order Notes</h4>
              <p className="text-blue-700">{order.notes}</p>
            </div>
          )}

          {order && (
            <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-4 text-lg">
                Bank Transfer Instructions
              </h4>
              <div className="space-y-3 text-yellow-700">
                <p className="font-medium">
                  Please complete your payment by bank transfer:
                </p>
                <div className="bg-white p-4 rounded-lg border border-yellow-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Bank Details:</p>
                      <p>Bank Name: Your Bank Name</p>
                      <p>Account Name: Your Business Name</p>
                      <p>Account Number: 1234567890</p>
                      <p>IFSC Code: BANK0001234</p>
                    </div>
                    <div>
                      <p className="font-semibold">Transfer Details:</p>
                      <p>Amount: ₹{order.total.toFixed(2)}</p>
                      <p>Reference: {order.orderNumber}</p>
                      <p>Purpose: Online Purchase</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-100 rounded border border-yellow-300">
                  <p className="text-sm font-medium">
                    ⚠️ Important: Please use "{order.orderNumber}" as the
                    payment reference. Your order will be processed once the
                    payment is received and verified.
                  </p>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded border border-green-300">
                  <p className="text-sm font-medium text-green-800">
                    After making the payment, please send a screenshot of the
                    transaction to our support team at support@yourecommerce.com
                    for faster processing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition"
        >
          Continue Shopping
        </button>
        {order && (
          <button
            onClick={() => router.push("/pages/orders")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition"
          >
            View All Orders
          </button>
        )}
      </div>
    </div>
  );
};

const Thankyou = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <ThankyouContent />
    </Suspense>
  );
};

export default Thankyou;
