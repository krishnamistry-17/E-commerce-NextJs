"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [mount, setMount] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMount(true);
  }, []);


  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      type="button"
      className=" py-2 focus:outline-none ring-0"
    >
      {currentTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
