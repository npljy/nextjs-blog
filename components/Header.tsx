"use client";

import BlogName from "./Name";
import Nav from "./Nav";
import { usePathname } from "next/navigation";
import ThemeSwitch from "@/components/ThemeToggle";
import LoginInOut from "./LoginOutBtn";
import { SessionProvider } from "next-auth/react";
import { useTheme } from "next-themes";
export default function Header() {
  const path = usePathname();
  return (
    path !== "/login" && (
      <div className="sticky top-0 z-10 px-20">
        <SessionProvider>
          <header className="flex justify-between py-2 items-center">
            <BlogName />
            <div className="flex items-center">
              <Nav />
              <ThemeSwitch />
              <LoginInOut />
            </div>
          </header>
        </SessionProvider>
      </div>
    )
  );
}
