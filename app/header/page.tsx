"use client";

import Link from "next/link";
import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useState } from "react";
import CartIcon from "../pages/carticon/page";
import logo from "../../public/svgs/logo.svg";
import HeaderTop from "../headertop/page";
import fillwish from "../../public/svgs/fillwish.svg";
import BrowseCategories from "../browsecategory/page";
import WishListIcon from "../pages/wishlisticon/page";
import { useRouter } from "next/navigation";
import Search from "../pages/search/page";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout, setAccessToken, setUser } from "../store/authSlice";
import useWindowWidth from "../hooks/useWindowWidth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const windowWidth = useWindowWidth();

  // const handleOutsideClick = (event: MouseEvent) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //     setIsSubMenuOpen(false);
  //   }
  //   if (
  //     mobileMenuRef.current &&
  //     !mobileMenuRef.current.contains(event.target as Node)
  //   ) {
  //     setIsMobileMenuOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   if (windowWidth >= 1024) {
  //     setIsMobileMenuOpen(false);
  //   }
  // }, [windowWidth]);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => document.removeEventListener("mousedown", handleOutsideClick);
  // }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      dispatch(setAccessToken(storedToken));
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    router.push("/signin");
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div>
        <HeaderTop />
      </div>
      <nav
        className="w-full border-b border-gray-200  shadow-sm 
    md:px-4 px-2 py-3 flex justify-between items-center relative"
      >
        <Link href="/" className="flex items-center gap-2 bg-white p-2">
          <Image src={logo} alt="logo" width={140} height={45} priority />
        </Link>

        <div className="md:block hidden">
          <Search />
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="/pages/contact" className="">
            Contact
          </Link>
          <Link href="/pages/blog" className="">
            Blog
          </Link>
          <Link href="/pages/cart">
            {/* <Image src={cart} alt="cart" className="w-6 h-6" /> */}
            <CartIcon />
          </Link>

          {accessToken ? (
            <>
              <div onClick={() => router.push("/user-profile")}>
                <button className="px-4 py-1 rounded border border-black ">
                  User Profile
                </button>
              </div>
              <div>
                <button
                  onClick={handleLogout}
                  type="submit"
                  className="px-4 py-1 rounded border border-black "
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/signin")}
                className="px-4 py-1 rounded border border-black "
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="px-4 py-1 rounded border border-black "
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <div className="lg:hidden flex items-center gap-[13px]">
          <Link href={"/pages/wishlist"}>
            <Image src={fillwish} alt="fillwish" className="w-6 h-6" />
            <WishListIcon />
          </Link>

          <Link href="/pages/cart">
            {/* <Image src={cart} alt="cart" className="w-6 h-6" /> */}
            <CartIcon />
          </Link>

          <button onClick={toggleMenu} aria-label="Menu">
            <SlOptionsVertical size={22} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-[60px] md:right-4 right-1 w-[120px] bg-white border border-gray-200 rounded-md shadow-md p-4 z-50 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm text-start">
              <Link href="/pages/aboutus" onClick={() => setIsMenuOpen(false)}>
                About us
              </Link>
              <Link href="/pages/blog" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/pages/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>

              {accessToken ? (
                <>
                  <div onClick={() => router.push("/user-profile")}>
                    <button className=" py-1 text-start ">User Profile</button>
                  </div>
                  <div>
                    <button
                      onClick={handleLogout}
                      type="submit"
                      className=" py-1 text-start "
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/signin")}
                    className=" py-1 text-start "
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push("/signup")}
                    className=" py-1 text-start "
                  >
                    Sign Up
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </nav>
      <div className="md:hidden">
        <BrowseCategories />
      </div>
    </>
  );
};

export default Navbar;

{
  /*
  
  "use server";
  
  import { stripe } from "@/lib/stripe";
  import { CartItem } from "../slice/cartSlice";
  
  export const chekoutaction = async (formData: FormData): Promise<string> => {
    const itemJson = formData.get("item") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
  
    if (!itemJson || !paymentMethod || !firstName || !lastName || !email) {
      throw new Error("Missing required fields");
    }
  
    const items: CartItem[] = JSON.parse(itemJson);
  
    const line_items = items.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.newPrice * 100),
        product_data: {
          name: item.title,
        },
      },
      quantity: item.quantity,
    }));
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.NEXT_URL}/`,
      cancel_url: `${process.env.NEXT_URL}/`,
    });
  
    return session.url!;
  };
  ///////???
  "use client";
  
  import React, { useState } from "react";
  import right from "../../../public/svgs/right.svg";
  import home from "../../../public/svgs/home.svg";
  import coupen from "../../../public/svgs/coupen.svg";
  import shipping from "../../../public/svgs/shipping.svg";
  import { useRouter } from "next/navigation";
  import Image from "next/image";
  import { useSelector } from "react-redux";
  import { toast } from "react-toastify";
  import { chekoutaction } from "./checkout-action";
  import { RootState } from "@/app/store/store";
  
  const CheckOut = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [agreed, setAgreed] = useState(false);
    const router = useRouter();
    const [fname, setFName] = useState<string>("");
    const [lname, setLName] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zipcode, setZipCode] = useState<string>("");
    const [phone, setphone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
  
    const handlePaymentChange = (method: string) => {
      setPaymentMethod(method);
    };
  
    const handleDetails = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (
        !fname ||
        !lname ||
        !company ||
        !country ||
        !street ||
        !city ||
        !state ||
        !zipcode ||
        !phone ||
        !email
      ) {
        toast.info("Please fill all details");
        return;
      }
  
      if (!paymentMethod) {
        toast.error("Please select a payment method.");
        return;
      }
  
      if (!agreed) {
        toast.error("You must agree to the terms and conditions.");
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append("item", JSON.stringify(cartItems));
        formData.append("paymentMethod", paymentMethod);
        formData.append("firstName", fname);
        formData.append("lastName", lname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("country", country);
        formData.append("street", street);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zipcode", zipcode);
  
        //  Call server action and get Stripe session URL
        const sessionUrl = await chekoutaction(formData);
  
        //  Redirect browser to Stripe
        window.location.href = sessionUrl;
      } catch (err) {
        toast.error("Something went wrong during checkout.");
        console.error(err);
      }
    };
  
    return (
      <div className="max-w-[1540px] mx-auto xl:px-[143px] px-2 pt-[20px]">
        <div className="flex items-center gap-[3px]">
          <div
            className="flex items-center gap-[8px]"
            onClick={() => router.push("/")}
          >
            <Image src={home} alt="home" width={14} height={14} />
            <p className="text-[14px] text-shopbtn font-quick-semibold-600 md:block hidden cursor-pointer">
              Home
            </p>
            <Image src={right} alt="right" width={19} height={24} />
          </div>
          <div
            className="flex items-center gap-[8px]"
            onClick={() => router.push("/pages/cart")}
          >
            <p className="text-[14px] text-shopbtn font-quick-semibold-600 md:block hidden cursor-pointer">
              Cart
            </p>
            <Image src={right} alt="right" width={19} height={24} />
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] text-bgbrown font-quick-semibold-600">
              CheckOut
            </p>
          </div>
        </div>
        <div className=" w-full bg-bgcheckout py-[20px] px-[20px]">
          <div className="flex items-center gap-[5px]">
            <Image src={coupen} alt="coupen" width={20} height={20} />
            <div className=" border border-bordercolor1 w-full">
              <p className="text-[12px] text-regalblue font-quick-medium-500 py-[18px] pl-[18px]">
                Have a coupon? Click here to enter your code
              </p>
            </div>
          </div>
        </div>
        <div className="flex  gap-[15px] pt-[30px]">
          <div className="max-w-[980px] w-full ">
            <div className="bg-bgpink px-[15px] py-[19px] rounded-[5px] border border-pinkbg">
              <div className="flex items-center gap-[5px] pb-[19px]">
                <Image src={shipping} alt="image" width={20} height={20} />
                <p className="text-[13px] font-quick-bold-700 text-regalblue">
                  Add<span className="text-red-700">$299.11</span> to cart and get
                  free shipping!
                </p>
              </div>
              <div className="w-full border border-pinkbg rounded-sm">
                <div className="w-full bg-pinkbg h-[5px]"></div>
              </div>
            </div>
  
            <div className="pt-[15px]">
              <form>
                <p className="text-[15px] lg:text-[18px] xl:text-[22px] font-quick-bold-700  text-regalblue">
                  Billing details
                </p>
                <div className="w-full">
                  <div className="flex items-center gap-[20px] w-full">
                    <div className="flex flex-col w-full">
                      <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                        First Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={fname}
                        onChange={(e) => setFName(e.target.value)}
                        className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                        text-[12px] font-quick-medium-500 text-regalblue
                        "
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                        Last Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={lname}
                        onChange={(e) => setLName(e.target.value)}
                        className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                        text-[12px] font-quick-medium-500 text-regalblue
                        "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      Company Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      Country / Region<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      Street address<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="House number and street name"
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                    <div className="pt-[8px]">
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                        text-[12px] font-quick-medium-500 text-regalblue
                        "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      Town / City<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      State<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      ZIP Code<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      value={zipcode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      Phone<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      Email address<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-[8px] py-[8px] px-3 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                  <div className="flex items-center gap-[5px] py-[8px]">
                    <input type="checkbox" />
                    <p className="text-[14px] font-quick-medium-500 text-regalblue">
                      Create an account?
                    </p>
                  </div>
                  <div className="flex items-center gap-[5px] py-[8px]">
                    <input type="checkbox" />
                    <p className="text-[14px] font-quick-bold-700 text-regalblue">
                      Ship to a different address?
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] md:text-[16px] font-quick-bold-700 text-regalblue py-[8px]">
                      Order notes (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      className="w-full border border-gray-300 rounded-[8px] py-[30px] pl-2 focus:outline-none 
                      text-[12px] font-quick-medium-500 text-regalblue
                      "
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
  
          <div className="max-w-[380px] w-full h-fit border border-bordercolor rounded-[6px] bg-gray-50">
            <div className="flex flex-col px-[21px]">
              <p className="text-[15px] font-quick-bold-700 text-regalblue py-[21px] ">
                Your Order
              </p>
  
              <form onSubmit={handleDetails}>
              
                <div className="flex items-center justify-between py-[15px] border-b border-bordercolor1">
                  <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                    Product
                  </p>
                  <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                    Subtotal
                  </p>
                </div>
  
        
                <div className="py-[12px]">
                  {cartItems.map((item, index) => (
                    <div key={index} className="mb-[12px]">
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] font-quick-semibold-600 text-regalblue">
                          {item.title} x{item.quantity}
                        </p>
                        <p className="text-[14px] font-quick-semibold-600 text-regalblue">
                          ${item.newPrice * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
  
        
                  <div className="flex items-center justify-between py-[10px] border-t border-bordercolor1">
                    <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                      Subtotal
                    </p>
                    <p className="text-[12px] font-quick-semibold-600 text-bgbrown">
                      $
                      {cartItems.reduce(
                        (acc, item) => acc + item.newPrice * item.quantity,
                        0
                      )}
                    </p>
                  </div>
    
                  <div className="flex items-center justify-between py-[10px] border-t border-bordercolor1">
                    <p className="text-[14px] font-quick-bold-700 text-bgbrown">
                      Total
                    </p>
                    <p className="text-[16px] font-quick-bold-700 text-regalblue">
                      $
                      {cartItems.reduce(
                        (acc, item) => acc + item.newPrice * item.quantity,
                        0
                      )}
                    </p>
                  </div>
                </div>
  
              
                <div className="flex flex-col py-[12px]">
              
                  <div className="flex items-start gap-[5px]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => handlePaymentChange("bank")}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-[16px] font-quick-semibold-600 text-regalblue">
                        Direct bank transfer
                      </p>
                      {paymentMethod === "bank" && (
                        <p className="text-[15px] font-quick-medium-500 text-bgbrown py-[6px]">
                          Make your payment directly into our bank account. Please
                          use your Order ID as the payment reference. Your order
                          will not be shipped until the funds have cleared in our
                          account.
                        </p>
                      )}
                    </div>
                  </div>
  
                  <div className="flex items-start gap-[5px] mt-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => handlePaymentChange("cod")}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-[16px] font-quick-semibold-600 text-regalblue">
                        Cash on delivery
                      </p>
                      {paymentMethod === "cod" && (
                        <p className="text-[15px] font-quick-medium-500 text-bgbrown py-[6px]">
                          Your personal data will be used to process your order,
                          support your experience throughout this website, and for
                          other purposes described in our privacy policy.
                        </p>
                      )}
                    </div>
                  </div>
  
                
                  <div className="flex items-start gap-[5px] mt-3">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1"
                    />
                    <p className="text-[15px] font-quick-semibold-600 text-regalblue">
                      I have read and agree to the website
                      <span className="text-purple block">
                        terms and conditions
                      </span>
                    </p>
                  </div>
                </div>
  
                <input
                  type="hidden"
                  name="item"
                  value={JSON.stringify(cartItems)}
                />
                <div className="flex items-center justify-center px-[12px] py-[12px]">
                  <button
                    type="submit"
                    className="text-white text-[16px] font-quick-bold-700 bg-purple rounded-[5px] w-full py-[6px]"
                    disabled={!agreed || !paymentMethod}
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CheckOut;
  ///////////////////////////
  const someApiCall = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("No access token found, user is not authenticated.");
    return;
  }

  try {
    const response = await axiosInstance.get("/some-protected-route", {
      headers: {
        Authorization: `Bearer ${accessToken}`,  // Use the token from localStorage
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

return (
  <div>
    <h2>Categories</h2>
    <div className="categories-list">
      {categories.map((categoryItem) => (
        <div key={categoryItem._id} className="category-section">
          <h3>{categoryItem.category}</h3>
          <Image
            src={categoryItem.image}
            alt={categoryItem.category}
            width={200}
            height={100}
          />
          <div className="products-list">
            {categoryItem.categoryProduct.map((product) => (
              <div key={product._id} className="product-card">
                <Image
                  src={product.image}
                  alt={product.productName}
                  width={100}
                  height={100}
                />
                <p>{product.productName}</p>
                <p>Price: {product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

  
  */
}
