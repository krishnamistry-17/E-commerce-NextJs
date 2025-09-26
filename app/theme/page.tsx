// "use client";

// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
// export default function ThemeToggle() {
//   const [ setMount] = useState(false);
//   const { systemTheme, theme, setTheme } = useTheme();
//   const currentTheme = theme === "system" ? systemTheme : theme;

//   useEffect(() => {
//     setMount(true);
//   }, [setMount]);


//   return (
//     <button
//       onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
//       type="button"
//       className=" py-2 focus:outline-none ring-0"
//     >
//       {currentTheme === "dark" ? "☀️" : "🌙"}
//     </button>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page