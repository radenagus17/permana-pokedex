"use client";

import React, { FC } from "react";
import { Button } from "@nextui-org/react";
import { CiCloudMoon, CiCloudSun } from "react-icons/ci";
import { useTheme } from "next-themes";

interface ThemeTogglerProps {}

const ThemeToggler: FC<ThemeTogglerProps> = ({}) => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="bordered"
      radius="full"
      isIconOnly
      aria-label="TogglerTheme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <CiCloudSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <CiCloudMoon className="h-[1.2rem] w-[1.2rem] absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default ThemeToggler;
