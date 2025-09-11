import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Link from "next/link";

const WishListIcon = () => {
  const wishItem = useSelector((state: RootState) => state.wish.items);
  const totalQuantity = wishItem.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <Link href="/pages/wishlist">
        <div className="relative cursor-pointer">
          {totalQuantity > 0 && (
            <span className="absolute top-[-32px] -right-0 bg-shopbtn text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default WishListIcon;
