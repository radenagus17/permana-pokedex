"use client";

import React, { FC, useContext } from "react";
import { FaHeart } from "react-icons/fa6";
import { Button, Divider } from "@nextui-org/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MyContext } from "@/app/providers";
import { useRouter } from "next/navigation";
import PokemonCards from "@/ui/PokemonCards";

interface FavoritePokemonProps {}

const FavoritePokemon: FC<FavoritePokemonProps> = ({}) => {
  const { favorites } = useContext(MyContext);
  const router = useRouter();

  const total: number = Array.isArray(favorites) ? favorites.length : 0;
  const dataFavoritePokemon: object[] = Array.isArray(favorites)
    ? favorites
    : [];

  return (
    <article className="py-12">
      <section className="container mx-auto text-center">
        <h1 className="inline-flex gap-2 items-center text-3xl font-semibold">
          My favorite pokemons are here{" "}
          <span>
            <FaHeart className="text-red-500" size={24} />
          </span>
        </h1>
        <Divider className="my-4" />
        {/* favorite field */}
        <div className="py-20 text-center">
          {!total ? (
            <>
              <h2 className="text-xl font-medium">
                Waahh... Sepertinya aku belum memasukkan list pokemon favoriteku
              </h2>

              <Button
                variant="ghost"
                color="primary"
                startContent={<IoArrowBackOutline />}
                className="mt-10"
                onClick={() => router.push("/list-pokemon")}
              >
                Kembali untuk melihat list pokemon
              </Button>
            </>
          ) : (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xl:gap-7 gap-5">
              {dataFavoritePokemon.map((fav: any) => {
                const props = {
                  id: fav.id,
                  bg: fav.bgColor,
                  species: fav.species,
                  sprites: fav.sprites,
                  types: fav.types,
                  abilities: fav.abilities,
                };
                return <PokemonCards key={fav.id} {...props} />;
              })}
            </div>
          )}
        </div>
      </section>
    </article>
  );
};

export default FavoritePokemon;
