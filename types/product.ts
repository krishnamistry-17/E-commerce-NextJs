// import { StaticImageData } from "next/image";
// // import { mainheading } from "./../data/product";

// export type Product = {
//   id: number;
//   image: StaticImageData;
//   title: string;
//   price: number;
//   item: string;
//   category: string;
//   size: number;
// };

// export type Heading = {
//   title: string;
//   id: number;
// };

// export type BannerHeading = {
//   banner: string;
//   id: number;
//   btn: string;
//   image: StaticImageData;
// };

// export type PopularProductHeadings = {
//   id: number;
//   title: string;
// };

// export type PopularProducts = {
//   id: string;
//   tag: string;
//   image: StaticImageData;
//   category: string;
//   title: string;
//   ratingimage: StaticImageData;
//   rating: string;
//   by: string;
//   newPrice: number;
//   oldPrice: number;
//   cartimage: StaticImageData;
//   cart: string;
//   size: number;
// };

// export type DailyBestSells = {
//   id: number;
//   title: string;
// };

// export type DailySells = {
//   id: string;
//   tag: string;
//   image: StaticImageData;
//   category: string;
//   title: string;
//   ratingimage: StaticImageData;
//   rating: string;
//   newPrice: number;
//   oldPrice: number;
//   cartimage: StaticImageData;
//   cart: string;
//   sold: string;
//   soldnumber: string;
//   size: number;
// };

// export type DealsHeading = {
//   id: number;
//   title: string;
// };

// export type DailyDeals = {
//   id: string;
//   image: StaticImageData;
//   title: string;
//   ratingimage: StaticImageData;
//   rating: string;
//   by: string;
//   newPrice: number;
//   oldPrice: number;
//   cartimage: StaticImageData;
//   cart: string;
//   category: string;
//   size: number;
// };

// export type ProductsHeading = {
//   productheadings: string[];
// };

// export type Products = {
//   id: string;
//   title: string;
//   image: string | StaticImageData;
//   image1: string | StaticImageData;
//   ratingimage: string | StaticImageData;
//   rating: string;
//   newPrice: number;
//   oldPrice: number;
//   category: string;
//   size: number | string;
// };

// export type Advertise = {
//   id: number;
//   image: StaticImageData;
//   title: string;
//   order: string;
// };

// export type BrowseHeading = {
//   id: number;
//   image: StaticImageData;
//   title: string;
// };

// export type FooterMain = {
//   image: StaticImageData;
//   para: string;
// };

// export type FooterDetails = {
//   icon: StaticImageData;
//   detail: string;
// };

// export type FooterContent = {
//   mainheading: string;
//   mainheading1: string;
//   mainheading2: string;
//   mainheading3: string;
// };

// export type FooterHeading = {
//   subheadings: string;
//   subheadings1: string;
//   subheadings2: string;
//   subheadings3: string;
// };

// export type FooterApp = {
//   mainheading: string;
//   subheading: string;
//   image1: StaticImageData;
//   image2: StaticImageData;
//   paymentheading: string;
//   image3: StaticImageData;
// };

// export type Category = {
//   image: StaticImageData;
//   title: string;
//   quantity: number;
// };

// export type FilteredNewProduct = {
//   id: number;
//   image: StaticImageData;
//   title: string;
//   price: string;
//   ratingimage: StaticImageData;
//   size: number;
// };

// export type InformationButton = {
//   id: number;
//   title: string;
// };

// export type InformationContent = {
//   para1: string;
//   para2: string;
//   para3: string;
//   para4: string;
//   para5: string;
//   title1: string;
//   content1: string;
//   content2: string;
//   title2: string;
//   content3: string;
//   content4: string;
//   content5: string;
//   title3: string;
//   content6: string;
// };

// export type InformationList = {
//   title: string;
//   content: string;
// };

// export type RelatedProducts = {
//   id: string;
//   tag: string;
//   image: StaticImageData;
//   category: string;
//   title: string;
//   ratingimage: StaticImageData;
//   rating: string;
//   by: string;
//   newPrice: number;
//   oldPrice: number;
//   cartimage: StaticImageData;
//   cart: string;
//   size: number;
// };

// export type AllProducts = {
//   id: string;
//   title: string;
//   image: StaticImageData;
//   newPrice: number;
//   oldPrice: number;
//   category: string;
//   ratingimage: StaticImageData;
//   rating: string;
//   size: number;
// };

