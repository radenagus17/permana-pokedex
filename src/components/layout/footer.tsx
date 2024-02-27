import React, { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-[#fef9f5] py-7 text-center text-small dark:text-black">
      <h4>Copyright @2024 Permana Pokedex</h4>
    </footer>
  );
};

export default Footer;
