import {
  Advertise,
  BannerHeading,
  BrowseHeading,
  Category,
  DailyBestSells,
  DailyDeals,
  DailySells,
  DealsHeading,
  FooterApp,
  FooterContent,
  FooterDetails,
  FooterHeading,
  FooterMain,
  Heading,
  PopularProductHeadings,
  PopularProducts,
  Product,
  Products,
  ProductsHeading,
} from "../types/product";
// import image1 from "../assets/images/image1.png";
// import image2 from "../assets/images/image2.png";
// import image3 from "../assets/images/image3.png";
// import image4 from "../assets/images/image4.png";
// import image6 from "../assets/images/image6.png";
// import image7 from "../assets/svgs/image7.svg";
// import image8 from "../assets/svgs/image8.svg";
// import image9 from "../assets/svgs/image9.svg";
import banner1 from "../public/images/banner-1.png";
import banner2 from "../public/images/banner-2.png";
import banner3 from "../public/images/banner-3.png";
import deals from "../public/svgs/deals.svg";
import drop from "../public/svgs/drop.svg";
import logo from "../public/svgs/logo.svg";
import location from "../public/svgs/location.svg";
import call from "../public/svgs/call.svg";
import message from "../public/svgs/message.svg";
import time from "../public/svgs/time.svg";
import app from "../public/svgs/app.svg";
import googleplay from "../public/svgs/googleplay.svg";
import paymentmethod from "../public/svgs/paymentmethod.svg";
import category1 from "../public/svgs/category1.svg";
import category2 from "../public/svgs/category2.svg";
import category3 from "../public/svgs/category3.svg";
import category4 from "../public/svgs/category4.svg";
import category5 from "../public/svgs/category5.svg";
// import product1 from "../assets/images/product1.png";
// import product2 from "../assets/images/product2.png";
// import product3 from "../assets/images/product3.png";
// import product4 from "../assets/images/product4.png";
// import product5 from "../assets/images/product5.png";
// import deal1 from "../assets/images/deal1.png";
// import deal2 from "../assets/images/deal2.png";
// import deal3 from "../assets/images/deal3.png";
// import deal4 from "../assets/images/deal4.png";
// import sell1 from "../assets/images/sell1.png";
// import sell2 from "../assets/images/sell2.png";
// import sell3 from "../assets/images/sell3.png";
// import sell4 from "../assets/images/sell4.png";
// import sell5 from "../assets/images/sell5.png";
// import sell6 from "../assets/images/sell6.png";
// import rating from "../assets/svgs/rating.svg";
// import ad1 from "../assets/svgs/ad1.svg";
// import ad2 from "../assets/svgs/ad2.svg";
// import ad3 from "../assets/svgs/ad3.svg";
// import ad4 from "../assets/svgs/ad4.svg";
// import cart from "../assets/svgs/cart.svg";

// export const products: Product[] = [
//   {
//     id: 1,
//     image: image1,
//     title: "Cake & Milk",
//     price: 26,
//     item: "item",
//     category: "Pet Foods",
//   },
//   {
//     id: 2,
//     image: image2,
//     title: "Oganic Kiwi",
//     price: 28,
//     item: "item",
//     category: "Fruits",
//   },
//   {
//     id: 3,
//     image: image3,
//     title: "Peach",
//     price: 14,
//     item: "item",
//     category: "Fruits",
//   },
//   {
//     id: 4,
//     image: image4,
//     title: "Red Apple",
//     price: 54,
//     item: "item",
//     category: "Fruits",
//   },
//   {
//     id: 5,
//     image: image6,
//     title: "Coffes & Tea",
//     price: 89,
//     item: "item",
//     category: "Coffes & Teas",
//   },
//   {
//     id: 6,
//     image: image7,
//     title: "Vegetables",
//     price: 72,
//     item: "item",
//     category: "Vegetables",
//   },
//   {
//     id: 7,
//     image: image8,
//     title: "Strawberry",
//     price: 36,
//     item: "item",
//     category: "Fruits",
//   },
//   {
//     id: 8,
//     image: image9,
//     title: "Black plum",
//     price: 123,
//     item: "item",
//     category: "Fruits",
//   },
// ];

