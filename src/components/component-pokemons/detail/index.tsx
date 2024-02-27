"use client";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Code,
  CardFooter,
  Image,
  Checkbox,
  Chip,
  useDisclosure,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import hexToRgba from "hex-to-rgba";
import colourNameToHex from "@/constants/colorNameToHex";
import { IoMdHeart } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import ModalDetail from "./modalDetail";
import { MyContext, MyContextType } from "@/app/providers";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface DetailCardPokemonProps {
  detail_pokemon: any;
}

const DetailCardPokemon: FC<DetailCardPokemonProps> = ({ detail_pokemon }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    favorites,
    updateFavorite,
    compare,
    setupCompare,
    handleOverloadCompare,
  } = useContext<MyContextType>(MyContext);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isBubbleCompare, setIsBubbleCompare] = useState<boolean>(false);
  const [bubble, setIsBubble] = useState<boolean>(false);
  const router = useRouter();

  const {
    id,
    name,
    sprites: { other },
    bgColor,
    desc,
    height,
    weight,
    types,
    abilities,
    stats,
    evolution,
  } = detail_pokemon;

  const checkIdPokemon = () => {
    if (Array.isArray(favorites)) {
      const fav = favorites.find((el) => el.id === id);
      if (fav) setIsFavorite(true);
    }
  };

  const handleBubbleCompare = (key: string): void => {
    if (key === "compare") {
      setupCompare(detail_pokemon);
      Swal.fire({
        title: "Added Pokemon!",
        text: "You are throw pokemon to compare it",
        icon: "success",
      });
    } else {
      router.push("/compare-pokemon");
    }
  };

  useEffect(() => {
    checkIdPokemon();

    if (Array.isArray(compare) && compare.length > 2) {
      Swal.fire({
        title: "Error!",
        text: "You can't compare more than two",
        icon: "error",
        confirmButtonText: "Cool",
      }).then(() => handleOverloadCompare());
    }

    let timer = setTimeout(() => {
      setIsBubble(true);
      setTimeout(() => {
        setIsBubbleCompare(true);
      }, 3000);
    }, 2500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compare]);

  return (
    <article className="py-12 relative">
      <section className="container mx-auto">
        <Card
          isFooterBlurred
          className="max-w-screen-md mx-auto xl:h-[38rem] h-[30rem] col-span-12 sm:col-span-5"
        >
          <CardHeader className="absolute z-10 top-1 flex justify-between items-center">
            <section className="space-y-1">
              <p className="text-small text-black dark:text-white uppercase font-bold">
                #{id}
              </p>
              <h4 className="text-black drop-shadow-sm font-medium text-2xl capitalize dark:text-white">
                {name}
              </h4>
              <div className="flex gap-2 text-small">
                {types.map((el: any, idx: number) => (
                  <Chip
                    key={idx}
                    size="sm"
                    color="primary"
                    startContent={<FaCheck />}
                  >
                    {el.type.name}
                  </Chip>
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-y-3">
              {abilities.map((el: any, idx: number) => (
                <Chip variant="shadow" color="warning" key={idx}>
                  {el.ability.name}
                </Chip>
              ))}
            </section>
          </CardHeader>
          <Image
            removeWrapper
            isZoomed
            alt={name + ".png"}
            style={{
              backgroundColor: hexToRgba(
                colourNameToHex(bgColor) ?? "FFFFFF",
                0.2
              ),
            }}
            className="z-0 w-full h-full object-contain cursor-zoom-in"
            src={other["official-artwork"].front_default}
            onClick={() => onOpen()}
          />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div className="flex flex-col gap-y-1">
              <Code color="warning" className="text-black text-tiny">
                Height: {height}
              </Code>
              <Code color="warning" className="text-black text-tiny">
                Weight: {weight}
              </Code>
            </div>
            <p className="text-small max-w-96 hidden sm:block">
              <q>{desc[3].flavor_text}</q>
            </p>
            <Checkbox
              size="md"
              color="danger"
              icon={<IoMdHeart />}
              isSelected={isFavorite}
              onClick={() => {
                updateFavorite(detail_pokemon);
                setIsFavorite(!isFavorite);
              }}
            >
              <p className="text-red-500 font-medium">Favorite</p>
            </Checkbox>
          </CardFooter>
        </Card>
        <ModalDetail
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          stats={stats}
          evolution={evolution}
        />
      </section>
      {bubble && (
        <div className="fixed bottom-10 xl:right-20 right-10 h-20 z-20">
          <Popover placement="top" showArrow={true}>
            <PopoverTrigger>
              <Button
                className={`${
                  isBubbleCompare
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                } transition-all duration-400 text-white`}
                radius="full"
                variant="shadow"
                color="success"
              >
                Action
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Listbox
                className="py-2"
                aria-label="Actions"
                onAction={(Key) => handleBubbleCompare(Key as string)}
              >
                <ListboxItem
                  key="compare"
                  color="success"
                  className="text-success"
                >
                  Compare This Pokemon
                </ListboxItem>
                <ListboxItem key="check" className="text-gray-500">
                  Check Compare
                </ListboxItem>
              </Listbox>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </article>
  );
};

export default DetailCardPokemon;
