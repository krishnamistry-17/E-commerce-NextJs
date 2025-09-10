"use client";

import { Products } from "@/types/product";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "@/app/pages/slice/cartSlice";
import Image from "next/image";
import home from "../public/svgs/home.svg";
import cart from "../public/svgs/whitecart.svg";
import whishlist from "../public/svgs/whishlist.svg";
import repeat from "../public/svgs/repeat.svg";
import right from "../public/svgs/right.svg";
import p1 from "../public/images/p1.png";
import p2 from "../public/images/p2.png";
import p3 from "../public/images/p3.png";
import category1 from "../public/svgs/category1.svg";
import category2 from "../public/svgs/category2.svg";
import category3 from "../public/svgs/category3.svg";
import category4 from "../public/svgs/category4.svg";
import category5 from "../public/svgs/category5.svg";

type Props = {
  product: Products;
};

const ProductDetailPage = ({ product }: Props) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("60g");

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCart = (item: Products) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        newPrice: item.newPrice,
        quantity: 1,
        image: item.image,
      })
    );
  };
  return (
    <div>
      <div className="w-full  border-b border-gray-200 py-[12px] xl:px-[143px] xs375:px-5">
        <div className="flex items-center gap-[12px]">
          <div className="flex items-center gap-[8px]">
            <Image src={home} alt="home" width={14} height={14} />
            <p className="text-[14px] text-shopbtn font-quick-semibold-600">
              Home
            </p>
            <Image src={right} alt="right" width={19} height={24} />
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] text-shopbtn font-quick-semibold-600">
              {product?.category}
            </p>
            <Image src={right} alt="right" width={19} height={24} />
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] text-bgbrown font-quick-semibold-600">
              {product?.title}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1640px] mx-auto xl:px-[143px] px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-[30px]">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section: Images */}
          <div className="flex-1 w-full flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full">
              <Image
                src={product?.image}
                alt="Main Product"
                width={500}
                height={500}
                unoptimized
                className="w-full h-auto object-contain rounded-[15px]"
              />
            </div>

            {/* Sub Images */}
            <div className="flex flex-wrap gap-4 justify-start">
              <Image
                src={p1}
                alt="p1"
                width={100}
                height={100}
                className="w-[80px] sm:w-[100px]"
              />
              <Image
                src={p2}
                alt="p2"
                width={100}
                height={100}
                className="w-[80px] sm:w-[100px]"
              />
              <Image
                src={p3}
                alt="p3"
                width={100}
                height={100}
                className="w-[80px] sm:w-[100px]"
              />
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div className="flex-1 w-full">
            <div className="pt-2 md:pt-[30px] flex flex-col gap-4">
              <p className="w-max py-[6px] text-center text-pinktag bg-bgpink font-quick-bold-700 text-[14px] rounded-[5px]">
                Sale Off
              </p>

              <h1 className="text-[22px] sm:text-[32px] xl:text-[40px] font-quick-bold-700 text-regalblue">
                {product?.title}
              </h1>

              <div className="flex items-center gap-2">
                <Image
                  src={product?.ratingimage}
                  alt="rating"
                  width={60}
                  height={20}
                  className="w-full"
                />
                <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                  {product?.rating}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-4 pt-2">
                <p className="text-[36px] sm:text-[48px] font-quick-bold-700 text-shopbtn">
                  {product?.newPrice}
                </p>
                <div>
                  <p className="text-[12px] font-quick-semibold-600 text-offertext">
                    26% Off
                  </p>
                  <p className="text-[20px] sm:text-[28px] text-bgbrown line-through">
                    {product?.oldPrice}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[16px] sm:text-[17px] font-lato-regular-400 text-bgbrown pt-2 max-w-[460px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                rem officia, corrupti reiciendis minima nisi modi.
              </p>

              {/* Size Selector */}
              <div className="pt-4">
                <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                  Size / Weight:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["50g", "60g", "80g", "100g", "150g"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-[10px] py-[7px] rounded-[5px] text-[14px] ${
                        selectedSize === size
                          ? "bg-shopbtn text-white"
                          : "bg-white border border-shopbtn text-bgbrown"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-wrap gap-3 items-center pt-4">
                <input
                  type="number"
                  value={product?.quantity}
                  min={1}
                  className="w-[90px] p-1 border-2 border-shopbtn rounded-[5px]"
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                />
                <button
                  className="bg-shopbtn py-3 px-6 flex items-center gap-2 text-white text-[16px] font-quick-bold-700 rounded-[5px]"
                  onClick={() => handleCart(product)}
                >
                  <Image src={cart} alt="cart" width={20} height={20} />
                  Add to cart
                </button>
                <div className="p-[16px] bg-white border border-bordercolor rounded-[5px]">
                  <Image src={whishlist} alt="wish" width={18} height={18} />
                </div>
                <div className="p-[16px] bg-white border border-bordercolor rounded-[5px]">
                  <Image src={repeat} alt="repeat" width={18} height={18} />
                </div>
              </div>

              {/* Sub Details */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div>
                  <p className="text-[13px] font-lato-regular-400 text-bgbrown">
                    Type: <span className="text-shopbtn">Organic</span>
                  </p>
                  <p className="text-[13px] font-lato-regular-400 text-bgbrown pt-2">
                    MFG: <span className="text-shopbtn">Jun 4, 2022</span>
                  </p>
                  <p className="text-[13px] font-lato-regular-400 text-bgbrown pt-2">
                    LIFE: <span className="text-shopbtn">70 days</span>
                  </p>
                </div>
                <div>
                  <p className="text-[13px] font-lato-regular-400 text-bgbrown">
                    SKU: <span className="text-shopbtn">FWM15VKT</span>
                  </p>
                  <p className="text-[13px] font-lato-regular-400 text-bgbrown pt-2">
                    Tags:{" "}
                    <span className="text-shopbtn">Snack, Organic, Brown</span>
                  </p>
                  <p className="text-[13px] font-lato-regular-400 text-bgbrown pt-2">
                    Stock:{" "}
                    <span className="text-shopbtn">8 Items In Stock</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="md:max-w-[344.95px] w-full h-fit p-5 border border-productborder shadow-md rounded-[15px]">
          <p className="text-[24px] font-quick-bold-700 text-regalblue pb-[20px]">
            Category
          </p>

          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div className="bg-progessbtn h-1.5 rounded-full dark:bg-shopbtn w-[23%]"></div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                img: category1,
                name: "Milks & Dairies",
                qty: "5",
              },
              {
                img: category2,
                name: "Clothing",
                qty: "6",
              },
              {
                img: category3,
                name: "Pet Foods",
                qty: "7",
              },
              {
                img: category4,
                name: "Baking material",
                qty: "12",
              },
              {
                img: category5,
                name: "Fresh Fruit",
                qty: "16",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border border-bggray rounded-[5px] p-3"
              >
                {/* Left: Image and name */}
                <div className="flex items-center gap-3">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={30}
                    height={30}
                  />
                  <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                    {item.name}
                  </p>
                </div>

                {/* Right: Quantity bubble */}
                <div className="w-[24px] h-[24px] rounded-full bg-cartbtn flex items-center justify-center">
                  <p className="text-[12px] text-regalblue font-lato-regular-400">
                    {item.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProductDetailPage;
