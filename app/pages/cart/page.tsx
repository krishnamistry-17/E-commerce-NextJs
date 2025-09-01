import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItem = useSelector((state) => state.cartItem);
  return <div>Cart</div>;
};

export default Cart;
