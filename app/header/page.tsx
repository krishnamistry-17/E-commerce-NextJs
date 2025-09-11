"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react";
import ThemeToggle from "../theme/page";
// import ThemeToggle from "../theme/page";
import cart from "../../public/svgs/cart.svg";
import CartIcon from "../pages/carticon/page";
import logo from "../../public/svgs/logo.svg";
import HeaderTop from "../headertop/page";
import { FaSearch } from "react-icons/fa";
import drop from "../../public/svgs/drop.svg";
import BrowseCategories from "../browsecategory/page";
import { browseheading } from "@/data/product";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

        <div className="md:flex hidden xl:w-[450px] lg:w-[401px] md:w-[350px] w-[250px] h-fit px-3 py-4 items-center border border-progessbtn rounded-[4px]">
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
          <Link href="/contact" className="">
            Contact
          </Link>
          <Link href="/blog" className="">
            Blog
          </Link>
          <Link href="/pages/cart">
            <Image src={cart} alt="cart" className="w-6 h-6" />
            <CartIcon />
          </Link>
          {/* <div>
            <ThemeToggle />
          </div> */}

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-1 rounded border border-black ">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-1 rounded border border-black ">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/user-profile"
              className="px-4 py-1 rounded border border-black lg:block hidden"
            >
              User Profile
            </Link>
            <SignOutButton>
              <button className="px-4 py-1 rounded border border-black lg:block hidden">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <SignedIn>
            <SignOutButton>
              <button className="text-sm px-3 py-1 rounded border border-black lg:block hidden">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm px-3 py-1 rounded border border-black ">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-sm px-3 py-1 rounded border border-black ">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <Link href="/pages/cart">
            <Image src={cart} alt="cart" className="w-6 h-6" />
            <CartIcon />
          </Link>

          <button onClick={toggleMenu} aria-label="Menu">
            <SlOptionsVertical size={22} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-[60px] md:right-4 right-1 w-[105px] bg-white border border-gray-200 rounded-md shadow-md p-4 z-50 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm">
              <SignedIn>
                <Link href="/user-profile" className="pl-[9px]">
                  Profile
                </Link>
              </SignedIn>
              <SignedIn>
                <SignOutButton>
                  <button>Sign Out</button>
                </SignOutButton>
              </SignedIn>
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
