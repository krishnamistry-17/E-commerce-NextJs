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
