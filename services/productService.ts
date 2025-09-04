import axiosInstance from "@/lib/axios";
import {
  Advertise,
  BannerHeading,
  DailyBestSells,
  DailyDeals,
  DailySells,
  DealsHeading,
  Heading,
  PopularProductHeadings,
  PopularProducts,
  Product,
  Products,
  ProductsHeading,
} from "@/types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const getHeadings = async (): Promise<Heading[]> => {
  const response = await axiosInstance.get("/headings");
  return response.data;
};

export const getBannerHeadings = async (): Promise<BannerHeading[]> => {
  const response = await axiosInstance.get("/bannerheadings");
  return response.data;
};

export const getPopularProducts = async (): Promise<PopularProducts[]> => {
  const response = await axiosInstance.get("/popluarproducts");
  return response.data;
};

export const getPopularProductsheading = async (): Promise<
  PopularProductHeadings[]
> => {
  const response = await axiosInstance.get("/popularproductheadings");
  return response.data;
};

export const getDailySellsHeading = async (): Promise<DailyBestSells[]> => {
  const response = await axiosInstance.get("/dailysells");
  return response.data;
};

export const getDailySells = async (): Promise<DailySells[]> => {
  const response = await axiosInstance.get("/dailydatas");
  return response.data;
};

export const getDealsHeading = async (): Promise<DealsHeading[]> => {
  const response = await axiosInstance.get("/dealsheading");
  return response.data;
};

export const getDealsData = async (): Promise<DailyDeals[]> => {
  const response = await axiosInstance.get("/dailydeals");
  return response.data;
};

export const getProductsHeading = async (): Promise<ProductsHeading[]> => {
  const response = await axiosInstance.get("/mainheading");
  return response.data;
};

export const getAllProduct = async (): Promise<Products[]> => {
  const response = await axiosInstance.get("/newproducts");
  return response.data;
};

export const getBannerData = async (): Promise<Advertise[]> => {
  const response = await axiosInstance.get("/advertise");
  return response.data;
};
