"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "../../store/store";
import Image from "next/image";
import { removeFromCart, updateQuantity } from "../slice/cartSlice";
import { MdDelete } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import right from "../../../public/svgs/right.svg";
import home from "../../../public/svgs/home.svg";
import cartimage from "../../../public/images/cart.png";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  // Get all cart items from redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log("cartItems?????? :", cartItems);

  //  Total price calculation
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  //  Handle quantity change
  const handleIncrease = (id: string, currentQty: number) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id: string, currentQty: number) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  const handleNavigation = () => {
    router.push("/pages/checkout");
  };

  return (
    <>
      <div className="w-full  border-b border-gray-200 py-[6px]  px-5">
        <div className="flex items-center gap-[3px] ">
          <div
            className="flex items-center gap-[8px]"
            onClick={() => router.push("/")}
          >
            <Image src={home} alt="home" width={14} height={14} />
            <p className="text-[14px] text-shopbtn font-quick-semibold-600 md:block hidden cursor-pointer">
              Home
            </p>
            <Image src={right} alt="right" width={19} height={24} />
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] text-bgbrown font-quick-semibold-600">
              Cart
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1640px] mx-auto xl:px-[103px] px-2 pt-[20px]">
        <div className="flex items-center justify-between">
          {/* <button
          onClick={() => dispatch(clearCart())}
          className="text-2xl font-bold"
        >
          Clear cart
        </button> */}
        </div>

        <div className="flex flex-col md:flex-row gap-3 py-10">
          <div className="flex-1">
            {cartItems?.length === 0 ? (
              <div className=" w-full h-fit border border-gray-300 shadow-md p-5">
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={cartimage}
                    alt="cartimage"
                    width={221}
                    height={162}
                    unoptimized
                    className=" object-cover"
                  />
                  <p className=" text-[24px] text-regalblue font-semibold py-[20px]">
                    Missing Cart Items?
                  </p>

                  <p className=" text-[20px] text-regalblue">
                    {session
                      ? "Continue shooping Go to Home"
                      : "Signin to add items"}
                  </p>
                  {session ? (
                    <button
                      onClick={() => router.push("/")}
                      className="text-white bg-shopbtn text-[16px] px-[32px] py-[6px] my-[8px]"
                    >
                      Go to Home
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/signin")}
                      className="text-white bg-shopbtn text-[16px] px-[32px] py-[6px] my-[8px]"
                    >
                      Signin
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item?.id}
                    className="border border-gray-300 shadow-md p-4 rounded-md lg:flex justify-between items-center"
                  >
                    <div className="flex gap-4">
                      <Image
                        src={item?.image}
                        alt={item?.productName}
                        width={64}
                        height={64}
                        className="w-[80px] h-[80px] object-cover"
                        unoptimized
                      />
                      <div>
                        <h3 className="lg:text-[18px] text-[16px] font-quick-bold-700 text-regalblue">
                          {item?.productName}
                        </h3>

                        {/*  Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              handleDecrease(item?.id, item?.quantity)
                            }
                          >
                            <FaMinus className="text-shopbtn" />
                          </button>
                          <span className="px-2 text-[16px] text-bgbrown font-semibold">
                            {item?.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrease(item?.id, item?.quantity)
                            }
                          >
                            <FaPlus className="text-shopbtn" />
                          </button>
                        </div>

                        <div className="md:flex items-center gap-[12px]">
                          <p className="text-sm text-gray-600 mt-1">
                            Price: ${item?.price}
                          </p>
                          {/* <button className="bg-green-200 px-[8px] md:mt-0 mt-3 py-[6px] rounded-md">
                            {item?.size}g
                          </button> */}
                        </div>
                      </div>
                    </div>

                    <div className="text-right lg:block hidden">
                      <p className="text-sm font-bold mb-2">
                        Total: $
                        {(Number(item?.price) * item?.quantity).toFixed(2)}
                      </p>
                      <MdDelete
                        onClick={() => {
                          dispatch(removeFromCart(item?.id));
                          persistor.purge();
                          localStorage.removeItem("persist:root");
                        }}
                        className="cursor-pointer w-6 h-6 text-red-500  "
                      />
                    </div>

                    <div className="lg:hidden flex items-center gap-2 pt-4">
                      <p className="text-sm font-bold mb-2 pt-2">
                        Total: $
                        {(Number(item?.price) * item?.quantity).toFixed(2)}
                      </p>
                      <MdDelete
                        onClick={() => {
                          dispatch(removeFromCart(item?.id));
                          persistor.purge();
                          localStorage.removeItem("persist:root");
                        }}
                        className="cursor-pointer w-6 h-6 text-red-500  "
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/*  Cart Summary */}
          {cartItems?.length !== 0 && (
            <>
              <aside className="md:max-w-[300px] lg:max-w-[350px] xl:max-w-[406px] w-full h-fit border border-gray-300 shadow-md p-5 rounded-[20px]">
                <h2 className="text-[32px] text-regalblue font-quick-bold-700">
                  Total
                </h2>
                <div className="text-[22px] text-regalblue font-quick-semibold-600 pt-4">
                  Cart Total: ${totalPrice?.toFixed(2)}
                </div>
                <div className="pt-4">
                  <button
                    className="text-white font-quick-medium-500 text-[16px] bg-shopbtn px-[12px] py-[6px] rounded-[5px]"
                    onClick={handleNavigation}
                  >
                    CheckOut
                  </button>
                </div>
              </aside>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
