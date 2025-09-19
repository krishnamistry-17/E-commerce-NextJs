"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearWishList, removeFromWishList } from "../slice/wishListSlice";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

const WhishList = () => {
  const wishItem = useSelector((state: RootState) => state.wish.items);
  const dispatch = useDispatch();

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[103px] px-2 pt-[55px]">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold">Shopping WishList</h2>
        <button
          onClick={() => dispatch(clearWishList())}
          className="text-2xl font-bold md:block hidden"
        >
          Clear WishList
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 py-10">
        <div className="flex-1">
          {wishItem.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            <div className="space-y-4">
              {wishItem.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-300 shadow-md p-4 rounded-md flex justify-between items-center"
                >
                  <div className="flex gap-4">
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover"
                      unoptimized
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item?.title}</h3>

                      <p className="text-sm text-gray-600 mt-1">
                        Price: ${item?.newPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold mb-2">
                      Total: ${(item?.newPrice * item?.quantity).toFixed(2)}
                    </p>
                    <MdDelete
                      onClick={() => dispatch(removeFromWishList(item?.id))}
                      className="cursor-pointer w-6 h-6 text-red-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <aside className="md:max-w-[300px] lg:max-w-[350px] xl:max-w-[406px] w-full h-fit bg-productborder p-5 rounded-[20px]">
          <div className="text-xl font-bold pt-4">
            Cart Total: ${totalPrice.toFixed(2)}
          </div>
        </aside> */}
      </div>
    </div>
  );
};

export default WhishList;
