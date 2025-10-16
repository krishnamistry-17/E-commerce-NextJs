import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "../app/header/page";
import Footer from "./footer/page";
import Providers from "./Providers";
import {
  quicksandBold,
  quicksandSemiBold,
  quicksandMedium,
  quicksandRegular,
  quicksandLight,
  latoRegular,
  latoBold,
} from "./fonts";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} ${quicksandBold.variable} ${quicksandSemiBold.variable} ${quicksandMedium.variable} ${quicksandRegular.variable} ${quicksandLight.variable} ${latoRegular.variable} ${latoBold.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
