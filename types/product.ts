import { StaticImageData } from "next/image";
// import { mainheading } from "./../data/product";

export type Product = {
  id: number;
  image: StaticImageData;
  title: string;
  price: number;
  item: string;
  category: string;
};

export type Heading = {
  title: string;
  id: number;
};

export type BannerHeading = {
  banner: string;
  id: number;
  btn: string;
  image: StaticImageData;
};

export type PopularProductHeadings = {
  id: number;
  title: string;
};

export type PopularProducts = {
  id: string;
  tag: string;
  image: StaticImageData;
  category: string;
  title: string;
  ratingimage: StaticImageData;
  rating: string;
  by: string;
  newPrice: number;
  oldPrice: number;
  cartimage: StaticImageData;
  cart: string;
};

export type DailyBestSells = {
  id: number;
  title: string;
};

export type DailySells = {
  id: string;
  tag: string;
  image: StaticImageData;
  category: string;
  title: string;
  ratingimage: StaticImageData;
  newPrice: number;
  oldPrice: number;
  cartimage: StaticImageData;
  cart: string;
  sold: string;
  soldnumber: string;
};

export type DealsHeading = {
  id: number;
  title: string;
};

export type DailyDeals = {
  id: string;
  image: StaticImageData;
  title: string;
  ratingimage: StaticImageData;
  rating: string;
  by: string;
  newPrice: number;
  oldPrice: number;
  cartimage: StaticImageData;
  cart: string;
};

export type ProductsHeading = {
  productheadings: string[];
};

export type Products = {
  id: string;
  image: StaticImageData;
  image1: StaticImageData;
  title: string;
  ratingimage: StaticImageData;
  rating: string;
  newPrice: number;
  oldPrice: number;
  category: string;
};

export type Advertise = {
  id: number;
  image: StaticImageData;
  title: string;
  order: string;
};

export type BrowseHeading = {
  id: number;
  image: StaticImageData;
  title: string;
};

export type FooterMain = {
  image: StaticImageData;
  para: string;
};

export type FooterDetails = {
  icon: StaticImageData;
  detail: string;
};

export type FooterContent = {
  mainheading: string;
  mainheading1: string;
  mainheading2: string;
  mainheading3: string;
};

export type FooterHeading = {
  subheadings: string;
  subheadings1: string;
  subheadings2: string;
  subheadings3: string;
};

export type FooterApp = {
  mainheading: string;
  subheading: string;
  image1: StaticImageData;
  image2: StaticImageData;
  paymentheading: string;
  image3: StaticImageData;
};

export type Category = {
  image: StaticImageData;
  title: string;
  quantity: number;
};
