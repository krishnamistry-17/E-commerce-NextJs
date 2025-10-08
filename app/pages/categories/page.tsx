"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import food from "../../../public/images/food.png";
import { FiSend } from "react-icons/fi";
import drop from "../../../public/svgs/drop.svg";
import { useRouter } from "next/navigation";
import { apiRoutes } from "@/app/api/apiRoutes";

interface Product {
  _id: string;
  productName: string;
  image: string;
  price: number;
  stock: number;
}

interface Category {
  _id: string;
  category: string;
  categoryProduct: Product[];
  image: string;
}

const Categories = () => {
  const [product, setProducts] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [categoryMenu, setCategoryMenu] = useState(false);

  const toggleCategoryMenu = () => setCategoryMenu((prev) => !prev);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(apiRoutes.GET_ALL_CATEGORY);
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const categoryBgColors: Record<string, string> = {
    "Cake & Milk": "bg-bgfruit2",
    Vegetables: "bg-bgfruit4",
    "Coffes & Teas": "bg-bgfruit2",
    Fruits: "bg-bgfruit5",
    "Pet Foods": "bg-bgfruit7",
  };

  const filteredProduct =
    activeTab === "All"
      ? product
      : product.filter((products) => products?.category === activeTab);

  return (
    <>
      <div>
        <div
          className="w-full h-fit object-cover rounded-[20px]
             shadow-lg bg-shopbtn bg-opacity-30 relative sm:p-[40px] p-2 z-0"
        >
          <div className="flex flex-col relative z-20">
            <p
              className="lg:text-[40px] md:text-[32px] text-[22p]
                 text-regalblue font-quick-bold-700 md:max-w-[530px] relative z-20"
            >
              Fresh Vegetables Big discount
            </p>
            <p className="md:text-[22px] text-[16px] text-bgbrown font-lato-regular-400 pt-[20px] md:pb-[46px] relative z-20">
              Save up to 50% off on your first order
            </p>

            <div className="flex w-full  xs375:max-w-[450px] h-[64px] items-center z-30 relative">
              <div className="flex items-center  bg-white rounded-[50px] relative z-30">
                <FiSend className="text-gray-500 mr-2 ml-3" />

                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-transparent text-inputtext focus:outline-none text-sm md:text-base z-30"
                  style={{ position: "relative", zIndex: 30 }}
                />

                <button
                  onClick={() => router.push("/signup")}
                  className="ml-2 bg-shopbtn text-white text-[12px] md:text-[16px] 
        px-[14px] py-[8px] lg:px-[40px] md:px-[23px] md:py-[22px] 
        rounded-[50px] font-quick-bold-700 transition whitespace-nowrap z-30"
                  type="submit"
                  style={{ position: "relative", zIndex: 30 }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-[53px] sm:mt-8 md:mt-0">
            <Image
              src={food}
              alt="food"
              width={25}
              height={25}
              unoptimized
              className="absolute right-0 bottom-0 xl:w-[50%] lg:w-[44%] md:w-[53%] w-[50%] z-10 object-cover pointer-events-none"
              style={{ zIndex: 10 }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col pt-[55px]">
          <div className="md:flex justify-between items-center">
            <div className="md:flex hidden justify-between  items-center pb-[43px]">
              <div>
                <p className="xl:text-[32px] lg:text-[25px] text-[27px] font-quick-bold-700 text-regalblue">
                  Featured Categories
                </p>
              </div>
              <div>
                <p
                  className="lg:text-[16px] md:text-[16px] xs375:text-[13px] text-[16px] pl-[29px] pt-[20px] font-quicksand-600 
                  text-regalblue
                  xs375:flex items-center gap-[27.5px]"
                >
                  <div className="flex gap-4 flex-wrap">
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
                        key={item._id}
                        onClick={() => setActiveTab(item?.category)}
                        className={`cursor-pointer ${
                          activeTab === item?.category
                            ? "text-shopbtn font-bold"
                            : "text-regalblue"
                        }`}
                      >
                        {item?.category}
                      </div>
                    ))}
                  </div>
                </p>
              </div>
            </div>
            <div className="md:hidden justify-between  items-center pb-[43px]">
              <p className="lg:text-[32px] text-[27px] font-quick-bold-700 text-regalblue pb-4">
                Featured Categories
              </p>

              {/* Dropdown trigger */}
              <div
                className="flex items-center justify-between w-full bg-white py-2 px-4 
                rounded-[50px] border border-gray-400 cursor-pointer"
                onClick={toggleCategoryMenu}
              >
                <p
                  className={`${activeTab ? "text-shopbtn" : "text-regalblue"}`}
                >
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
                      onClick={() => {
                        setActiveTab("All");
                        setCategoryMenu(false);
                      }}
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
                        key={item._id}
                        onClick={() => {
                          setActiveTab(item?.category);
                          setCategoryMenu(false);
                        }}
                        className={`cursor-pointer ${
                          activeTab === item?.category
                            ? "text-shopbtn font-bold"
                            : "text-regalblue"
                        }`}
                      >
                        {item?.category}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-[24px] 
          rounded-[10px] p-4 text-center items-center"
          >
            {filteredProduct
              ?.flatMap((category) =>
                category.categoryProduct.map((product) => ({
                  ...product,
                  category: category.category,
                }))
              )
              .map((product) => (
                <div
                  key={product._id}
                  className={`py-[22px] px-4 rounded-[10px] text-center ${
                    categoryBgColors[product.category] || "bg-white"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.productName}
                    width={200}
                    height={200}
                    className="mx-auto mb-2 w-full"
                    unoptimized
                  />
                  <p className="text-regalblue font-semibold">
                    {product.productName}
                  </p>
                  <p className="text-bgbrown">
                    ₹{product.price}
                    <span className="text-gray-400 text-sm pl-2">
                      (Stock: {product.stock})
                    </span>
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* <div className="pt-[25px] pb-[56px] pl-[12px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-[10px]">
            {bannerheading.map((item, index) => (
              <div key={index} className="relative flex flex-col h-full">
                <Image
                  src={item?.image}
                  alt={item?.banner || "Banner Image"}
                  width={500}
                  height={300}
                  unoptimized
                  className="w-full rounded-[10px] object-cover"
                />
                <div className="absolute top-8 left-4">
                  <p className="text-[16px] lg:text-[24px] font-quick-bold-700 text-regalblue max-w-[209px] lg:max-w-[235px]">
                    {item?.banner}
                  </p>
                  <button className="mt-4 text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px] py-2 px-4">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Categories;
