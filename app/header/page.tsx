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
import cart from "../../assets/svgs/cart.svg";
import CartIcon from "../pages/carticon/page";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <nav
        className="w-full border-b border-gray-200  shadow-sm 
    md:px-4 px-2 py-3 flex justify-between items-center relative"
      >
        <Link href="/" className="flex items-center gap-2 bg-white p-2">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={38}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/about" className="">
            About
          </Link>
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
          <div>
            <ThemeToggle />
          </div>

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
              <button className="px-4 py-1 rounded border border-black ">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <SignedIn>
            <div>
              <ThemeToggle />
            </div>
            <SignOutButton>
              <button className="text-sm px-3 py-1 rounded border border-black ">
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

          <button onClick={toggleMenu} aria-label="Menu">
            <SlOptionsVertical size={22} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-[60px] right-4 w-50 bg-white border border-gray-200 rounded-md shadow-md p-4 z-50 md:hidden">
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/about" className="">
                About
              </Link>
              <Link href="/contact" className="">
                Contact
              </Link>
              <Link href="/blog" className="">
                Blog
              </Link>
              <Link href="/pages/cart">Cart</Link>
              <SignedIn>
                <Link href="/user-profile" className=" ">
                  Profile
                </Link>
              </SignedIn>
            </nav>
          </div>
        )}
      </nav>
    </>
  );
}
