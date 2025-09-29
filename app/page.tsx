import React from "react";

import PopularProduct from "./pages/popularproduct/page";

import Banner from "./pages/banner/page";

import Categories from "./pages/categories/page";

const Page = () => {
  // const heading = headings;

  // const filteredProducts = products.filter(
  //   (product) => product.category === heading.title
  // );

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 pt-[55px]">
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
