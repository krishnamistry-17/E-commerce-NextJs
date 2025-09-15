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
  rating: string;
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
  category: string;
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

export type FilteredNewProduct = {
  id: number;
  image: StaticImageData;
  title: string;
  price: string;
  ratingimage: StaticImageData;
};

export type InformationButton = {
  id: number;
  title: string;
};

export type InformationContent = {
  para1: string;
  para2: string;
  para3: string;
  para4: string;
  para5: string;
  title1: string;
  content1: string;
  content2: string;
  title2: string;
  content3: string;
  content4: string;
  content5: string;
  title3: string;
  content6: string;
};

export type InformationList = {
  title: string;
  content: string;
};

export type RelatedProducts = {
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

export type AllProducts = {
  id: number;
  image: StaticImageData;
  ratingimage: StaticImageData;
  title: string;
  price: number;
  category: string;
};

export type AboutWelcome = {
  image: StaticImageData;
  head: string;
  para1: string;
  para2: string;
  subimages: {
    image1: StaticImageData;
    image2: StaticImageData;
    image3: StaticImageData;
  };
  provideimages: {
    image4: StaticImageData;
    image5: StaticImageData;
    image6: StaticImageData;
    image7: StaticImageData;
    image8: StaticImageData;
    image9: StaticImageData;
  };
  provide: {
    head: string;
    para: string;
    btn: string;
  };
  performance: {
    image: StaticImageData;
    subheading: string;
    heading: string;
    para1: string;
    para2: string;
  };
  ad: {
    title: string;
    desc: string;
  };
  team: {
    title: string;
    heading: string;
    para1: string;
    btn: string;
    image1: StaticImageData;
    image2: StaticImageData;
  };
};

export type Contact = {
  head: string;
  title: string;
  para1: string;
  questions: {
    que1: string;
    que2: string;
    que3: string;
    que4: string;
  };
  answers: {
    ans: string;
  };
  lat?: number;
  lng?: number;
  location: {
    headone: string;
    headtwo: string;
    headthree: string;
  };
  locationdetail: {
    address: string;
    btn: string;
  };
};