// export const headings: Heading[] = [
//   { id: 1, title: "All" },
//   {
//     id: 2,
//     title: "Fruits",
//   },
//   {
//     id: 3,
//     title: "Coffes & Teas",
//   },
//   {
//     id: 4,
//     title: "Pet Foods",
//   },
//   {
//     id: 5,
//     title: "Vegetables",
//   },
// ];

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
    banner: "The best Organic & Clean Products Online",
    btn: "Shop Now",
    image: banner3,
  },
];

// export const popularproductheadings: PopularProductHeadings[] = [
//   {
//     id: 1,
//     title: "All",
//   },
//   {
//     id: 2,
//     title: "Snack",
//   },
//   {
//     id: 3,
//     title: "Hodo Foods",
//   },
//   {
//     id: 4,
//     title: "Pet Foods",
//   },
//   {
//     id: 5,
//     title: "Meats",
//   },
//   {
//     id: 6,
//     title: "Vegetables",
//   },
//   {
//     id: 7,
//     title: "Fruits",
//   },
// ];

// export const popluarproducts: PopularProducts[] = [
//   {
//     id: "1",
//     tag: "Hot",
//     image: product1,
//     category: "Snack",
//     title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
//     ratingimage: rating,
//     rating: "(4.0)",
//     by: "NestFood",
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "2",
//     tag: "Sale",
//     image: product2,
//     category: "Hodo Foods",
//     title: "All Natural Italian-Style Chicken Meatballs",
//     ratingimage: rating,
//     rating: "(3.5)",
//     by: "Stouffer",
//     newPrice: 52.85,
//     oldPrice: 55.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "3",
//     tag: "New",
//     image: product3,
//     category: "Snack",
//     title: "Angie’s Boomchickapop Sweet & Salty Kettle Corn",
//     ratingimage: rating,
//     rating: "(4.0)",
//     by: "StarKist",
//     newPrice: 48.85,
//     oldPrice: 52.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "4",
//     tag: "",
//     image: product4,
//     category: "Vegetables",
//     title: "Angie’s Boomchickapop Sweet & Salty Kettle Corn",
//     ratingimage: rating,
//     rating: "(4.0)",
//     by: "StarKist",
//     newPrice: 48.85,
//     oldPrice: 52.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "5",
//     tag: "-14%",
//     image: product5,
//     category: "Pet Foods",
//     title: "Angie’s Boomchickapop Sweet & Salty Kettle Corn",
//     ratingimage: rating,
//     rating: "(4.0)",
//     by: "StarKist",
//     newPrice: 48.85,
//     oldPrice: 52.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "3",
//     tag: "New",
//     image: product3,
//     category: "Snack",
//     title: "Angie’s Boomchickapop Sweet & Salty Kettle Corn",
//     ratingimage: rating,
//     rating: "(4.0)",
//     by: "StarKist",
//     newPrice: 48.85,
//     oldPrice: 52.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "1",
//     tag: "Hot",
//     image: product1,
//     category: "Snack",
//     title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
//     ratingimage: rating,
//     rating: "(4.0)",
//     by: "NestFood",
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "2",
//     tag: "Sale",
//     image: product2,
//     category: "Hodo Foods",
//     title: "All Natural Italian-Style Chicken Meatballs",
//     ratingimage: rating,
//     rating: "(3.5)",
//     by: "Stouffer",
//     newPrice: 52.85,
//     oldPrice: 55.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "5",
//     tag: "-14%",
//     image: product3,
//     category: "Meats",
//     title: "Angie’s Boomchickapop Sweet & Salty Kettle Corn",
//     ratingimage: rating,
//     rating: "(4.0)",
//     by: "StarKist",
//     newPrice: 48.85,
//     oldPrice: 52.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "2",
//     tag: "Sale",
//     image: product2,
//     category: "Fruits",
//     title: "All Natural Italian-Style Chicken Meatballs",
//     ratingimage: rating,
//     rating: "(3.5)",
//     by: "Stouffer",
//     newPrice: 52.85,
//     oldPrice: 55.8,
//     cartimage: cart,
//     cart: "Add",
//   },
// ];

