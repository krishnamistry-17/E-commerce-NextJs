"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Link from "next/link";
import Image from "next/image";

const CartIcon = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <Link href="/pages/cart">
        <div className="relative cursor-pointer">
          {totalQuantity > 0 && (
            <span className="absolute top-[-32px] -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;
