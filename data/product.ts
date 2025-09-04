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