// export const dailysells: DailyBestSells[] = [
//   { id: 0, title: "All" },
//   { id: 1, title: "Featured" },
//   { id: 2, title: "Popular" },
//   { id: 3, title: "New added" },
// ];

// export const dailydatas: DailySells[] = [
//   {
//     id: "1",
//     tag: "Save 35%",
//     image: product1,
//     category: "Featured",
//     title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
//     ratingimage: rating,
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     cartimage: cart,
//     cart: "Add",
//     sold: "Sold:",
//     soldnumber: "90/120",
//   },
//   {
//     id: "2",
//     tag: "Sale",
//     image: product2,
//     category: "Popular",
//     title: "All Natural Italian-Style Chicken Meatballs",
//     ratingimage: rating,
//     newPrice: 52.85,
//     oldPrice: 55.8,
//     cartimage: cart,
//     cart: "Add",
//     sold: "Sold:",
//     soldnumber: "90/120",
//   },
//   {
//     id: "3",
//     tag: "Best Sale",
//     image: product3,
//     category: "Featured",
//     title: "Angie’s Boomchickapop Sweet & Salty Kettle Corn",
//     ratingimage: rating,
//     newPrice: 48.85,
//     oldPrice: 52.8,
//     cartimage: cart,
//     cart: "Add",
//     sold: "Sold:",
//     soldnumber: "90/120",
//   },
//   {
//     id: "4",
//     tag: "Save 15%",
//     image: product4,
//     category: "New added",
//     title: "Angie’s Boomchickapop Sweet & Salty Kettle Corn",
//     ratingimage: rating,
//     newPrice: 48.85,
//     oldPrice: 52.8,
//     cartimage: cart,
//     cart: "Add",
//     sold: "Sold:",
//     soldnumber: "90/120",
//   },
// ];

// export const dealsheading: DealsHeading[] = [{ id: 0, title: "All Deals" }];

// export const dailydeals: DailyDeals[] = [
//   {
//     id: "1",
//     image: deal1,
//     title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
//     ratingimage: rating,
//     rating: "4.0",
//     by: "Nest Food",
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "2",
//     image: deal2,
//     title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
//     ratingimage: rating,
//     rating: "4.0",
//     by: "Nest Food",
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "3",
//     image: deal3,
//     title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
//     ratingimage: rating,
//     rating: "4.0",
//     by: "Nest Food",
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     cartimage: cart,
//     cart: "Add",
//   },
//   {
//     id: "4",
//     image: deal4,
//     title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
//     ratingimage: rating,
//     rating: "4.0",
//     by: "Nest Food",
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     cartimage: cart,
//     cart: "Add",
//   },
// ];
// export const mainheading: ProductsHeading[] = [
//   {
//     productheadings: [
//       "Top Selling",
//       "Trending Products",
//       "Recently added",
//       "Top Rated",
//     ],
//   },
// ];
// export const newproducts: Products[] = [
//   {
//     id: "1",
//     image: sell1,
//     image1: sell4,
//     title: "Nestle Original Coffee-Mate Coffee Creamer",
//     ratingimage: rating,
//     rating: "4.0",
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     category: "Top Selling",
//   },
//   {
//     id: "2",
//     image: sell2,
//     image1: sell5,
//     title: "Nestle Original Coffee-Mate Coffee Creamer",
//     ratingimage: rating,
//     rating: "4.0",
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     category: "Top Selling",
//   },
//   {
//     id: "3",
//     image: sell3,
//     image1: sell6,
//     title: "Nestle Original Coffee-Mate Coffee Creamer",
//     ratingimage: rating,
//     rating: "4.0",
//     newPrice: 28.85,
//     oldPrice: 32.8,
//     category: "Top Selling",
//   },
// ];

