"use client";
import React, { FC, useState } from "react";

import Nav, { LinksType, links } from "./nav";
import Logo from "./logo";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavProps {}

const navVariants = {
  hidden: {
    clipPath: "circle(5.8% at 50% 0)",
    opacity: 0,
    transition: {
      type: "spring",
      delay: 0.2,
      stiffness: 300,
      damping: 1,
    },
  },
  show: {
    opacity: 1,
    clipPath: "circle(130% at 50% 0)",
    transition: {
      type: "spring",
      stiffness: 80,
    },
  },
};

const MobileNav: FC<MobileNavProps> = ({}) => {
  const [nav, setNav] = useState<boolean>(false);
  const path = usePathname();

  return (
    <>
      <motion.div
        variants={fadeIn("down", "tween", 1, 1.4)}
        className={`${
          nav ? "gap-y-0" : "gap-y-1"
        } xl:hidden flex flex-col items-center justify-center w-10 h-10 p-3 lg:order-none cursor-pointer border-2 rounded-full border-default`}
        onClick={() => setNav(!nav)}
      >
        {/* bar 1*/}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: nav ? -45 : 0, translateY: nav ? 2 : 0 }}
          className="w-full h-[1.3px] bg-gray-800 dark:bg-white"
        />
        {/* bar 2*/}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: nav ? 45 : 0 }}
          className="w-full h-[1.3px] bg-gray-800 dark:bg-white"
        />
      </motion.div>
      <motion.div
        variants={navVariants}
        initial="hidden"
        animate={nav ? "show" : ""}
        className="absolute xl:hidden bg-[#fef9f5] w-[310px] rig h-[50vh] right-[4.5%] lg:right-0 top-[99px] bottom-0 z-50 rounded-lg shadow-xl"
      >
        <div className="flex flex-col items-center gap-y-16 py-14">
          <Logo />
          <div className="flex flex-col items-center gap-y-7">
            {links.map((item: LinksType, i: number) => (
              <Link
                key={item.name + i}
                href={item.path}
                className={`relative hover:text-primary text-black transition-all capitalize text-2xl`}
              >
                {item.path === path && (
                  <span
                    className={`absolute left-0 top-full h-[2px] bg-primary w-full`}
                  />
                )}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MobileNav;
