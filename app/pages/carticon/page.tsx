import Image from "next/image";
import Link from "next/link";
import cartIcon from "@/public/svgs/cart.svg";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const products = useSelector((state: any) => state.cart.products || []);
  const cartCount = products.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  );

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     if (!accessToken) return;

  //     try {
  //       const res = await axiosInstance.get(apiRoutes.GET_CART);
  //       const items = res.data.products || [];
  //       const totalQuantity = items.reduce(
  //         (acc: number, item: any) => acc + item.quantity,
  //         0
  //       );
  //       setCartCount(totalQuantity);
  //     } catch (err) {
  //       console.error("Failed to fetch cart", err);
  //     }
  //   };

  //   fetchCart(); // initial

  //   const handleCartUpdate = () => fetchCart();

  //   window.addEventListener("cartUpdated", handleCartUpdate);
  //   return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  // }, []);

  return (
    <div>
      <Link href="/pages/cart">
        <div className="relative cursor-pointer">
          <Image src={cartIcon} alt="cart" width={25} height={25} />
          {cartCount > 0 && (
            <span className="absolute top-[-10px] -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount?.quantity}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;
