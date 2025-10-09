import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import { toast } from "react-toastify";
import type { Dispatch } from "@reduxjs/toolkit";
import { addToCart } from "@/app/pages/slice/cartSlice";

interface Product {
  _id: string;
  productName: string;
  price: number;
  image: string;
  stock: number;
  quantity?: number;
}

export const handleCart = async (
  product: Product,
  clickedCartIds: string[],
  dispatch: Dispatch,
  productId: string
) => {
  if (clickedCartIds?.includes(productId)) {
    toast.info("Product already exists in cart");
    return;
  }

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    toast.info("Please Login to add product in cart");
    return;
  }

  try {
    const res = await axiosInstance.post(apiRoutes.ADD_TO_CART(product?._id));

    if (res.status === 200 || res.data.success) {
      toast.success("Added to cart successfully!");
      dispatch(
        addToCart({
          id: product?._id,
          productName: product?.productName,
          price: product?.price.toString(),
          quantity: product?.quantity || 1,
          image: product?.image,
          stock: product?.stock,
        })
      );

      // Dispatch custom event to notify other components
      window.dispatchEvent(
        new CustomEvent("cartUpdated", {
          detail: {
            action: "add",
            productId: productId,
          },
        })
      );
    }
  } catch (error: any) {
    if (error.response?.status === 409) {
      toast.info("Product already exists in cart.");
      dispatch(
        addToCart({
          id: productId,
          productName: product?.productName,
          price: product?.price.toString(),
          quantity: product?.quantity || 1,
          image: product?.image,
          stock: product?.stock,
        })
      );
    } else {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart");
    }
  }
};

export const clearCartAfterPayment = async (
  dispatch: any,
  clearCart: any,
  orderId?: string
): Promise<void> => {
  try {
    // First, get all cart items
    const cartResponse = await axiosInstance.get(apiRoutes.GET_CART);
    const cartItems = cartResponse?.data?.cart?.cartItems || [];

    console.log("Clearing cart after payment for order:", orderId);
    console.log("Cart items to remove:", cartItems);

    // Remove each item from the backend
    if (cartItems.length > 0) {
      const removePromises = cartItems.map((item: any) =>
        axiosInstance
          .delete(apiRoutes.REMOVE_FROM_CART(item.productId))
          .catch((err) =>
            console.error(`Failed to remove item ${item.productId}:`, err)
          )
      );

      await Promise.all(removePromises);
      console.log("All cart items removed from backend");
    }

    // Clear Redux cart store
    dispatch(clearCart());

    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    toast.success("Cart cleared successfully!");
  } catch (error) {
    console.error("Error clearing cart after payment:", error);
    // Even if backend fails, clear Redux store
    dispatch(clearCart());
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }
};
