import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link href={"/"}>
      <Image
        src={"/logo/pokedex.webp"}
        alt="logo"
        width={72}
        height={72}
        priority
      />
    </Link>
  );
};

export default Logo;
