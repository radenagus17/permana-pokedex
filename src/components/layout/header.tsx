import React, { FC, useEffect, useState } from "react";
import Logo from "./logo";
import Nav from "./nav";
import ThemeToggler from "../ThemeToggler";
import MobileNav from "./mobileNav";
import { usePathname } from "next/navigation";

interface headerProps {}

const Header: FC<headerProps> = ({}) => {
  const [header, setHeader] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    var f = () => (window.scrollY > 50 ? setHeader(true) : setHeader(false));
    window.addEventListener("scroll", f);

    return () => window.removeEventListener("scroll", f);
  });

  return (
    <header
      className={`${
        header ? "py-4 dark:bg-black shadow-lg" : "py-6 dark:bg-transparent"
      } sticky top-0 z-30 transition-all bg-[#fef9f5]`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-x-6">
            {/* nav */}
            <Nav
              containerStyles={"hidden xl:flex gap-x-8 items-center"}
              linkStyles="relative hover:text-primary transition-all"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
            />
            <ThemeToggler />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
