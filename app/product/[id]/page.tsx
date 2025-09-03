"use client";
import { useSelector } from "react-redux";
import { notFound } from "next/navigation";
import { RootState } from "@reduxjs/toolkit/query";

type Props = {
  params: {
    id: string;
  };
};

const ProductDetailPage = ({ params }: Props) => {
  const product = useSelector((state: RootState) =>
    state.productDetails.items.find((item) => item?.id === params.id)
  );
  console.log("product??????? :", product);

  if (!product) return notFound();

  return (
    <div className="p-8">
      product page
      {/* <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-xl text-shopbtn mt-4">{product.newPrice}</p> */}
    </div>
  );
};

export default ProductDetailPage;
