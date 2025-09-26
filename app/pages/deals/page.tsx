// "use client";

// import { DealsHeading, DailyDeals } from "@/types/product";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import next from "../../../public/svgs/next.svg";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../slice/cartSlice";
// import axiosInstance from "@/lib/axios";
// import { showDetails } from "../slice/productDetailSlice";
// import { useRouter } from "next/navigation";
// import { IoCheckmarkOutline } from "react-icons/io5";
// import { toast } from "react-toastify";

// const DealsDay = () => {
//   const [product, setProducts] = useState<DailyDeals[]>([]);
//   const [heading, setHeadings] = useState<DealsHeading[]>([]);
//   const [selectedSize, setSelectedSize] = useState<number | null>(null);
//   const [clickedCartIds, setClickedCartIds] = useState<Set<number>>(new Set());
//   const dispatch = useDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axiosInstance.get<DailyDeals[]>("/dailydeals");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products", error);
//       }
//     };
//     const fetchProductsHeading = async () => {
//       try {
//         const res = await axiosInstance.get<DealsHeading[]>("/dealsheading");
//         setHeadings(res.data);
//       } catch (error) {
//         console.error("Error fetching products", error);
//       }
//     };
//     fetchProducts();
//     fetchProductsHeading();
//   }, []);

//   const hnadleCart = (item: DailyDeals) => {
//     dispatch(
//       addToCart({
//         id: item?.id,
//         title: item?.title,
//         newPrice: item?.newPrice,
//         quantity: 1,
//         image: item?.image,
//         size: item?.size,
//       })
//     );
//     // Add this item ID to clicked cart IDs
//     setClickedCartIds((prev) => new Set(prev).add(item?.id));
//     toast.success("Item added to cart");
//   };

//   const handleDetails = (item: DailyDeals) => {
//     dispatch(
//       showDetails({
//         id: item?.id,
//         title: item?.title,
//         newPrice: item?.newPrice,
//         image: item?.image,
//         ratingimage: item?.ratingimage,
//         rating: item?.rating,
//         oldPrice: item?.oldPrice,
//         category: item?.category,
//         size: item?.size,
//       })
//     );
//     router.push(`/product/${item?.id}`);
//   };

//   return (
//     <>
//       <div className="py-[50px] ">
//         <div className="flex flex-col">
//           <div className="md:flex justify-between items-center">
//             <div>
//               <p className="lg:text-[32px] text-[27px] text-regalblue font-quick-bold-700">
//                 Deals Of The Day
//               </p>
//             </div>
//             <div>
//               <p
//                 className="lg:text-[16px] xs375:text-[13px] text-[16px] pt-[18px]
//                 font-quick-semibold-600 text-regalblue 
//                 md:flex hidden items-center justify-between gap-[19.63px]
//                 "
//               >
//                 {heading?.map((item, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="cursor-pointer pt-2 xs375:pt-0 pl-[29px] xs375:pl-0 text-regalblue flex items-center gap-2"
//                     >
//                       {item?.title}
//                       <span>
//                         <Image
//                           src={next}
//                           alt="next"
//                           width={25}
//                           height={25}
//                           unoptimized
//                           className="  w-full"
//                         />
//                       </span>
//                     </div>
//                   );
//                 })}
//               </p>
//             </div>
//           </div>
//           <div className="pt-[43px]">
//             <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
//               {product?.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center"
//                   onClick={() => handleDetails(item)}
//                 >
//                   <div className="w-full">
//                     <Image
//                       src={item?.image}
//                       alt="image"
//                       width={25}
//                       height={25}
//                       unoptimized
//                       className="w-full h-auto object-cover"
//                     />
//                   </div>

//                   <div
//                     className="mt-[-50px] z-10 rounded-[10px] border border-productborder bg-white 
//           w-[90%] sm:w-[85%] md:w-[90%] xl:w-[268px] shadow-md p-4"
//                   >
//                     <div className="flex flex-col">
//                       <p className="text-[16px] font-quick-bold-700 text-regalblue pt-2">
//                         {item?.title}
//                       </p>

//                       <div className="text-[14px] font-lato-regular-400 text-ratingtext pt-2 flex items-center">
//                         <Image
//                           src={item?.ratingimage}
//                           alt="rating"
//                           width={25}
//                           height={25}
//                           unoptimized
//                           className="  w-[60px]"
//                         />
//                         <span className="text-shopbtn pl-1">
//                           {item?.rating}
//                         </span>
//                       </div>

//                       <p className="text-[14px] font-lato-regular-400 text-ratingtext pt-2">
//                         By
//                         <span className="text-shopbtn pl-1">{item?.by}</span>
//                       </p>

//                       <div className="flex justify-between items-center pt-4">
//                         {/* Prices */}
//                         <div>
//                           <p className="text-[18px] font-quick-bold-700 text-shopbtn">
//                             {item?.newPrice}
//                             <span className="text-[14px] text-ratingtext pl-2 line-through">
//                               {item?.oldPrice}
//                             </span>
//                           </p>
//                         </div>

//                         {/* Size Selector */}
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedSize(item?.size);
//                           }}
//                           className={`px-[10px] py-[7px] rounded-[5px] text-[14px] ${
//                             selectedSize === item?.size
//                               ? "bg-shopbtn text-white"
//                               : "bg-white border border-shopbtn text-bgbrown"
//                           }`}
//                         >
//                           {item?.size}g
//                         </button>

//                         {/* Cart Button */}
//                         <div
//                           className="flex items-center gap-2 bg-cartbtn rounded-[4px] px-3 py-2 cursor-pointer"
//                           onClick={(e) => {
//                             hnadleCart(item);
//                             e.stopPropagation();
//                           }}
//                         >
//                           {clickedCartIds.has(item?.id) ? (
//                             <IoCheckmarkOutline className="text-shopbtn" />
//                           ) : (
//                             <Image
//                               src={item?.cartimage}
//                               alt="cart"
//                               width={25}
//                               height={25}
//                               unoptimized
//                               className="w-5"
//                             />
//                           )}
//                           <button className="text-[14px] font-lato-bold-700 text-shopbtn">
//                             {item?.cart}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DealsDay;


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page