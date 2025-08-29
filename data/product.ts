import { BannerHeading, Heading, Product } from "../types/product";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import image6 from "../assets/images/image6.png";
import image7 from "../assets/svgs/image7.svg";
import image8 from "../assets/svgs/image8.svg";
import image9 from "../assets/svgs/image9.svg";
import banner1 from "../assets/images/banner-1.png";
import banner2 from "../assets/images/banner-2.png";
import banner3 from "../assets/images/banner-3.png";

export const products: Product[] = [
  {
    id: 1,
    image: image1,
    title: "Cake & Milk",
    price: 26,
    item: "item",
    category: "Pet Foods",
  },
  {
    id: 2,
    image: image2,
    title: "Oganic Kiwi",
    price: 28,
    item: "item",
    category: "Fruits",
  },
  {
    id: 3,
    image: image3,
    title: "Peach",
    price: 14,
    item: "item",
    category: "Fruits",
  },
  {
    id: 4,
    image: image4,
    title: "Red Apple",
    price: 54,
    item: "item",
    category: "Fruits",
  },
  {
    id: 5,
    image: image6,
    title: "Coffes & Tea",
    price: 89,
    item: "item",
    category: "Coffes & Teas",
  },
  {
    id: 6,
    image: image7,
    title: "Vegetables",
    price: 72,
    item: "item",
    category: "Vegetables",
  },
  {
    id: 7,
    image: image8,
    title: "Strawberry",
    price: 36,
    item: "item",
    category: "Fruits",
  },
  {
    id: 8,
    image: image9,
    title: "Black plum",
    price: 123,
    item: "item",
    category: "Fruits",
  },
];

export const headings: Heading[] = [
  {
    id: 1,
    title: "Fruits",
  },
  {
    id: 2,
    title: "Coffes & Teas",
  },
  {
    id: 3,
    title: "Pet Foods",
  },
  {
    id: 4,
    title: "Vegetables",
  },
];

export const bannerheadings: BannerHeading[] = [
  {
    id: 1,
    banner: "Everyday Fresh & Clean with Our Products",
    btn: "Shop Now",
    image: banner1,
  },

  {
    id: 2,
    banner: "Make your Breakfast Healthy and Easy",
    btn: "Shop Now",
    image: banner2,
  },
  {
    id: 3,
    banner: "The best Organic Products Online",
    btn: "Shop Now",
    image: banner3,
  },
];
