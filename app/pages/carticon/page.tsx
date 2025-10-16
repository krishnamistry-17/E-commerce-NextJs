"use client";

import Image from "next/image";
import Link from "next/link";
import cartIcon from "@/public/svgs/cart.svg";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return; // Safety for SSR

    const fetchCart = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setCartCount(0);
        return;
      }

      try {
        const res = await axiosInstance.get(apiRoutes.GET_CART);

        const items = res.data.cart.cartItems || [];

        const totalQuantity = items.reduce(
          (acc: number, item: { quantity: number }) => acc + item.quantity,
          0
        );
        setCartCount(totalQuantity);
      } catch (err) {
        console.error("Failed to fetch cart", err);
        // Reset cart count on error
        setCartCount(0);
      }
    };

    fetchCart(); // initial fetch

    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <div>
      <Link href="/pages/cart">
        <div className="relative cursor-pointer">
          <Image
            src={cartIcon}
            alt="cart"
            aria-label="cart"
            width={25}
            height={25}
          />
          {cartCount > 0 && (
            <span className="absolute top-[-10px] -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;
