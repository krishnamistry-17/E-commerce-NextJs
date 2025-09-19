import axiosInstance from "@/lib/axios";
import { RelatedProducts } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../pages/slice/cartSlice";
import { showDetails } from "../pages/slice/productDetailSlice";

const Relatedproducts = () => {
  const [product, setProduct] = useState<RelatedProducts[]>([]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get<RelatedProducts[]>(
          "/PopularProducts"
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const categoriesWiseTag: Record<string, string> = {
    Hot: "bg-pinktag",
    Sale: "bg-bluetag",
    New: "bg-shopbtn",
    "-14%": "bg-orangetag",
  };

  const handleCart = (item: RelatedProducts) => {
    dispatch(
      addToCart({
        id: item?.id,
        title: item?.title,
        newPrice: item?.newPrice,
        quantity: 1,
        image: item?.image,
        size: item?.size,
      })
    );
  };

  const handleDetails = (item: RelatedProducts) => {
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
    router.push(`/product/${item?.id}`);
  };

  return (
    <div
      className="max-w-[1082.86px] 
     rounded-[15px] xl:py-[41px]  py-5"
    >
      <p className="text-[32px] font-quick-bold-700 text-regalblue pb-4">
        Related Product
      </p>
      <div className="w-full bg-gray-200 rounded-full h-[3px] mb-4 dark:bg-gray-700">
        <div className="bg-progessbtn h-[3px] rounded-full dark:bg-shopbtn w-[23%]"></div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 pt-8">
        {product?.map((item, index) => (
          <div
            key={index}
            className="rounded-[15px] border border-productborder relative cursor-pointer"
            onClick={() => handleDetails(item)}
          >
            <div className="absolute top-0">
              <p
                className={`w-[60px] h-[31px] text-white text-center text-xs py-[7px] rounded-tl-full rounded-tr-[8px] rounded-bl-[16px] rounded-br-full ${
                  categoriesWiseTag[item?.tag]
                }`}
              >
                {item?.tag}
              </p>
            </div>
            <Image
              src={item?.image}
              alt={item?.category}
              className="pt-6 px-6 w-full"
              width={25}
              height={25}
              unoptimized
            />
            <div className="px-6 pb-6">
              <p className="text-sm text-graytext">{item?.category}</p>
              <p className="text-lg font-bold text-regalblue pt-2">
                {item?.title}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Image
                  src={item?.ratingimage}
                  alt="rating"
                  width={25}
                  height={25}
                  unoptimized
                  className="  w-[60px]"
                />
                <p className="text-sm text-ratingtext">{item?.rating}</p>
              </div>
              <p className="text-sm text-ratingtext pt-2">
                By <span className="text-shopbtn">{item?.by}</span>
              </p>
              <div className="flex justify-between items-center pt-4">
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

                <div
                  className="flex items-center bg-cartbtn px-3 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCart(item);
                  }}
                >
                  <Image
                    src={item?.cartimage}
                    alt="cart"
                    width={25}
                    height={25}
                    unoptimized
                    className="  w-full"
                  />
                  <button className="text-sm font-bold text-shopbtn ml-1">
                    {item?.cart}
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

export default Relatedproducts;
