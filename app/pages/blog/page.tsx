"use client";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import home from "../../../public/svgs/home.svg";
import right from "../../../public/svgs/right.svg";
import recipe from "../../../public/svgs/recipe.svg";
import show from "../../../public/svgs/show.svg";
import sort from "../../../public/svgs/sort.svg";
import dot from "../../../public/svgs/dot.svg";
import filter from "../../../public/svgs/filter.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setProductDetails } from "../slice/blogDetailSlice";
import Pagination from "./pagination";

const Blog = () => {
  const [product, setProduct] = useState<any[]>([]);
  const [allcategories, setAllCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const router = useRouter();
  const dispatch = useDispatch();

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const totalPages = Math.ceil(product.length / postPerPage);

  const currentPosts = product?.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          "https://dummyjson.com/recipes"
        );
        setProduct(response?.data?.recipes);
        const allRecipes = response.data.recipes;

        const uniqueCategories = [
          ...new Set(allRecipes.map((recipe: any) => recipe.cuisine)),
        ];
        setAllCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching in products", error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (allcategories.length > 0 && !selectedCategory) {
      setSelectedCategory(allcategories[0]); // Italian or whatever is first
    }
  }, [allcategories]);

  const handleDeatils = (item: any) => {
    dispatch(setProductDetails(item));

    router.push(`/pages/blogproduct/${item.id}`);
  };

  const handleFiltered = async (category: string) => {
    try {
      const response = await axiosInstance.get(`https://dummyjson.com/recipes`);
      const allRecipes = response.data.recipes;

      const filtered = allRecipes.filter(
        (recipe: any) => recipe?.cuisine === category
      );
      setSelectedProduct(filtered);
    } catch (error) {
      console.error("Error filtering recipes", error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      handleFiltered(selectedCategory);
    }
  }, [selectedCategory]);

  const handleNavigation = (id: string) => {
    router.push(`/pages/blogproduct/${id}`);
  };

  const sortProducts = (type: string) => {
    const sorted = [...product];
    switch (type) {
      case "Category":
        sorted.sort((a, b) => a.cuisine.localeCompare(b.cuisine));
        break;
      case "MealType":
        sorted.sort((a, b) => a.mealType?.localeCompare(b.mealType));
        break;
      case "Difficulty":
        sorted.sort((a, b) => a.difficulty?.localeCompare(b.difficulty));
        break;
      case "Featured":
      default:
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    setProduct(sorted);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 pt-[55px]">
      <div className="w-full h-fit object-cover rounded-[20px] shadow-lg bg-shopbtn bg-opacity-30">
        <div className="flex flex-col pl-[68px] py-[70px]   ">
          <p className="text-regalblue font-quick-bold-700 text-[32px] ">
            Blog & News
          </p>
          <div className="flex items-center gap-[3px]">
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
            <div className="flex items-center gap-[8px]">
              <p className="text-[14px] text-bgbrown font-quick-semibold-600">
                Blog & News
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1640px] mx-auto  flex flex-col lg:flex-row gap-[30px] pt-[75px]">
        <div>
          <div className="md:flex justify-between items-center">
            <div className="flex  items-center">
              <Image src={recipe} alt="recipe" width={36} height={36} />
              <p className=" pl-[10px] md:text-[40px] text-[32px] text-regalblue font-quick-bold-700">
                {" "}
                Recips Articles
              </p>
            </div>
            <div className="flex items-center gap-[10px] md:pt-0 pt-4">
              <div className="flex items-center border border-bordercolor rounded-[10px] py-[14px] px-[14px] cursor-pointer">
                <div>
                  <Image src={show} alt="show" width={14} height={14} />
                </div>
                <div className="flex items-center pl-[10px]">
                  <p className="text-[13px] font-lato-regular-400 text-recipetext">
                    Show:
                  </p>
                  <select
                    className="text-[13px] font-lato-regular-400 text-recipetext pl-[5px] gap-1
                     focus:outline-none focus:right-0"
                    value={postPerPage}
                    onChange={(e) => {
                      setPostPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center border border-bordercolor rounded-[10px] py-[14px] px-[14px] cursor-pointer">
                <div>
                  <Image src={sort} alt="sort" width={14} height={14} />
                </div>
                <div className="flex items-center pl-[10px]">
                  <p className="text-[13px] font-lato-regular-400 text-recipetext">
                    Sort:
                  </p>
                  <select
                    value={sortOption}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setSortOption(selected);
                      sortProducts(selected);
                    }}
                    className="text-[13px] font-lato-regular-400 text-recipetext pl-[5px] gap-1
                     focus:outline-none focus:right-0"
                  >
                    <option value="Featured">Featured</option>
                    <option value="Category">Category</option>
                    <option value="MealType">MealType</option>
                    <option value="Difficulty">Difficulty</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/**Main div */}
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[12px] pt-[50px]">
            {currentPosts.map((item, index) => (
              <div
                key={index}
                className="pt-[30px]"
                onClick={() => handleDeatils(item)}
              >
                <Image
                  src={item?.image}
                  alt={item?.name}
                  width={368}
                  height={309}
                  unoptimized
                  className="w-full object-cover rounded-[15px]"
                />
                <div className="flex flex-col justify-center items-center pt-[19px]">
                  <p className="text-[14px] font-quick-bold-700 text-ratingtext">
                    {item?.cuisine}
                  </p>
                  <p className="xl:text-[24px] md:text-[20px] font-quick-bold-700 text-regalblue max-w-[236px]">
                    {item?.name}
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <p className="text-[13px] font-lato-regular-400 text-bgbrown">
                      Review:{item?.reviewCount}
                    </p>
                    <span>
                      <Image src={dot} alt="dot" width={8} height={8} />
                    </span>
                    <p className="text-[13px] font-lato-regular-400 text-bgbrown">
                      {item?.rating}/5
                    </p>
                    <span>
                      <Image src={dot} alt="dot" width={8} height={8} />
                    </span>
                    <p className="text-[13px] font-lato-regular-400 text-bgbrown">
                      Min:{item?.prepTimeMinutes}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="py-[45px] px-2">
            <Pagination
              postPerPage={postPerPage}
              totalPosts={product.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
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

            <div className="flex flex-wrap gap-2">
              {allcategories.map((category, index) => {
                const selected = selectedCategory === category;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)} // triggers the filtering useEffect
                    className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                      selected
                        ? "bg-shopbtn text-white border-shopbtn"
                        : "bg-white text-bgbrown border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="pt-[19px]">
              <div className="flex items-center justify-between">
                <div>
                  <button
                    className="text-[12px] font-quick-bold-700 text-white bg-shopbtn rounded-[4px]
                                         py-[12px] px-[26px] flex items-center gap-[9px]"
                    onClick={() => handleFiltered(selectedCategory)}
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
                  className="flex items-center gap-[15px] pt-[10px] cursor-pointer"
                  onClick={() => handleNavigation(item?.id)}
                >
                  <div>
                    <Image
                      src={item?.image}
                      alt="image"
                      width={50}
                      height={50}
                      unoptimized
                      className="  object-contain w-[50px] h-[50px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[20px] font-quick-bold-700 text-shopbtn">
                      {item?.name}
                    </p>
                    <p className="text-[16px] font-lato-regular-400 text-bgbrown">
                      {item?.cuisine}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
