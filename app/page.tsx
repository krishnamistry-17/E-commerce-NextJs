import React from "react";

import PopularProduct from "./pages/popularproduct/page";

import Banner from "./pages/banner/page";

import Categories from "./pages/categories/page";

const Page = () => {
  // const heading = headings;

  // const filteredProducts = products.filter(
  //   (product) => product.category === heading.title
  // );
  const handleClick = () => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  };

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 pt-[55px]">
      <button onClick={handleClick}>click</button>
      <Categories />
      <PopularProduct />
      {/* <DailySells />
      <DealsDay />
      <Products /> */}
      <Banner />
      {/* <Advertise /> */}
    </div>
  );
};

export default Page;