// export type AllMergedProducts = {
//   id: number;
//   title: string;
//   image: StaticImageData;
//   newprice: number;
//   category: string;
//   size: number;
// };

// export type AboutWelcome = {
//   image: StaticImageData;
//   head: string;
//   para1: string;
//   para2: string;
//   subimages: {
//     image1: StaticImageData;
//     image2: StaticImageData;
//     image3: StaticImageData;
//   };
//   provideimages: {
//     image4: StaticImageData;
//     image5: StaticImageData;
//     image6: StaticImageData;
//     image7: StaticImageData;
//     image8: StaticImageData;
//     image9: StaticImageData;
//   };
//   provide: {
//     head: string;
//     para: string;
//     btn: string;
//   };
//   performance: {
//     image: StaticImageData;
//     subheading: string;
//     heading: string;
//     para1: string;
//     para2: string;
//   };
//   ad: {
//     title: string;
//     desc: string;
//   };
//   team: {
//     title: string;
//     heading: string;
//     para1: string;
//     btn: string;
//     image1: StaticImageData;
//     image2: StaticImageData;
//   };
// };

// export type Contact = {
//   head: string;
//   title: string;
//   para1: string;
//   questions: {
//     que1: string;
//     que2: string;
//     que3: string;
//     que4: string;
//   };
//   answers: {
//     ans: string;
//   };
//   lat?: number;
//   lng?: number;
//   location: {
//     headone: string;
//     headtwo: string;
//     headthree: string;
//   };
//   locationdetail: {
//     address: string;
//     btn: string;
//   };
// };

// export type SignIn = {
//   email: string;
//   password: number;
// };

// export type SignUp = {
//   username: string;
//   email: string;
//   password: number;
// };

// export type UserProfile = {
//   username: string;
//   email: string;
//   password: number;
// };
// // Product types for the e-commerce application

// export interface Product {
//   id: string;
//   title: string;
//   description?: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   images?: string[];
//   category: string;
//   categoryId?: string;
//   brand?: string;
//   size?: string | number;
//   weight?: string;
//   stock: number;
//   inStock: boolean;
//   rating?: number;
//   reviewCount?: number;
//   tags?: string[];
//   features?: string[];
//   specifications?: Record<string, string>;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   image?: string;
//   parentId?: string;
//   children?: Category[];
//   productCount?: number;
// }

// export interface CartItem {
//   productId: string;
//   productName: string;
//   price: number;
//   quantity: number;
//   image: string;
//   totalPrice: number;
// }

// export interface WishlistItem {
//   productId: string;
//   productName: string;
//   price: number;
//   image: string;
//   addedAt: string;
// }

// // API Response types
// export interface ProductResponse {
//   success: boolean;
//   message: string;
//   product?: Product;
//   products?: Product[];
//   totalProducts?: number;
//   page?: number;
//   limit?: number;
// }

// export interface CategoryResponse {
//   success: boolean;
//   message: string;
//   categories?: Category[];
//   totalCategories?: number;
// }

// export interface CartResponse {
//   success: boolean;
//   message: string;
//   cartItems?: CartItem[];
//   totalItems?: number;
//   totalAmount?: number;
// }

// // Legacy types for backward compatibility (can be removed later)
// export interface Heading {
//   id: string;
//   title: string;
//   subtitle?: string;
// }

// export interface BannerHeading {
//   id: string;
//   title: string;
//   subtitle?: string;
//   image?: string;
// }

// export interface PopularProducts {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   category: string;
// }

// export interface PopularProductHeadings {
//   id: string;
//   title: string;
//   subtitle?: string;
// }

// export interface DailyBestSells {
//   id: string;
//   title: string;
//   subtitle?: string;
// }

// export interface DailySells {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   category: string;
// }

// export interface DealsHeading {
//   id: string;
//   title: string;
//   subtitle?: string;
// }

// export interface DailyDeals {
//   id: string;
//   title: string;
//   price: number;
//   originalPrice: number;
//   image: string;
//   discount?: number;
// }

// export interface ProductsHeading {
//   id: string;
//   title: string;
//   subtitle?: string;
// }

// export interface Products {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   category: string;
// }

// export interface Advertise {
//   id: string;
//   title: string;
//   image: string;
//   link?: string;
//   description?: string;
// }

