"use client";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import { Order, CreateOrderRequest, OrderResponse } from "@/types/order";

export class OrderService {
  /**
   * Create a new order
   */
  static async createOrder(
    orderData: CreateOrderRequest
  ): Promise<OrderResponse> {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axiosInstance.post(
        apiRoutes.CREATE_ORDER,
        orderData
      );
      console.log("response ????create order:", response);
      return response.data;
    } catch (error: any) {
      console.error("Create order error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }

  /**
   * Get all orders for the current user
   */
  static async getOrders(
    page: number = 1,
    limit: number = 10,
    status?: string
  ): Promise<OrderResponse> {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found");
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (status) {
        params.append("status", status);
      }

      const response = await axiosInstance.get(
        `${apiRoutes.GET_ORDERS}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Get orders error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }

  /**
   * Get a specific order by ID
   */
  static async getOrderById(orderId: string): Promise<OrderResponse> {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axiosInstance.get(
        `${apiRoutes.GET_ORDER_BY_ID(orderId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Get order error:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch order");
    }
  }

  /**
   * Update order status
   */
  // static async updateOrderStatus(
  //   orderId: string,
  //   updateData: {
  //     orderStatus?:
  //       | "pending"
  //       | "processing"
  //       | "shipped"
  //       | "delivered"
  //       | "cancelled";
  //     paymentStatus?: "pending" | "completed" | "failed" | "refunded";
  //     transactionId?: string;
  //   }
  // ): Promise<OrderResponse> {
  //   try {
  //     const token = localStorage.getItem("accessToken");

  //     if (!token) {
  //       throw new Error("No access token found");
  //     }

  //     const response = await axiosInstance.patch(
  //       apiRoutes.UPDATE_ORDER_API(orderId),
  //       updateData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     return response.data;
  //   } catch (error: any) {
  //     console.error("Update order error:", error);
  //     throw new Error(
  //       error.response?.data?.message || "Failed to update order"
  //     );
  //   }
  // }

  /**
   * Cancel an order
   */
  // static async cancelOrder(orderId: string): Promise<OrderResponse> {
  //   return this.updateOrderStatus(orderId, { orderStatus: "cancelled" });
  // }
}