// export const advertise: Advertise[] = [
//   {
//     id: 1,
//     image: ad1,
//     title: "Best prices & offers",
//     order: "Orders $50 or more",
//   },
//   {
//     id: 2,
//     image: ad2,
//     title: "Best prices & offers",
//     order: "Orders $50 or more",
//   },
//   {
//     id: 3,
//     image: ad3,
//     title: "Best prices & offers",
//     order: "Orders $50 or more",
//   },
//   {
//     id: 4,
//     image: ad4,
//     title: "Best prices & offers",
//     order: "Orders $50 or more",
//   },
// ];

export const browseheading: BrowseHeading[] = [
  {
    id: 1,
    title: "Deals",
    image: deals,
  },
  {
    id: 4,
    title: "Shop",
    image: drop,
  },
  {
    id: 5,
    title: "Vendores",
    image: drop,
  },

  {
    id: 5,
    title: "Blog",
    image: drop,
  },
  {
    id: 6,
    title: "Pages",
    image: drop,
  },
  {
    id: 7,
    title: "Contact",
    image: "",
  },
];

export const footerfirst: FooterMain[] = [
  {
    image: logo,
    para: "Awesome grocery store website template",
  },
];

export const footersecond: FooterDetails[] = [
  {
    icon: location,
    detail:
      "Address: 5171 W Campbell Ave undefined Kent, Utah 53127 United States",
  },
  {
    icon: call,
    detail: " Call Us:(+91) - 540-025-124553",
  },
  {
    icon: message,
    detail: "Email:sale@Nest.com",
  },
  {
    icon: time,
    detail: "Hours:10:00 - 18:00, Mon - Sat",
  },
];

export const footerthird: FooterContent[] = [
  {
    mainheading: "Account",
    mainheading1: "Company",
    mainheading2: "Corporate",
    mainheading3: "Popular",
  },
];

export const footerheadings: FooterHeading[] = [
  {
    subheadings: "Sign In",
    subheadings1: "About us",
    subheadings2: "Become a Vendor",
    subheadings3: "Milk & Flavoured Milk",
  },
  {
    subheadings: "View Cart",
    subheadings1: "Delivery Information",
    subheadings2: "Affiliate Program",
    subheadings3: "Butter and Margarine",
  },
  {
    subheadings: "My Wishlist",
    subheadings1: "Privacy Policy",
    subheadings2: "Farm Business",
    subheadings3: "Eggs Substitutes",
  },
  {
    subheadings: "Track My Order",
    subheadings1: "Terms & Conditions",
    subheadings2: "Farm Careers",
    subheadings3: "Marmalades",
  },
  {
    subheadings: "Help Ticket",
    subheadings1: "Contact Us",
    subheadings2: "Our Suppliers",
    subheadings3: "Sour Cream and Dips",
  },
  {
    subheadings: "Shipping Details",
    subheadings1: "Support Center",
    subheadings2: "Accessibility",
    subheadings3: "Tea & Kombucha",
  },
  {
    subheadings: "Compare products",
    subheadings1: "Careers",
    subheadings2: "Promotions",
    subheadings3: "Cheese",
  },
];

export const footerapp: FooterApp[] = [
  {
    mainheading: "Install App",
    subheading: "From App Store or Google Play",
    image1: app,
    image2: googleplay,
    paymentheading: "Secured Payment Gateways",
    image3: paymentmethod,
  },
];

export const catrgories: Category[] = [
  {
    image: category1,
    title: "Milks & Dairies",
    quantity: 5,
  },
  {
    image: category2,
    title: "Clothing",
    quantity: 6,
  },
  {
    image: category3,
    title: "Pet Foods",
    quantity: 7,
  },
  {
    image: category3,
    title: "Baking material",
    quantity: 12,
  },
  {
    image: category3,
    title: "Fresh Fruit",
    quantity: 16,
  },
];
