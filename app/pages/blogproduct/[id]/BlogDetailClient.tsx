// "use client";
// import React, { useEffect, useState } from "react";
// import axiosInstance from "@/lib/axios";
// import home from "../../../../public/svgs/home.svg";
// import right from "../../../../public/svgs/right.svg";
// import save from "../../../../public/svgs/save.svg";
// import whishlist from "../../../../public/svgs/whishlist.svg";
// import filter from "../../../../public/svgs/filter.svg";
// import { MdStar } from "react-icons/md";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// type BlogDetailClientProps = {
//   id: string;
// };

// const BlogDetailClient = ({ id }: BlogDetailClientProps) => {
//   const [data, setData] = useState(null);
//   const [allcategories, setAllCategories] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedProduct, setSelectedProduct] = useState([]);

//   const router = useRouter();

//   useEffect(() => {
//     if (allcategories.length > 0 && !selectedCategory) {
//       setSelectedCategory(allcategories[0]); // set default selected category
//     }
//   }, [allcategories, selectedCategory]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `https://dummyjson.com/recipes/${id}`
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error in fetching product", error);
//       }
//     };

//     const fetchAllData = async () => {
//       try {
//         const response = await axiosInstance.get(
//           "https://dummyjson.com/recipes"
//         );
//         const allRecipes = response.data.recipes;

//         const uniqueCategories = [
//           ...new Set(allRecipes.map((recipe) => recipe.cuisine)),
//         ];
//         setAllCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };

//     fetchData();
//     fetchAllData();
//   }, [id]);

//   const handleFiltered = async (category: string) => {
//     try {
//       const response = await axiosInstance.get(`https://dummyjson.com/recipes`);
//       const allRecipes = response.data.recipes;

//       const filtered = allRecipes.filter(
//         (recipe) => recipe?.cuisine === category
//       );
//       setSelectedProduct(filtered);
//     } catch (error) {
//       console.error("Error filtering recipes", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedCategory) {
//       handleFiltered(selectedCategory);
//     }
//   }, [selectedCategory]);

//   const handleNavigation = (id: string) => {
//     router.push(`/pages/blogproduct/${id}`);
//   };

//   return (
//     <>
//       <div className="w-full border-b border-gray-200 py-[12px] xl:px-[143px] xs375:px-5 px-3">
//         <div className="flex items-center gap-[12px]">
//           <div
//             className="flex items-center gap-[8px]"
//             onClick={() => router.push("/")}
//           >
//             <Image src={home} alt="home" width={14} height={14} />
//             <p className="text-[14px] text-shopbtn font-quick-semibold-600 md:block hidden cursor-pointer">
//               Home
//             </p>
//             <Image src={right} alt="right" width={19} height={24} />
//           </div>
//           <div
//             className="flex items-center gap-[8px]"
//             onClick={() => router.push("/pages/blog")}
//           >
//             <p className="text-[14px] text-shopbtn font-quick-semibold-600 cursor-pointer">
//               Blogs
//             </p>
//             <Image src={right} alt="right" width={19} height={24} />
//           </div>
//           <div className="flex items-center gap-[8px]">
//             <p className="text-[14px] text-bgbrown font-quick-semibold-600">
//               {data?.name}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1640px] mx-auto xl:px-[143px] px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-[30px] pt-[50px]">
//         <div>
//           <div className="flex flex-col pl-4 max-w-[897px] pb-[30px]">
//             <p className="text-[16px] font-quick-bold-700 text-shopbtn">
//               Recipes
//             </p>
//             <p className="xl:text-[40px] text-[32px] font-quick-bold-700 text-regalblue">
//               {data?.name}
//             </p>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-[5px]">
//                 <MdStar />
//                 <MdStar />
//                 <MdStar />
//                 <MdStar />
//                 <p className="text-[16px] font-quick-semibold-600 text-bgbrown">
//                   {data?.rating}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Image src={save} alt="save" width={14} height={24} />
//                 <Image src={whishlist} alt="whishlist" width={14} height={24} />
//               </div>
//             </div>
//           </div>
//           <div className="px-4 sm:px-6 lg:px-0">
//             <div className="w-full max-w-[1052px] mx-auto">
//               <Image
//                 src={data?.image}
//                 alt={data?.name}
//                 width={1052}
//                 height={290}
//                 unoptimized
//                 className="w-full h-auto object-contain rounded-[15px]"
//               />
//             </div>
//           </div>

