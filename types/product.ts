import { StaticImageData } from "next/image";

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
  id: number;
  tag: string;
  image: StaticImageData;
  category: string;
  title: string;
  ratingimage: StaticImageData;
  rating: string;
  by: string;
  newPrice: string;
  oldPrice: string;
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
  newPrice: string;
  oldPrice: string;
  cartimage: StaticImageData;
  cart: string;
  sold: string;
  soldnumber: string;
};
