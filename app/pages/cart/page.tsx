"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  console.log("cartItems :", cartItems);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
    0
  );

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[103px] px-2 pt-[55px]">
      <h2 className="text-2xl font-bold ">Shopping Cart</h2>
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 lg:gap-6 xl:gap-[35px] py-10">
        <div className="flex-1">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-300 shadow-md p-4 rounded-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ${item.newPrice?.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">
                      Total: ${(item.newPrice * item.quantity)?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <aside className="md:max-w-[300px] lg:max-w-[350px] xl:max-w-[406px]  w-full h-fit bg-productborder p-5 rounded-[20px]">
          <div className="text-xl font-bold pt-4">
            Cart Total: ${totalPrice?.toFixed(2)}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
