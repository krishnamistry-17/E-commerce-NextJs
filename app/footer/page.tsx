import React from "react";
import Image from "next/image";
import Link from "next/link";
import phonecall from "../../public/svgs/phonecall.svg";
import fb from "../../public/svgs/fb.svg";
import insta from "../../public/svgs/insta.svg";
import twit from "../../public/svgs/twit.svg";
import pintress from "../../public/svgs/pintress.svg";
import youtube from "../../public/svgs/youtube.svg";
import logo from "../../public/svgs/logo.svg";
import app from "../../public/svgs/app.svg";
import googleplay from "../../public/svgs/googleplay.svg";
import paymentmethod from "../../public/svgs/paymentmethod.svg";

const Footer = () => {
  return (
    <div className="max-w-[1640px] mx-auto xl:px-[143px] px-2 xl:pt-[55px] pt-5">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 xl:gap-[50px] gap-5">
        <div className="flex flex-col xl:pl-0 pl-[12px]">
          <Link href="/">
            <Image src={logo} alt="logo" width={140} height={45} priority />
          </Link>
          <p className="pt-[17px] font-lato-regular-400 text-[17px] text-regalblue">
            Awesome grocery store website template
          </p>

          <div className="flex flex-col space-y-2 pt-[16px] text-[15px] font-lato-regular-400 text-regalblue">
            <p>
              Address: 5171 W Campbell Ave undefined Kent, Utah 53127 United
              States
            </p>
            <p>Call Us: (+91) - 540-025-124553</p>
            <p>Email: sale@Nest.com</p>
            <p>Hours: 10:00 - 18:00, Mon - Sat</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <p className="text-[24px] font-quick-bold-700 text-regalblue pl-[12px] pt-[15px]">
            Account
          </p>
          <div className="pt-[20px] flex flex-col gap-[13px] font-lato-regular-400 text-[15px] text-regalblue px-[12px]">
            <p>Sign In</p>
            <p>View Cart</p>
            <p>My Wishlist</p>
            <p>Track My Order</p>
            <p>Help Ticket</p>
            <p>Shipping Details</p>
            <p>Compare Products</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <p className="text-[24px] font-quick-bold-700 text-regalblue pl-[12px] pt-[15px]">
            Company
          </p>
          <div className="pt-[20px] flex flex-col gap-[13px] font-lato-regular-400 text-[15px] text-regalblue px-[12px]">
            <p>About Us</p>
            <p>Delivery Information</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Contact Us</p>
            <p>Support Center</p>
            <p>Careers</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <p className="text-[24px] font-quick-bold-700 text-regalblue pl-[12px] pt-[15px]">
            Corporate
          </p>
          <div className="pt-[20px] flex flex-col gap-[13px] font-lato-regular-400 text-[15px] text-regalblue px-[12px]">
            <p>Become a Vendor</p>
            <p>Affiliate Program</p>
            <p>Farm Business</p>
            <p>Farm Careers</p>
            <p>Our Suppliers</p>
            <p>Accessibility</p>
            <p>Promotions</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <p className="text-[24px] font-quick-bold-700 text-regalblue pl-[12px] pt-[15px]">
            Popular
          </p>
          <div className="pt-[20px] flex flex-col gap-[13px] font-lato-regular-400 text-[15px] text-regalblue px-[12px]">
            <p>Milk & Flavoured Milk</p>
            <p>Butter and Margarine</p>
            <p>Eggs Substitutes</p>
            <p>Marmalades</p>
            <p>Sour Cream and Dips</p>
            <p>Tea & Kombucha</p>
            <p>Cheese</p>
          </div>
        </div>

        <div className="flex flex-col pl-[12px] pt-[15px]">
          <p className="text-[24px] font-quick-bold-700 text-regalblue">
            Install App
          </p>

          <div className="flex items-center gap-[12px] pt-[30px]">
            <Image src={app} alt="appstore" width={128} height={42} />
            <Image src={googleplay} alt="googleplay" width={128} height={42} />
          </div>
          <p className="pt-[48px]">Secured Payment Gateways</p>
          <div className="pt-[20px]">
            <Image
              src={paymentmethod}
              alt="paymentmethod"
              width={224}
              height={32}
            />
          </div>
        </div>
      </div>

      <hr className="w-full border-b border-progessbtn my-8" />
      <div className="md:flex items-center justify-between pb-[34px]">
        <div className="flex flex-col">
          <p className="text-[14px] font-lato-regular-400 text-bgbrown">
            © 2022, Nest - HTML Ecommerce Template
            <br />
            All rights reserved
          </p>
        </div>

        <div className="lg:flex items-center gap-[32px] pt-[22px] md:pt-0">
          <div className="flex items-center gap-[12px]">
            <Image src={phonecall} alt="phone" width={30} height={38} />
            <div className="flex flex-col">
              <p className="text-[26px] font-quick-bold-700 text-shopbtn">
                1900 - 6666
              </p>
              <p className="text-[12px] font-lato-regular-400 text-bgbrown">
                Working 8:00 - 22:00
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[12px] pt-[22px] md:pt-0">
            <Image src={phonecall} alt="phone" width={30} height={38} />
            <div className="flex flex-col">
              <p className="text-[26px] font-quick-bold-700 text-shopbtn">
                1900 - 8888
              </p>
              <p className="text-[12px] font-lato-regular-400 text-bgbrown">
                24/7 Support Center
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col pt-[22px] md:pt-0">
          <div className="flex items-center gap-[14px]">
            <p className="text-[16px] font-quick-bold-700 text-regalblue">
              Follow Us
            </p>
            <div className="flex items-center gap-[5px]">
              <Image src={fb} alt="fb" width={30} height={30} />
              <Image src={twit} alt="twit" width={30} height={30} />
              <Image src={insta} alt="insta" width={30} height={30} />
              <Image src={pintress} alt="pintress" width={30} height={30} />
              <Image src={youtube} alt="youtube" width={30} height={30} />
            </div>
          </div>
          <p className="text-[14px] font-lato-regular-400 text-bgbrown">
            Up to 15% discount on your first subscribe
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
