//my-next-app/app/pages/cart/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import right from "../../../public/svgs/right.svg";
import home from "../../../public/svgs/home.svg";
import cartimage from "../../../public/images/cart.png";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { removeFromCart } from "../slice/cartSlice";

const CartComponent = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log("cartItems", cartItems);

  const router = useRouter();
  const [cartData, setCartData] = useState<
    Array<{
      _id: string;
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      image: string;
    }>
  >([]);
  console.log("cartData", cartData);

  // Fetch cart on mount and sync with Redux
  const fetchCart = async () => {
    try {
      console.log("CartComponent: Fetching cart from backend...");
      const res = await axiosInstance.get(apiRoutes.GET_CART);
      console.log("CartComponent: Cart response:", res.data);
      const backendCartData = res?.data?.cart?.cartItems;

      if (backendCartData && backendCartData.length > 0) {
        console.log(
          "CartComponent: Setting cart data from backend:",
          backendCartData
        );
        setCartData(backendCartData);
      } else {
        console.log("CartComponent: Backend cart is empty");
        // If backend cart is empty, use Redux store data
        if (cartItems.length > 0) {
          console.log("CartComponent: Using Redux cart data:", cartItems);
          const formattedCartData = cartItems.map((item) => ({
            _id: item.id,
            productId: item.id,
            productName: item.productName,
            price: parseFloat(item.price),
            quantity: item.quantity,
            image: item.image,
          }));
          setCartData(formattedCartData);
        } else {
          console.log("CartComponent: Both backend and Redux carts are empty");
          setCartData([]);
        }
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
      // Fallback to Redux store data
      if (cartItems.length > 0) {
        console.log(
          "CartComponent: Error occurred, using Redux fallback:",
          cartItems
        );
        const formattedCartData = cartItems.map((item) => ({
          _id: item.id,
          productId: item.id,
          productName: item.productName,
          price: parseFloat(item.price),
          quantity: item.quantity,
          image: item.image,
        }));
        setCartData(formattedCartData);
      } else {
        console.log(
          "CartComponent: Error occurred, no fallback data available"
        );
        setCartData([]);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [cartItems.length]); // Re-fetch when Redux cart changes

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const totalPrice = cartData?.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  // Update quantity

  const handleQuantityChange = async (productId: string, quantity: number) => {
    try {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (!accessToken) return;

      await axiosInstance.patch(apiRoutes.UPDATE_CART(productId), {
        quantity,
      });

      fetchCart(); // Refresh cart from backend

      // Dispatch event to update cart icon
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  // Delete item
  const handleDelete = async (productId: string) => {
    try {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (!accessToken) return;

      console.log("CartComponent: Deleting product:", productId);
      await axiosInstance.delete(apiRoutes.REMOVE_FROM_CART(productId));
      toast.success("Item removed from cart");

      // Remove from Redux store
      dispatch(removeFromCart(productId));

      // Update local cartData optimistically
      const updatedCart = cartData.filter(
        (item) => item.productId !== productId
      );
      setCartData(updatedCart); // Manually update state first

      console.log("CartComponent: Updated cart data, dispatching event");
      // Dispatch event to update cart icon
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }

      // Re-fetch from backend (optional, or for accuracy)
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
        <div className="flex items-center justify-between px-5">
          <h1 className="text-[24px] text-regalblue font-semibold">Cart</h1>
        </div>
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
                {cartData?.map((item) => {
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

                      <div className=" flex lg:flex-col flex-row justify-between items-center  lg:mt-0 mt-2">
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
                Cart Total: ₹{totalPrice?.toFixed(2)}
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

export default CartComponent;