//           <div className="mx-auto md:px-5 px-2 pt-[55px]">
//             <p className="md:text-[24px] text-[18px] font-lato-regular-400 text-regalblue">
//               Helping everyone live happier, healthier lives at home through
//               their kitchen. Kitchn is a daily food magazine on the Web
//               celebrating life in the kitchen through home cooking and kitchen
//               intelligence.
//             </p>
//             <p className="text-[19px] font-lato-regular-400 text-bgbrown pt-2">
//               Here is the Recipe and ingredients to make this dish.
//             </p>
//             <h2 className="text-[18px] font-quick-bold-700 mt-4 mb-2">
//               Ingredients:
//             </h2>
//             <ul className="list-disc list-inside space-y-1">
//               {data?.ingredients?.map((ingredient: string, index: number) => (
//                 <li key={index}>{ingredient}</li>
//               ))}
//             </ul>

//             <h2 className="text-[18px] font-quick-bold-700 mt-4 mb-2">
//               Instructions:
//             </h2>
//             <ol className="list-decimal list-inside space-y-2">
//               {data?.instructions?.map((step: string, index: number) => (
//                 <li key={index}>{step}</li>
//               ))}
//             </ol>
//             <div className="mt-4 border-b border-bordercolor">
//               <p className="text-[16px] text-regalblue font-quick-bold-700 space-y-2">
//                 Preparation Time: {data?.prepTimeMinutes} minutes
//               </p>
//               <p className="text-[16px] text-regalblue font-quick-bold-700 space-y-2">
//                 Cooking Time: {data?.cookTimeMinutes} minutes
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-6 md:max-w-[344.95px] w-full">
//           {/* Category section */}
//           <div className="w-full h-fit p-5 border border-productborder shadow-md rounded-[15px]">
//             <p className="text-[24px] font-quick-bold-700 text-regalblue pb-3">
//               Category
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-[3px] mb-4 dark:bg-gray-700">
//               <div className="bg-progessbtn h-[3px] rounded-full dark:bg-shopbtn w-[23%]"></div>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {allcategories.map((category, index) => {
//                 const selected = selectedCategory === category;
//                 return (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
//                       selected
//                         ? "bg-shopbtn text-white border-shopbtn"
//                         : "bg-white text-bgbrown border-gray-300 hover:bg-gray-100"
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="pt-[19px]">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <button
//                     className="text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px]
//                              py-[12px] px-[26px] flex items-center gap-[9px]"
//                     onClick={() => handleFiltered(selectedCategory)}
//                   >
//                     <Image src={filter} alt="filter" width={20} height={20} />
//                     Filter
//                   </button>
//                 </div>
//                 <button
//                   className="ml-2 text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px]
//              py-[12px] px-[16px]"
//                   onClick={() => {
//                     setSelectedProduct([]);
//                   }}
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Selected Product section */}
//           <div className="w-full h-fit p-5 border border-productborder shadow-md rounded-[15px]">
//             <p className="text-[24px] font-quick-bold-700 text-regalblue pb-3">
//               Selected products
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-[3px] mb-4 dark:bg-gray-700">
//               <div className="bg-progessbtn h-[3px] rounded-full dark:bg-shopbtn w-[23%]"></div>
//             </div>
//             <div>
//               {selectedProduct?.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-[15px] pt-[10px] cursor-pointer"
//                   onClick={() => handleNavigation(item?.id)}
//                 >
//                   <div>
//                     <Image
//                       src={item.image}
//                       alt="image"
//                       width={50}
//                       height={50}
//                       unoptimized
//                       className="object-contain w-[50px] h-[50px]"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="text-[20px] font-quick-bold-700 text-shopbtn">
//                       {item?.name}
//                     </p>
//                     <p className="text-[16px] font-lato-regular-400 text-bgbrown">
//                       {item?.cuisine}
//                     </p>
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

// export default BlogDetailClient;
