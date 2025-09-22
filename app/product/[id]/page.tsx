"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import home from "../../../public/svgs/home.svg";
import cart from "../../../public/svgs/whitecart.svg";
import whishlist from "../../../public/svgs/whishlist.svg";
import repeat from "../../../public/svgs/repeat.svg";
import Image from "next/image";
import right from "../../../public/svgs/right.svg";
import p1 from "../../../public/images/p1.png";
import p2 from "../../../public/images/p2.png";
import p3 from "../../../public/images/p3.png";
import category1 from "../../../public/svgs/category1.svg";
import category2 from "../../../public/svgs/category2.svg";
import category3 from "../../../public/svgs/category3.svg";
import category4 from "../../../public/svgs/category4.svg";
import category5 from "../../../public/svgs/category5.svg";
import filter from "../../../public/svgs/filter.svg";
import { useEffect, useState } from "react";
import { addToCart, updateQuantity } from "@/app/pages/slice/cartSlice";
import { AllProducts, Products } from "@/types/product";
import axiosInstance from "@/lib/axios";
import Description from "../description";
import Relatedproducts from "../relatedproducts";
import Banner from "@/app/pages/banner/page";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { addToWishList } from "@/app/pages/slice/wishListSlice";
import { MdOutlineFavorite } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import {
  ProductDetails,
  showDetails,
} from "@/app/pages/slice/productDetailSlice";

type ProductDetails = {
  id: string;
  title: string;
  image: string;
  ratingimage: string;
  rating: string;
  newPrice: number;
  oldPrice: number;
  category: string;
  size: number | string;
};
 
type AllProducts = ProductDetails;

type Props = {
  params: {
    id: string;
  };
};

