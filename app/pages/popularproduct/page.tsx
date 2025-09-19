"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PopularProductHeadings, PopularProducts } from "@/types/product";
import { addToCart } from "../slice/cartSlice";
import { showDetails } from "../slice/productDetailSlice";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { IoCheckmarkOutline } from "react-icons/io5";
import drop from "../../../public/svgs/drop.svg";

const PopularProduct = () => {
  const [data, setData] = useState([]);
  const [product, setProducts] = useState<PopularProducts[]>([]);
  const [heading, setHeadings] = useState<PopularProductHeadings[]>([]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(heading[0]?.title || "All");
  const [clickedCartIds, setClickedCartIds] = useState<Set<number>>(new Set());
  const [categoryMenu, setCategoryMenu] = useState(false);
  const toggleCategoryMenu = () => setCategoryMenu((prev) => !prev);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get<PopularProducts[]>(
          "/popluarproducts"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    const fetchProductsHeading = async () => {
      try {
        const res = await axiosInstance.get<PopularProductHeadings[]>(
          "/popularproductheadings"
        );
        setHeadings(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
    fetchProductsHeading();
  }, []);

  const categoriesWiseTag: Record<string, string> = {
    Hot: "bg-pinktag",
    Sale: "bg-bluetag",
    New: "bg-shopbtn",
    "-14%": "bg-orangetag",
  };

  const filteredProduct =
    activeTab === "All"
      ? product
      : product?.filter((products) => products?.category === activeTab);

  const handleCart = (item: PopularProducts) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        newPrice: item.newPrice,
        quantity: 1,
        image: item?.image,
        size: item?.size,
      })
    );
    // Add this item ID to clicked cart IDs
    setClickedCartIds((prev) => new Set(prev).add(item?.id));
    toast.success("Item added to cart");
  };

  const handleDetails = (item: PopularProducts) => {
    dispatch(
      showDetails({
        id: item?.id,
        title: item?.title,
        newPrice: item?.newPrice,
        image: item?.image,
        ratingimage: item?.ratingimage,
        rating: item?.rating,
        oldPrice: item?.oldPrice,
        category: item?.category,
        size: item?.size,
      })
    );

    router.push(`/product/${item.id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="md:flex hidden justify-between items-center">
        <p className="lg:text-[32px] text-[27px] text-regalblue font-quick-bold-700">
          Popular Products
        </p>
        <div className="sm:flex gap-4 pt-4 md:pt-0">
          {heading?.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(item.title)}
              className={`cursor-pointer pt-2 xs375:pt-0  pl-[29px] xs375:pl-0 ${
                activeTab === item.title ? "text-shopbtn" : "text-regalblue"
              }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden justify-between items-center">
        <p className="lg:text-[32px] text-[27px] text-regalblue font-quick-bold-700 pb-4">
          Popular Products
        </p>
        {/* Dropdown trigger */}
        <div
          className="flex items-center justify-between w-full bg-white py-2 px-4 
                       rounded-[50px] border border-gray-400 cursor-pointer"
          onClick={toggleCategoryMenu}
        >
          <p className={`${activeTab ? "text-shopbtn" : "text-regalblue"}`}>
            {activeTab}
          </p>
          <Image
            src={drop}
            alt="Dropdown Icon"
            height={30}
            width={30}
            className="mr-2 ml-3"
          />
        </div>

        {/* Dropdown menu */}
        {categoryMenu && (
          <div className="mt-2 bg-white border border-gray-400 rounded-[20px] p-2">
            {heading?.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveTab(item.title);
                  setCategoryMenu(false);
                }}
                className={`cursor-pointer py-2 px-4 rounded-[10px] ${
                  activeTab === item.title
                    ? "text-shopbtn font-bold"
                    : "text-regalblue"
                } hover:bg-gray-100`}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 pt-8">
        {filteredProduct?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full rounded-[15px] border border-productborder relative cursor-pointer"
            onClick={() => handleDetails(item)}
          >
            {/* Tag */}
            <div className="absolute top-0">
              <p
                className={`w-[60px] h-[31px] text-white text-center text-xs py-[7px] rounded-tl-full rounded-tr-[8px] rounded-bl-[16px] rounded-br-full ${
                  categoriesWiseTag[item?.tag]
                }`}
              >
                {item?.tag}
              </p>
            </div>

            {/* Image */}
            <Image
              src={item.image}
              alt={item.category}
              className="pt-6 px-6 w-full"
              width={25}
              height={25}
              unoptimized
            />

            {/* Product Info */}
            <div className="px-6 pb-6 flex flex-col flex-grow">
              <p className="text-sm text-graytext">{item?.category}</p>
              <p className="text-lg font-bold text-regalblue pt-2">
                {item?.title}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <Image
                  src={item.ratingimage}
                  alt="rating"
                  width={25}
                  height={25}
                  unoptimized
                  className="w-[60px]"
                />
                <p className="text-sm text-ratingtext">{item?.rating}</p>
              </div>

              <p className="text-sm text-ratingtext pt-2">
                By <span className="text-shopbtn">{item?.by}</span>
              </p>

              {/*  Bottom Sticky Section */}
              <div className="flex justify-between items-center pt-4 mt-auto">
                {/* Price */}
                <div>
                  <p className="text-lg font-bold text-shopbtn">
                    {item?.newPrice}
                    <span className="text-sm text-ratingtext pl-2 line-through">
                      {item?.oldPrice}
                    </span>
                  </p>
                </div>

                {/* Size Selector */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(item?.size);
                  }}
                  className={`px-[10px] py-[7px] rounded-[5px] text-[14px] ${
                    selectedSize === item?.size
                      ? "bg-shopbtn text-white"
                      : "bg-white border border-shopbtn text-bgbrown"
                  }`}
                >
                  {item?.size}g
                </button>

                {/* Cart */}
                <div
                  className="flex items-center bg-cartbtn px-3 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCart(item);
                  }}
                >
                  {clickedCartIds.has(item?.id) ? (
                    <IoCheckmarkOutline className="text-shopbtn" />
                  ) : (
                    <Image
                      src={item?.cartimage}
                      alt="cart"
                      width={25}
                      height={25}
                      unoptimized
                      className="w-5"
                    />
                  )}
                  <button className="text-sm font-bold text-shopbtn ml-1">
                    {item.cart}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProduct;
