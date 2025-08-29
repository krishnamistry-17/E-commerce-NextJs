import React from 'react'

const Cart = () => {
  return (
    <div>Cart</div>
  )
}

export default Cart


// ecommerce-store/
// ├── components/
// │   ├── Header.tsx
// │   ├── Footer.tsx
// │   ├── ProductCard.tsx
// │   ├── CartDrawer.tsx
// ├── context/
// │   └── CartContext.tsx
// ├── data/
// │   └── products.ts
// ├── pages/
// │   ├── index.tsx
// │   ├── product/
// │   │   └── [id].tsx
// │   ├── cart.tsx
// │   └── checkout.tsx
// ├── styles/
// │   └── globals.css
// ├── types/
// │   └── product.ts
// ├── tailwind.config.js
// ├── tsconfig.json
// └── next.config.js
// import { useCart } from '../../context/CartContext';
// import Link from 'next/link';

// export default function CartPage() {
//   const { cart, removeFromCart } = useCart();

//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (cart.length === 0) {
//     return (
//       <div className="container mx-auto py-10 text-center">
//         <h1 className="text-2xl font-semibold mb-4">Your cart is empty.</h1>
//         <Link href="/">
//           <a className="text-blue-600 hover:underline">Go back to shopping</a>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

//       <div className="space-y-6">
//         {cart.map((item) => (
//           <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-24 h-24 object-cover rounded"
//             />
//             <div className="flex-1">
//               <h2 className="text-lg font-semibold">{item.title}</h2>
//               <p className="text-gray-600">
//                 ${item.price.toFixed(2)} × {item.quantity}
//               </p>
//               <p className="font-semibold mt-1">
//                 Total: ${(item.price * item.quantity).toFixed(2)}
//               </p>
//             </div>
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="text-red-600 hover:text-red-800"
//               aria-label={`Remove ${item.title} from cart`}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-10 flex justify-between items-center">
//         <p className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
//         <Link href="/checkout">
//           <a className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
//             Proceed to Checkout
//           </a>
//         </Link>
//       </div>
//     </div>
//   );
// }
