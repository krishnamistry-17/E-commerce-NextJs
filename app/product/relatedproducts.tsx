"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { IoCheckmarkOutline } from "react-icons/io5";
import drop from "../../public/svgs/drop.svg";
import cart from "../../public/svgs/cart.svg";
import { apiRoutes } from "@/app/api/apiRoutes";

interface Category {
  productName: string;
  image: string;
  price: string;
  stock: number;
  id: string;
}

const RelatedProduct = () => {
  const [product, setProducts] = useState<Category[]>([]);
  console.log("product :", product);
  const params = useParams();
  const [activeTab, setActiveTab] = useState("All");
  const [clickedCartIds, setClickedCartIds] = useState<Set<string>>(new Set());
  const [categoryMenu, setCategoryMenu] = useState(false);
  const toggleCategoryMenu = () => setCategoryMenu((prev) => !prev);
  const router = useRouter();
  const id = params?.id as string;

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
    if (clickedCartIds.has(productId)) {
      toast.info("Product already added in cart");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        toast.info("Please login to add items to your cart.");
        router.push("/login");
        return;
      }

      const res = await axiosInstance.post(apiRoutes.ADD_TO_CART(productId));
      console.log("res??add to cart btn :", res);

      if (res.status === 200 || res.data.success) {
        toast.success("Added to cart successfully!");
        setClickedCartIds((prev) => new Set(prev).add(productId));
      }
    } catch (error: any) {
      console.error("Failed to add to cart", error);
      if (error.response?.status === 409) {
        toast.error("Could not add item to cart.");
      }
    }

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDetails = async (productId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        toast.info("Please login to add items to your cart.");
        router.push("/login");
        return;
      }
      const res = await axiosInstance.get(
        apiRoutes.VIEW_PRODUCT_DETAILS(productId)
      );
      console.log("res???product-details :", res);
    } catch (error) {
      console.error("Failed to view details", error);
      toast.info("Please try again.");
    }
    router.push(`/product/${productId}`);
  };

  return (
    <div className="flex flex-col">
      <div className="md:flex hidden justify-between items-center">
        <p className="lg:text-[32px] text-[27px] text-regalblue font-quick-bold-700">
          Related Products
        </p>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 pt-8">
        {Array.isArray(filteredProduct) &&
          filteredProduct
            ?.filter((item) => item.id !== id)
            .slice(0, 3)
            .map((item, index) => (
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
                        handleCart(item?.id);
                      }}
                    >
                      {clickedCartIds.has(item?.id) ? (
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
                        Add
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

export default RelatedProduct;
