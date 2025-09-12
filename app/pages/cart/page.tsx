"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";
import { clearCart, removeFromCart, updateQuantity } from "../slice/cartSlice";
import { MdDelete } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Cart = () => {
  const dispatch = useDispatch();

  // Get all cart items from redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  //  Total price calculation
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
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

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[103px] px-2 pt-[55px]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-2xl font-bold"
        >
          Clear cart
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 py-10">
        <div className="flex-1">
          {cartItems?.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item?.id}
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
                      onClick={() => dispatch(removeFromCart(item?.id))}
                      className="cursor-pointer w-6 h-6 text-red-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/*  Cart Summary */}
        <aside className="md:max-w-[300px] lg:max-w-[350px] xl:max-w-[406px] w-full h-fit bg-productborder p-5 rounded-[20px]">
          <div className="text-xl font-bold pt-4">
            Cart Total: ${totalPrice?.toFixed(2)}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
