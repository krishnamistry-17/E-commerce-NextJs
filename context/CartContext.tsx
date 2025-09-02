// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface CartItem {
//   id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image?: string;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<CartItem>) {
//       const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
//       if (itemIndex >= 0) {
//         // If item already exists, increase quantity
//         state.items[itemIndex].quantity += action.payload.quantity;
//       } else {
//         // Add new item
//         state.items.push(action.payload);
//       }
//     },
//     removeFromCart(state, action: PayloadAction<string>) {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
//       const item = state.items.find(item => item.id === action.payload.id);
//       if (item && action.payload.quantity > 0) {
//         item.quantity = action.payload.quantity;
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
// import { Provider } from 'react-redux';
// import { store } from '../store'; // Adjust path accordingly
// import type { AppProps } from 'next/app';

// export default function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../store/cartSlice'; // Adjust path accordingly

// const dispatch = useDispatch();

// const handleAddToCart = (item: DailySells) => {
//   dispatch(
//     addToCart({
//       id: item.id,
//       title: item.title,
//       price: item.newPrice, // assuming newPrice is number, else parse it
//       quantity: 1,
//       image: item.image,
//     })
//   );
// };

// // Inside your JSX, replace the button with:
// <button
//   onClick={() => handleAddToCart(item)}
//   className="text-[14px] font-lato-bold-700 text-shopbtn "
// >
//   {item.cart}
// </button>
// "use client";
// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
// import Link from "next/link";
// import Image from "next/image";
// import cartIcon from "@/assets/icons/cart.svg"; // Adjust path as needed

// const CartIcon = () => {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <Link href="/cart">
//       <div className="relative cursor-pointer">
//         <Image src={cartIcon} alt="Cart" width={24} height={24} />
//         {totalQuantity > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//             {totalQuantity}
//           </span>
//         )}
//       </div>
//     </Link>
//   );
// };

// export default CartIcon;
// // app/cart/page.tsx
// "use client";
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/store";
// import { removeFromCart, updateQuantity, clearCart } from "../slice/cartSlice";

// const CartPage = () => {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handleQuantityChange = (id: string, quantity: number) => {
//     if (quantity > 0) {
//       dispatch(updateQuantity({ id, quantity }));
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-600">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-6">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center border p-4 rounded-md"
//             >
//               <div>
//                 <p className="text-lg font-semibold">{item.title}</p>
//                 <p>Price: ${item.price.toFixed(2)}</p>
//                 <div className="flex items-center mt-2">
//                   <label className="mr-2">Qty:</label>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     min={1}
//                     className="w-16 p-1 border rounded"
//                     onChange={(e) =>
//                       handleQuantityChange(item.id, Number(e.target.value))
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="font-bold">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </p>
//                 <button
//                   onClick={() => dispatch(removeFromCart(item.id))}
//                   className="text-red-600 hover:underline mt-2 block"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div className="pt-4">
//             <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
//             <button
//               onClick={() => dispatch(clearCart())}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
// import Link from "next/link";

// <Link href="/cart">
//   <button className="bg-shopbtn text-white px-4 py-2 rounded">View Cart</button>
// </Link>
