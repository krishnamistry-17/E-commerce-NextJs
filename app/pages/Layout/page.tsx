import React from "react";

const Layout = () => {
  return <div className="max-w-[1640px] mx-auto"></div>;
};

export default Layout;


{/*import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAppDispatch } from "../redux/store";
import { getCities } from "../redux/city/slice";

interface RootLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: RootLayoutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getCities({ searchTerm: "" }));
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      {children}
      <div>
        <div className="p-3 flex justify-center gap-2 text-2xl text-center bg-purple1 text-white">
          <span>Empowering traders, unlocking opportunities!</span>
          {/* <img src="/assets/svgs/india-flag.svg" alt="India flag icon" /> */}
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Layout;
//  */}