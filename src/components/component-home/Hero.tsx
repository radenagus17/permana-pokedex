"use client";

import React, { FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Link } from "react-scroll";

const slides = [
  {
    title: "Explore the Best Pokemon",
    bg: "/images/wall-poke1.jpg",
    btnText: "Popular Pokemon",
  },
  {
    title: "Take your Favorite Pokemon",
    bg: "/images/wall-poke2.png",
    btnText: "Popular Pokemon",
  },
  {
    title: "Compare it with other Pokemon",
    bg: "/images/wall-poke3.jpg",
    btnText: "Popular Pokemon",
  },
];

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect="fade"
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      className="heroSlider h-[600px] lg:h-[860px]"
      loop={true}
    >
      {slides.map((slide, index) => {
        // destructure slide
        const { title, bg, btnText } = slide;
        return (
          <SwiperSlide
            className="h-full relative flex justify-center items-center"
            key={index}
          >
            <div className="absolute inset-0 flex items-center justify-center flex-col z-50 text-center text-white">
              <div className="uppercase tracking-[6px] mb-5">
                Welcome to Permana Pokedex
              </div>
              <h1 className="text-[32px] uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6">
                {title}
              </h1>
              {/* btn */}
              <Link
                to={"popular"}
                smooth
                duration={500}
                className="px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 dark:bg-foreground-500 dark:hover:bg-foreground-400 cursor-pointer"
              >
                {btnText}
              </Link>
            </div>
            <div className="absolute -z-10 h-full w-full">
              <Image
                src={bg}
                alt={title}
                fill
                priority
                className="object-cover h-full w-full"
              />
            </div>
            {/* overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Hero;
