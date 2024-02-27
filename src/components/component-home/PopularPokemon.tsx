"use client";
import React, { FC, useMemo } from "react";
import { Card, CardBody, CardFooter, Image, Chip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import hexToRgba from "hex-to-rgba";
import axios from "axios";
import colourNameToHex from "@/constants/colorNameToHex";
import SkeletonCards from "@/ui/SkelotonCardList";
import randomOffset from "@/helper/random_offset";
import { useRouter } from "next/navigation";

const fetchPokemons = async (offset: number) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`
  );

  const pokemonArray = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const res = await axios.get(pokemon.url);
      // const randomInteger = Math.floor(Math.random() * 8 + 1);
      const spec = await axios.get(res.data.species.url);
      return { ...res.data, bg: spec.data.color.name };
    })
  );

  return pokemonArray;
};

interface PopularPokemonProps {}

const PopularPokemon: FC<PopularPokemonProps> = ({}) => {
  const offset: number = randomOffset();
  const router = useRouter();

  const { isLoading, data } = useQuery({
    queryKey: ["pokemons", "offset"],
    queryFn: () => fetchPokemons(offset),
    staleTime: 1000,
  });

  const randomData = useMemo(() => {
    if (!!data) {
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      return data;
    }
  }, [data]);

  if (isLoading) return <SkeletonCards />;

  return (
    <article className="py-10" id="popular">
      {/* container primary */}
      <section className="container mx-auto space-y-10">
        {/* title */}
        <h2 className="text-2xl text-center font-bold text-primary-400">
          Popular Pokemon
        </h2>
        {/* container card */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xl:gap-7 gap-5">
          {!!randomData &&
            randomData.map((item: any) => {
              const { types } = item;
              return (
                <Card
                  key={item.id}
                  shadow="sm"
                  isPressable
                  onPress={() => router.push(`/detail-pokemon/${item.id}`)}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={"/images"}
                      style={{
                        backgroundColor: hexToRgba(
                          colourNameToHex(item.bg) ?? "FFFFFF",
                          0.2
                        ),
                      }}
                      className={`w-full object-contain h-[220px]`}
                      src={
                        item?.sprites?.other["official-artwork"]?.front_default
                      }
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b className="capitalize">{item?.species?.name}</b>
                    <div className="inline-flex space-x-2 text-default-500">
                      {types.map((el: any, idx: number) => (
                        <Chip variant="faded" size="sm" key={idx}>
                          {el.type.name}
                        </Chip>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </section>
    </article>
  );
};

export default PopularPokemon;
