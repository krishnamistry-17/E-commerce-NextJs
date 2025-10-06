"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import cart from "../../../public/svgs/cart.svg";

const WhishList = () => {
  const [product, setProduct] = useState<any[]>([]);
  const [favProducts, setFavProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          toast.info("Please login to add products in favorites.");
          return;
        }

        const res = await axiosInstance.get(apiRoutes.GET_FAVORITES_PRODUCTS);

        setProduct(res.data.favourites || []);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        toast.error("Could not fetch product details. Please try again.");
      }
    };

    fetchProductDetails();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const res = await axiosInstance.delete(
        apiRoutes.REMOVE_FROM_FAVORITES(productId)
      );
      toast.success("Item removed from favorites");
      setProduct([]);
    } catch (error) {
      console.error("Error removing item from favorites", error);
    }
  };

  const handleAddToCart = async (id: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const res = await axiosInstance.post(apiRoutes.ADD_FAVORITES_TO_CART, {
        productId: id,
      });

      toast.success("Item added to cart");
      setFavProducts([]);
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[103px] px-2 pt-[55px]">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold">Shopping WishList</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-3 py-10">
        <div className="flex-1">
          {product?.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            <div className="space-y-4">
              {product?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border border-gray-300 shadow-md p-4 rounded-md flex justify-between items-center"
                  >
                    <div className="flex gap-4">
                      <Image
                        src={item?.image}
                        alt={item?.productName}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover"
                        unoptimized
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item?.productName}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1">
                          Price: ${item?.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-2">
                      <div className="flex items-center gap-2 bg-cartbtn px-3 py-3 rounded">
                        <Image
                          src={cart}
                          alt="cart"
                          width={25}
                          height={25}
                          unoptimized
                          className="w-5"
                        />
                        <button
                          className="text-sm font-bold text-shopbtn ml-1"
                          onClick={() => handleAddToCart(item?._id)}
                        >
                          Add to cart
                        </button>
                      </div>
                      <MdDelete
                        className="cursor-pointer w-6 h-6 text-red-500"
                        onClick={() => handleDelete(item?._id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* <aside className="md:max-w-[300px] lg:max-w-[350px] xl:max-w-[406px] w-full h-fit bg-productborder p-5 rounded-[20px]">
          <div className="text-xl font-bold pt-4">
            Cart Total: ₹{item?.price?.toFixed(2)}
          </div>
        </aside> */}
      </div>
    </div>
  );
};

export default WhishList;
