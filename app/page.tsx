import React from "react";
import { Categories } from "./pages/categories/page";
import PopularProduct from "./pages/popularproduct/page";
import DailySells from "./pages/dailysells/page";
import DealsDay from "./pages/deals/page";
import Products from "./pages/products/page";
import Banner from "./pages/banner/page";

const Page = () => {
  // const heading = headings;

  // const filteredProducts = products.filter(
  //   (product) => product.category === heading.title
  // );

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 pt-[55px]">
      <Categories />
      <PopularProduct />
      <DailySells />
      <DealsDay />
      <Products />
      <Banner  />
    </div>
  );
};

export default Page;
