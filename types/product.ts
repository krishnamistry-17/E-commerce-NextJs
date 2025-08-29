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
  image: StaticImageData
};
