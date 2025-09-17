"use client";

import Link from "next/link";
import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react";
import cart from "../../public/svgs/cart.svg";
import CartIcon from "../pages/carticon/page";
import logo from "../../public/svgs/logo.svg";
import HeaderTop from "../headertop/page";
import { FaSearch } from "react-icons/fa";
import fillwish from "../../public/svgs/fillwish.svg";
import BrowseCategories from "../browsecategory/page";
import { browseheading } from "@/data/product";
import WishListIcon from "../pages/wishlisticon/page";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../pages/store";
import { logout } from "../pages/slice/authSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user ????:", user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

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

        <div
          className="md:flex hidden xl:w-[450px] lg:w-[401px] md:w-[350px] w-[250px] h-fit 
        px-3 py-4 items-center border border-progessbtn rounded-[4px]"
        >
          <div className="flex items-center w-full bg-white rounded-[50px] ">
            <input
              type="search"
              placeholder="Search for items.."
              className="flex-grow bg-transparent outline-none text-inputtext"
            />

            <FaSearch className="text-gray-500 mr-2 ml-3" />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="/pages/contact" className="">
            Contact
          </Link>
          <Link href="/pages/blog" className="">
            Blog
          </Link>
          <Link href="/pages/cart">
            <Image src={cart} alt="cart" className="w-6 h-6" />
            <CartIcon />
          </Link>

          {!user ? (
            <>
              <div onClick={() => router.push("/signin")}>
                <button className="px-4 py-1 rounded border border-black ">
                  Sign In
                </button>
              </div>
              <div onClick={() => router.push("/signup")}>
                <button className="px-4 py-1 rounded border border-black ">
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <>
              <div onClick={() => router.push("/user-profile")}>
                <button className="px-4 py-1 rounded border border-black ">
                  User Profile
                </button>
              </div>
              <div onClick={() => router.push("/")}>
                <button
                  className="px-4 py-1 rounded border border-black "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

        <div className="lg:hidden flex items-center gap-[13px]">
          <Link href={"/page/wishlist"}>
            <Image src={fillwish} alt="fillwish" className="w-6 h-6" />
            <WishListIcon />
          </Link>

          <Link href="/pages/cart">
            <Image src={cart} alt="cart" className="w-6 h-6" />
            <CartIcon />
          </Link>

          <button onClick={toggleMenu} aria-label="Menu">
            <SlOptionsVertical size={22} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-[60px] md:right-4 right-1 w-[120px] bg-white border border-gray-200 rounded-md shadow-md p-4 z-50 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm text-start">
              <Link href={"/pages/aboutus"}>About us</Link>
              <Link href={"/pages/blog"}>Blog</Link>
              <Link href={"/pages/contact"}>Contact</Link>
              {!user ? (
                <>
                  <div onClick={() => router.push("/signin")}>
                    <button className="">Sign In</button>
                  </div>
                  <div onClick={() => router.push("/signup")}>
                    <button className="">Sign Up</button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/user-profile" className="">
                    Profile
                  </Link>
                  <button
                    className="text-start"
                    onClick={() => {
                      dispatch(logout());
                      router.push("/");
                    }}
                  >
                    Sign Out
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </nav>
      <div>
        <BrowseCategories browseheading={browseheading} />
      </div>
    </>
  );
}