const ProductDetailPage = ({ params }: Props) => {
  const [selectedSize, setSelectedSize] = useState("60g");
  const [value, setValue] = useState(150);
  const [allproduct, setAllProduct] = useState<AllProducts[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<AllProducts[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([
    "Pet Foods",
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [isWishClick, setIsWishClick] = useState(false);
  const [isCartClick, setIsCartClick] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch(); 

  const product = useSelector((state: RootState) =>
    state.productDetails.items.find((item) => item?.id === params.id)
  );
  console.log("product?????? :", product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleCart = (item: Products) => {
    dispatch(
      addToCart({
        id: item?.id,
        title: item?.title,
        newPrice: item?.newPrice,
        quantity: quantity,
        image: item?.image,
        size: selectedSize,
      })
    );
    setIsCartClick(true);
    toast.success("Item added to cart");
  };

  const handleWishList = (item: Products) => {
    dispatch(
      addToWishList({
        id: item?.id,
        title: item?.title,
        newPrice: item?.newPrice,
        quantity: quantity,
        image: item?.image,
      })
    );
    setIsWishClick(true);
    toast.success("Item added to wishlist");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productRes = await axiosInstance.get<AllProducts>(
          `/allProducts/${params.id}`
        );
        const allRes = await axiosInstance.get<AllProducts[]>(`/allProducts`);

        const productData: ProductDetails = {
          id: productRes.data.id,
          title: productRes.data.title,
          newPrice: productRes.data.newPrice ?? 0,
          image: productRes.data.image,
          ratingimage: productRes.data.ratingimage,
          rating: productRes.data.rating ?? "0",
          oldPrice: productRes.data.oldPrice ?? 0,
          category: productRes.data.category ?? "",
          size: productRes.data.size ?? 0,
        };

        setAllProduct(allRes.data);
        dispatch(showDetails(productData));
      } catch (err) {
        console.error(err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const togglecategory = (category: string) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // const filteredProducts = allproduct?.filter((newproduct) =>
  //   selectedCategory.includes(newproduct?.category)
  // );

  const handleFiltered = () => {
    const filtered = allproduct.filter((product) =>
      selectedCategory.includes(product?.category)
    );
    setSelectedProduct(filtered);
  };

  // console.log(
  //   "All Categories:",
  //   allproduct.map((p) => p.category)
  // );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[300px] text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p>Product not found.</p>
      </div>
    );
  }

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
      <div className="max-w-[1640px] mx-auto xl:px-[143px] px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-[30px]">
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
                <p className="w-max py-[6px] px-[8px] text-center text-pinktag bg-bgpink font-quick-bold-700 text-[14px] rounded-[5px]">
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
                  />
                  <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                    {product?.rating}
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-4 pt-2">
                  <p className="text-[36px] sm:text-[48px] font-quick-bold-700 text-shopbtn">
                    ${product?.newPrice}
                  </p>
                  <div>
                    {product.oldPrice && product.newPrice && (
                      <p className="text-[12px] font-quick-semibold-600 text-offertext">
                        {Math.round(
                          ((product.oldPrice - product.newPrice) /
                            product.oldPrice) *
                            100
                        )}
                        % Off
                      </p>
                    )}
                    <p className="text-[20px] sm:text-[28px] text-bgbrown line-through">
                      ${product?.oldPrice}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[16px] sm:text-[17px] font-lato-regular-400 text-bgbrown pt-2 max-w-[460px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam rem officia, corrupti reiciendis minima nisi modi.
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newQty = quantity - 1;
                        if (newQty >= 1) {
                          setQuantity(newQty);
                          dispatch(
                            updateQuantity({ id: product.id, quantity: newQty })
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
                          updateQuantity({ id: product.id, quantity: newQty })
                        );
                      }}
                    >
                      <FaPlus className="text-shopbtn" />
                    </button>
                  </div>

                  <button
                    className="bg-shopbtn py-3 px-6 flex items-center gap-2 text-white text-[16px] font-quick-bold-700 rounded-[5px]"
                    onClick={() => handleCart(product)}
                  >
                    {isCartClick ? (
                      <IoCheckmarkOutline className="text-white" />
                    ) : (
                      <Image src={cart} alt="cart" width={20} height={20} />
                    )}
                    Add to cart
                  </button>
                  <div
                    className="p-[16px] bg-white border border-bordercolor rounded-[5px]"
                    onClick={() => handleWishList(product)}
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
          <div className="pt-[50px]">
            <Description />
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
                  <div className="flex items-center gap-3">
                    <Image
                      src={item?.img}
                      alt={item?.name}
                      width={30}
                      height={30}
                    />
                    <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                      {item?.name}
                    </p>
                  </div>

                  <div className="w-[24px] h-[24px] rounded-full bg-cartbtn flex items-center justify-center">
                    <p className="text-[12px] text-regalblue font-lato-regular-400">
                      {item?.qty}
                    </p>
                  </div>
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
                From <span className="text-shopbtn">$500</span>
              </span>
              <span className="text-[14px] text-bgbrown font-lato-regular-400  absolute end-0 -bottom-6">
                To <span className="text-shopbtn">$1000</span>
              </span>
            </div>
            <div className="pt-[14px]">
              <p className="text-[14px] font-lato-bold-700 text-bgbrown pb-[9px]">
                Color
              </p>
              <div className="flex items-center gap-[8px]">
                <div>
                  <input
                    type="checkbox"
                    className="w-[17px] h-[17px] mt-[9px] rounded-[2px] border-bordercolor"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                    Red(56)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <div>
                  <input
                    type="checkbox"
                    className="w-[17px] h-[17px] mt-[9px] rounded-[2px] border-bordercolor"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                    Green(78)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <div>
                  <input
                    type="checkbox"
                    className="w-[17px] h-[17px] mt-[9px] rounded-[2px] border-bordercolor"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                    Blue(54)
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-[24px]">
              <p className="text-[14px] font-lato-bold-700 text-bgbrown pb-[9px]">
                Category
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-[8px]">
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes("Pet Foods")}
                        onChange={() => togglecategory("Pet Foods")}
                      />
                    </div>
                    <div>
                      <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                        Pet Foods
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes("Fruits")}
                        onChange={() => togglecategory("Fruits")}
                      />
                    </div>
                    <div>
                      <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                        Fruits
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes("Vegetables")}
                        onChange={() => togglecategory("Vegetables")}
                      />
                    </div>
                    <div>
                      <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                        Vegetables
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-[8px]">
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes("Coffes & Teas")}
                        onChange={() => togglecategory("Coffes & Teas")}
                      />
                    </div>
                    <div>
                      <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                        Coffes & Teas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes("Snack")}
                        onChange={() => togglecategory("Snack")}
                      />
                    </div>
                    <div>
                      <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                        Snack
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes("Featured")}
                        onChange={() => togglecategory("Featured")}
                      />
                    </div>
                    <div>
                      <p className="text-[14px] font-lato-regular-400 text-bgbrown">
                        Featured
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-[19px]">
              <div className="flex items-center justify-between">
                <div>
                  <button
                    className="text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px]
                   py-[12px] px-[26px] flex items-center gap-[9px]"
                    onClick={handleFiltered}
                  >
                    <Image src={filter} alt="filter" width={20} height={20} />
                    Fillter
                  </button>
                </div>
                <button
                  className="ml-2 text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px]
   py-[12px] px-[16px]"
                  onClick={() => {
                    setSelectedProduct([]);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/*Selected Product section */}
          <div className="w-full h-fit p-5 border border-productborder shadow-md rounded-[15px]">
            <p className="text-[24px] font-quick-bold-700 text-regalblue pb-3">
              Selected products
            </p>
            <div className="w-full bg-gray-200 rounded-full h-[3px] mb-4 dark:bg-gray-700">
              <div className="bg-progessbtn h-[3px] rounded-full dark:bg-shopbtn w-[23%]"></div>
            </div>
            <div>
              {selectedProduct?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-[15px] pt-[10px]"
                >
                  <div>
                    <Image
                      src={item?.image}
                      alt="image"
                      width={50}
                      height={50}
                      className="  object-cover w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[20px] font-quick-bold-700 text-shopbtn">
                      {item?.title}
                    </p>
                    <p className="text-[16px] font-lato-regular-400 text-bgbrown">
                      ${item?.newPrice}
                    </p>
                    <Image
                      src={item?.ratingimage}
                      alt="image"
                      width={25}
                      height={25}
                      unoptimized
                      className="  w-[60px]"
                    />
                  </div>
                </div>
              ))}
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

export default ProductDetailPage;
