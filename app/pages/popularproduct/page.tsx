"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { IoCheckmarkOutline } from "react-icons/io5";
import drop from "../../../public/svgs/drop.svg";
import cart from "../../../public/svgs/cart.svg";
import { apiRoutes } from "@/app/api/apiRoutes";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Category {
  productName: string;
  image: string;
  price: string;
  stock: number;
  id: string;
}

const PopularProduct = () => {
  const [product, setProducts] = useState<Category[]>([]);
  // const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const [categoryMenu, setCategoryMenu] = useState(false);
  const toggleCategoryMenu = () => setCategoryMenu((prev) => !prev);
  const router = useRouter();
  const clickedCartIds = useSelector(
    (state: { cart: { clickedCartIds: string[] } }) => state.cart.clickedCartIds
  );
  const setClickedCartIds = useSelector(
    (state: {
      cart: { setClickedCartIds: (fn: (prev: string[]) => string[]) => void };
    }) => state.cart.setClickedCartIds
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(apiRoutes.GET_ALL_PRODUCT);
        setProducts(res.data.data);
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

  const filteredProduct =
    activeTab === "All"
      ? product
      : product?.filter((products) => products?.productName === activeTab);

  const handleCart = async (productId: string) => {
    if (clickedCartIds?.includes(productId)) {
      toast.info("Product already added in cart");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found, user is not authenticated.");
      toast.info("Please Login to add product in cart");
      return;
    }

    try {
      const res = await axiosInstance.post(apiRoutes.ADD_TO_CART(productId));

      if (res.status === 200 || res.data.success) {
        toast.success("Added to cart successfully!");
        setClickedCartIds((prev: string[]) => [...prev, productId]);
      }
    } catch (error: unknown) {
      console.error("Failed to add to cart", error);
      if (
        (error as { response?: { status?: number } })?.response?.status === 409
      ) {
        toast.error("Could not add item to cart.");
      }
    }

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDetails = async (productId: string) => {
    try {
      await axiosInstance.get(apiRoutes.VIEW_PRODUCT_DETAILS(productId));
    } catch (error) {
      console.error("Failed to view details", error);
      // toast.info("Please try again.");
    }
    router.push(`/product/${productId}`);
  };

  return (
    <div className="flex flex-col">
      <div className="md:flex hidden justify-between items-center">
        <p className="lg:text-[32px] text-[27px] text-regalblue font-quick-bold-700">
          Popular Products
        </p>
        <div className="sm:flex gap-4 flex-wrap pt-4 md:pt-0">
          <div
            onClick={() => setActiveTab("All")}
            className={`cursor-pointer ${
              activeTab === "All" ? "text-shopbtn font-bold" : "text-regalblue"
            }`}
          >
            All
          </div>
          {product?.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item?.productName)}
              className={`cursor-pointer pt-2 xs375:pt-0  pl-[29px] xs375:pl-0 ${
                activeTab === item?.productName
                  ? "text-shopbtn"
                  : "text-regalblue"
              }`}
            >
              {item?.productName}
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
            <div className="flex flex-col pl-2 gap-4 flex-wrap">
              <div
                onClick={() => setActiveTab("All")}
                className={`cursor-pointer ${
                  activeTab === "All"
                    ? "text-shopbtn font-bold"
                    : "text-regalblue"
                }`}
              >
                All
              </div>
              {product?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item?.productName);
                    setCategoryMenu(false);
                  }}
                  className={`cursor-pointer py-2 px-4 rounded-[10px] ${
                    activeTab === item?.productName
                      ? "text-shopbtn font-bold"
                      : "text-regalblue"
                  } hover:bg-gray-100`}
                >
                  {item?.productName}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 pt-8">
        {filteredProduct?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full rounded-[15px] border border-productborder relative cursor-pointer"
            onClick={() => handleDetails(item.id)}
          >
            <div className="absolute top-0">
              <p
                className={`w-[60px] h-[31px] text-white text-center text-xs py-[7px] rounded-tl-full rounded-tr-[8px] rounded-bl-[16px] rounded-br-full ${
                  categoriesWiseTag[item?.price]
                }`}
              >
                {item?.price}
              </p>
            </div>

            <Image
              src={item?.image}
              alt={item?.productName}
              className="pt-6 px-6 w-full"
              width={25}
              height={25}
              unoptimized
            />

            <div className="px-6 pb-6 flex flex-col flex-grow">
              <p className="text-lg font-bold text-regalblue pt-2">
                {item?.productName}
              </p>

              <div className="flex justify-between items-center pt-4 mt-auto">
                <div>
                  <p className="text-lg font-bold text-shopbtn">
                    ₹{item?.price}
                  </p>
                </div>

                <div
                  className="flex items-center bg-cartbtn px-3 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    // call the reusable handleCart helper
                    handleCart(item?.id);
                  }}
                >
                  {clickedCartIds?.includes(item?.id) ? (
                    <IoCheckmarkOutline className="text-shopbtn" />
                  ) : (
                    <Image
                      src={cart}
                      alt="cart"
                      width={25}
                      height={25}
                      unoptimized
                      className="w-5"
                    />
                  )}
                  <button className="text-sm font-bold text-shopbtn ml-1">
                    {clickedCartIds?.includes(item?.id) ? "Added" : "Add"}
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
