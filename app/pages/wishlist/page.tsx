"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import cart from "../../../public/svgs/cart.svg";
import cartimage from "../../../public/images/cart.png";
import { useRouter } from "next/navigation";
import home from "../../../public/svgs/home.svg";
import right from "../../../public/svgs/right.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const WhishList = () => {
  const [product, setProduct] = useState<
    Array<{
      _id: string;
      productName: string;
      price: number;
      image: string;
    }>
  >([]);
  // const [favProducts, setFavProducts] = useState<any[]>([]);
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);
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
      }
    };

    fetchProductDetails();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      await axiosInstance.delete(apiRoutes.REMOVE_FROM_FAVORITES(productId));
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

      await axiosInstance.post(apiRoutes.ADD_FAVORITES_TO_CART, {
        productId: id,
      });

      toast.success("Item added to cart");
      // setFavProducts([]);
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  return (
    <>
      <div className="w-full border-b border-gray-200 py-[6px] px-5">
        <div className="flex items-center gap-[3px]">
          <div
            className="flex items-center gap-[8px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={home} alt="home" width={14} height={14} unoptimized />
            <p className="text-[14px] text-shopbtn font-quick-semibold-600 hidden md:block">
              Home
            </p>
            <Image src={right} alt="right" width={19} height={24} unoptimized />
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] text-bgbrown font-quick-semibold-600">
              Wishlist
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1640px] mx-auto xl:px-[103px] px-2 pt-[20px]">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-[24px] text-regalblue font-semibold">
            Shopping WishList
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-3 py-10">
          <div className="flex-1">
            {product?.length === 0 ? (
              <div className="w-full border border-gray-300 shadow-md p-5">
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={cartimage}
                    alt="cart"
                    width={221}
                    height={162}
                    unoptimized
                    className="object-cover"
                  />
                  <p className="text-[24px] text-regalblue font-semibold py-[20px]">
                    Missing WishList Items?
                  </p>
                  <p className="text-[20px] text-regalblue">
                    {accessToken
                      ? "Continue shopping. Go to Home."
                      : "Sign in to add items"}
                  </p>
                  <button
                    onClick={() => router.push(accessToken ? "/" : "/signin")}
                    className="text-white bg-shopbtn text-[16px] px-[32px] py-[6px] my-[8px]"
                  >
                    {accessToken ? "Go to Home" : "Sign in"}
                  </button>
                </div>
              </div>
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
                        <div className="md:flex hidden items-center gap-2 bg-cartbtn px-3 py-3 rounded">
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
                        <div className="md:hidden items-center gap-2  px-3 py-3 rounded">
                          <Image
                            onClick={() => handleAddToCart(item?._id)}
                            src={cart}
                            alt="cart"
                            width={25}
                            height={25}
                            unoptimized
                            className="w-5"
                          />
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
    </>
  );
};

export default WhishList;
