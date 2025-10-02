"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import right from "../../../public/svgs/right.svg";
import home from "../../../public/svgs/home.svg";
import cartimage from "../../../public/images/cart.png";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const Cart = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [cartData, setCartData] = useState<any[]>([]);

  // Fetch cart on mount
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get(apiRoutes.GET_CART);
      setCartData(res?.data?.cart?.cartItems);
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Total price calculation
  // const totalPrice = cartData.reduce(
  //   (acc, item) => acc + Number(item.price) * (item.quantity || 1),
  //   0
  // );

  const totalPrice = cartData?.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  // Update quantity

  const handleQuantityChange = async (productId: string, quantity: number) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const res = await axiosInstance.patch(apiRoutes.UPDATE_CART(productId), {
        quantity,
      });

      fetchCart(); // Refresh cart from backend
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  // Delete item
  const handleDelete = async (productId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const res = await axiosInstance.delete(
        apiRoutes.REMOVE_FROM_CART(productId)
      );
      toast.success("Item removed from cart");
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  const handleNavigation = () => router.push("/pages/checkout");

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
              Cart
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1640px] mx-auto xl:px-[103px] px-2 pt-[20px]">
        <div className="flex flex-col md:flex-row gap-3 py-10">
          <div className="flex-1">
            {cartData?.length === 0 ? (
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
                    Missing Cart Items?
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
                {cartData?.map((item, index) => {
                  return (
                    <div
                      key={item._id}
                      className="border border-gray-300 shadow-md p-4 rounded-md lg:flex justify-between items-center"
                    >
                      <div className="flex gap-4">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          width={64}
                          height={64}
                          className="w-[80px] h-[80px] object-cover"
                          unoptimized
                        />
                        <div>
                          <h3 className="text-[16px] font-semibold text-regalblue">
                            {item.productName}
                          </h3>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              <FaMinus className="text-shopbtn" />
                            </button>
                            <span className="px-2 text-[16px] text-bgbrown font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              <FaPlus className="text-shopbtn" />
                            </button>
                          </div>

                          <p className="text-sm text-gray-600 mt-1">
                            Price: ₹{item.price}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold mb-2">
                          Total: ₹
                          {(Number(item.price) * (item.quantity || 1)).toFixed(
                            2
                          )}
                        </p>
                        <MdDelete
                          onClick={() => handleDelete(item?.productId)}
                          className="cursor-pointer w-6 h-6 text-red-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartData?.length !== 0 && (
            <aside className="md:max-w-[300px] lg:max-w-[350px] xl:max-w-[406px] w-full h-fit border border-gray-300 shadow-md p-5 rounded-[20px]">
              <h2 className="text-[32px] text-regalblue font-bold">Total</h2>
              <div className="text-[22px] text-regalblue font-semibold pt-4">
                Cart Total: ${totalPrice?.toFixed(2)}
              </div>
              <div className="pt-4">
                <button
                  className="text-white font-medium text-[16px] bg-shopbtn px-[12px] py-[6px] rounded-[5px]"
                  onClick={handleNavigation}
                >
                  CheckOut
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
