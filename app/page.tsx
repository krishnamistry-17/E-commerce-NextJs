import React from "react";
import { Categories } from "./pages/categories/page";
import {
  headings,
  products,
  bannerheadings,
  popularproductheadings,
  popluarproducts,
  dailysells,
  dailydatas,
} from "../data/product";
import PopularProduct from "./pages/popularproduct/page";
import DailySells from "./pages/dailysells/page";

const Page = () => {
  const heading = headings;

  // const filteredProducts = products.filter(
  //   (product) => product.category === heading.title
  // );

  return (
    <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 pt-[55px]">
      <Categories
        heading={headings}
        products={products}
        bannerheading={bannerheadings}
      />
      <PopularProduct
        heading={popularproductheadings}
        popularproduct={popluarproducts}
      />
      <DailySells heading={dailysells} dailydata={dailydatas} />
    </div>
  );
};

export default Page;
