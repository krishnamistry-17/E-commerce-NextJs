import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import { toast } from "react-toastify";
import type { Dispatch } from "@reduxjs/toolkit";
import { addToCart } from "@/app/pages/slice/cartSlice";

interface Product {
  id: string;
  productName: string;
  price: string;
  image: string;
  stock: number;
  quantity?: number;
}

export const handleCart = async (
  product: Product,
  clickedCartIds: string[],
  dispatch: Dispatch
) => {
  if (clickedCartIds?.includes(product?.id)) {
    toast.info("Product already added in cart");
    return;
  }

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    toast.info("Please Login to add product in cart");
    return;
  }

  try {
    const res = await axiosInstance.post(apiRoutes.ADD_TO_CART(product?.id));
    console.log("res???????carthelp :", res);
    if (res.status === 200 || res.data.success) {
      toast.success("Added to cart successfully!");
      dispatch(
        addToCart({
          ...product,
          quantity: product.quantity || 1,
        })
      );
    }
  } catch (error: any) {
    if (error.response?.status === 409) {
      toast.info("Product already exists in cart.");
    }
  }

  window.dispatchEvent(new Event("cartUpdated"));
};
