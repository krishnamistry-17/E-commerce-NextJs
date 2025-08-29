import React from "react";
import { Categories } from "./pages/categories/page";
import { headings, products, bannerheadings } from "../data/product";

const Page = () => {
  // Example: pick first heading and all products for now
  const heading = headings;
  

  // Optionally filter products by heading.title category
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
    </div>
  );
};

export default Page;
