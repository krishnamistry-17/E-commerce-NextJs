"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import home from "../../../public/svgs/home.svg";
import right from "../../../public/svgs/right.svg";
import cart from "../../../public/svgs/whitecart.svg";
import whishlist from "../../../public/svgs/whishlist.svg";
import repeat from "../../../public/svgs/repeat.svg";
import filter from "../../../public/svgs/filter.svg";
import Image from "next/image";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineFavorite } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
import Relatedproducts from "../relatedproducts";
import Banner from "@/app/pages/banner/page";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "@/app/pages/slice/cartSlice";
import { handleCart } from "@/utils/cartHelpers";

const ProductDetail = () => {
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<any>(null);
  const [wishList, setWishList] = useState<any>(null);
  const dispatch = useDispatch();

  const params = useParams();
  const router = useRouter();
  const [value, setValue] = useState(150);
  const [quantity, setQuantity] = useState(1);
  const [isWishClick, setIsWishClick] = useState(false);
  const [clickedFavIds, setClickedFavIds] = useState<Set<string>>(new Set());
  const productId = params?.productId as string;

  const clickedCartIds = useSelector((state: any) => state.cart.clickedCartIds);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axiosInstance.get(
          apiRoutes.VIEW_PRODUCT_DETAILS(productId)
        );

        setProduct(res.data.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        toast.error("Could not fetch product details. Please try again.");
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(apiRoutes.GET_ALL_CATEGORY);
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
    fetchProducts();
  }, [productId]);

  const handleWishList = async () => {
    if (clickedFavIds.has(productId)) {
      toast.info("Product already exists in favorites");
      return;
    }
    try {
      const res = await axiosInstance.post(
        apiRoutes.ADD_PRODUCT_FAVORITES(productId)
      );
      setWishList(res.data.data);

      setIsWishClick(true);
      if (res.status === 200 || res.data.success) {
        toast.success("Added to Favorites successfully!");
        setClickedFavIds((prev) => new Set(prev).add(productId));
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      toast.error("Product already exists in favorites");
    }
  };

  if (!product) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div>
      <div className="w-full  border-b border-gray-200 py-[12px] xl:px-[143px] xs375:px-5 px-2">
        <div className="flex items-center gap-[12px]">
          <div
            className="flex items-center gap-[8px]"
            onClick={() => router.push("/")}
          >
            <Image src={home} alt="home" width={14} height={14} />
            <p className="text-[14px] text-shopbtn font-quick-semibold-600 md:block hidden cursor-pointer">
              Home
            </p>
            <Image src={right} alt="right" width={19} height={24} />
          </div>
          <div
            className="flex items-center gap-[8px]"
            onClick={() => router.push("/")}
          >
            <p className="text-[14px] text-shopbtn font-quick-semibold-600 cursor-pointer">
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
      <div className="max-w-[1640px] mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-[30px]">
        <div>
          <div className="flex flex-wrap flex-col md:flex-row gap-6">
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
              {/* <div className="flex flex-wrap gap-4 justify-start">
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
              </div> */}
            </div>

            {/* Right Section: Product Details */}
            <div className="flex-1 w-full">
              <div className="pt-2 md:pt-[30px] flex flex-col gap-4">
                <p className="w-max py-[6px] px-[8px] text-center text-pinktag bg-bgpink font-quick-bold-700 text-[14px] rounded-[5px]">
                  Sale Off
                </p>

                <h1 className="text-[22px] sm:text-[32px] xl:text-[40px] font-quick-bold-700 text-regalblue">
                  {product?.productName}
                </h1>

                {/* <div className="flex items-center gap-2">
                  <Image
                    src={product?.ratingimage}
                    alt="rating"
                    width={60}
                    height={20}
                  />
                  <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                    {product?.rating}
                  </p>
                </div> */}

                {/* Pricing */}
                <div className="flex items-center gap-4 pt-2">
                  <p className="text-[36px] sm:text-[40px] font-quick-bold-700 text-shopbtn">
                    ₹{product?.price}
                  </p>
                </div>

                <div>
                  <p className="text-lg font-quick-bold-700 text-regalblue">
                    In Stock: {product?.stock}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[16px] sm:text-[17px] font-lato-regular-400 text-bgbrown pt-2 max-w-[460px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam rem officia, corrupti reiciendis minima nisi modi.
                </p>

                {/* Size Selector */}
                {/* <div className="pt-4">
                  <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                    Size / Weight:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["50g", "60g", "80g", "100g", "150g"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-[10px] py-[7px] rounded-[5px] text-[14px] ₹{
                          selectedSize === size
                            ? "bg-shopbtn text-white"
                            : "bg-white border border-shopbtn text-bgbrown"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div> */}

                {/* Quantity & Actions */}
                <div className="flex flex-wrap gap-3 items-center pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newQty = quantity - 1;
                        if (newQty >= 1) {
                          setQuantity(newQty);
                          dispatch(
                            updateQuantity({
                              id: productId,
                              quantity: Math.max(1, newQty - 1),
                            })
                          );
                        }
                      }}
                    >
                      <FaMinus className="text-shopbtn" />
                    </button>

                    <span className="px-2 text-[16px] text-bgbrown font-quick-semibold-600">
                      {quantity}
                    </span>

                    <button
                      onClick={() => {
                        const newQty = quantity + 1;
                        setQuantity(newQty);
                        dispatch(
                          updateQuantity({
                            id: productId,
                            quantity: Math.max(1, newQty + 1),
                          })
                        );
                      }}
                    >
                      <FaPlus className="text-shopbtn" />
                    </button>
                  </div>

                  <button
                    className="bg-shopbtn py-3 px-6 flex items-center gap-2 text-white text-[16px] font-quick-bold-700 rounded-[5px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCart(product, clickedCartIds, dispatch);
                    }}
                  >
                    {clickedCartIds?.includes(productId) ? (
                      <IoCheckmarkOutline className="text-white" />
                    ) : (
                      <Image src={cart} alt="cart" width={20} height={20} />
                    )}
                    Add to cart
                  </button>
                  <div
                    className="p-[16px] bg-white border border-bordercolor rounded-[5px]"
                    onClick={() => handleWishList()}
                  >
                    {isWishClick ? (
                      <MdOutlineFavorite />
                    ) : (
                      <Image
                        src={whishlist}
                        alt="wish"
                        width={18}
                        height={18}
                      />
                    )}
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
                      <span className="text-shopbtn">
                        Snack, Organic, Brown
                      </span>
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
        </div>

        <div className="flex flex-col gap-6 md:max-w-[344.95px] w-full">
          {/* Category Section */}
          <div className="w-full h-fit p-5 border border-productborder shadow-md rounded-[15px]">
            <p className="text-[24px] font-quick-bold-700 text-regalblue pb-[20px]">
              Category
            </p>

            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
              <div className="bg-progessbtn h-1.5 rounded-full dark:bg-shopbtn w-[23%]"></div>
            </div>

            <div className="flex flex-col gap-4">
              {categories?.map((cat: any, index: number) => (
                <div key={index} className="flex flex-col gap-2">
                  {/* Category title */}
                  <p className="text-[16px] font-quick-bold-700 text-regalblue">
                    {cat.category}
                  </p>

                  {/* Products in the category */}
                  {cat.categoryProduct?.map((product: any) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between border border-bggray rounded-[5px] p-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={product?.image || "/placeholder.png"}
                          alt={product?.productName}
                          width={30}
                          height={30}
                          className="rounded-full object-cover"
                        />
                        <p className="text-[14px] font-lato-regular-400 text-bgbrown capitalize">
                          {product?.productName}
                        </p>
                      </div>

                      <div className="w-[24px] h-[24px] p-[20px] rounded-full bg-cartbtn flex items-center justify-center">
                        <p className="text-[12px] text-regalblue font-lato-regular-400">
                          {product?.stock}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/*  Price seciton */}
          <div className="w-full h-fit p-5 border border-productborder shadow-md rounded-[15px]">
            <p className="text-[24px] font-quick-bold-700 text-regalblue pb-3">
              Fill by price
            </p>
            <div className="w-full bg-gray-200 rounded-full h-[3px] mb-4 dark:bg-gray-700">
              <div className="bg-progessbtn h-[3px] rounded-full dark:bg-shopbtn w-[23%]"></div>
            </div>

            <div className="relative mb-6">
              <input
                type="range"
                value={value}
                min="100"
                max="1000"
                onChange={handleChange}
                color="#3BB77E"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-[14px] text-bgbrown font-lato-regular-400  absolute start-0 -bottom-6">
                From <span className="text-shopbtn">₹500</span>
              </span>
              <span className="text-[14px] text-bgbrown font-lato-regular-400  absolute end-0 -bottom-6">
                To <span className="text-shopbtn">₹1000</span>
              </span>
            </div>
            <div className="pt-[14px]">
              <div className="flex flex-col gap-4">
                {categories?.map((cat: any, index: number) => (
                  <div key={index} className="flex flex-col gap-2">
                    {/* Products in the category */}
                    {cat.categoryProduct?.map((product: any) => (
                      <div
                        key={product._id}
                        className="flex items-center justify-between border border-bggray rounded-[5px] p-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => router.push(`/product/₹{product._id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={product?.image || "/placeholder.png"}
                            alt={product?.productName}
                            width={30}
                            height={30}
                            className="rounded-full object-cover"
                          />
                          <p className="text-[14px] font-lato-regular-400 text-bgbrown capitalize">
                            {product?.productName}
                          </p>
                        </div>

                        <div className="w-[24px] h-[24px] p-[20px] rounded-full bg-cartbtn flex items-center justify-center">
                          <p className="text-[12px] text-regalblue font-lato-regular-400">
                            ₹{product?.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-[19px]">
              <div className="flex items-center justify-between">
                <div>
                  <button
                    className="text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px]
                   py-[12px] px-[26px] flex items-center gap-[9px]"
                    // onClick={handleFiltered}
                  >
                    <Image src={filter} alt="filter" width={20} height={20} />
                    Fillter
                  </button>
                </div>
                <button
                  className="ml-2 text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px]
   py-[12px] px-[16px]"
                  // onClick={() => {
                  //   setSelectedProduct([]);
                  // }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[60px] xl:px-[80px] lg:px-4 px-2">
        <Relatedproducts />
      </div>
      <div className="xl:px-[80px] px-2">
        <Banner />
      </div>
    </div>
  );
};

export default ProductDetail;
