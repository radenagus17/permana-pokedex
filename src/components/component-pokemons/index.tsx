"use client";

import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import InfinateScroll from "react-infinite-scroll-component";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import PokemonCards from "@/ui/PokemonCards";

interface ListAllPokemonProps {}

const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=`;

const ListAllPokemon: FC<ListAllPokemonProps> = ({}) => {
  const [pokemons, setPokemons] = useState<object[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  async function fetchPokemons() {
    const endpoint = url + offset;
    try {
      const { data } = await axios.get(endpoint);
      const pokemonArray = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await axios.get(pokemon.url);
          // const randomInteger = Math.floor(Math.random() * 10 + 1);
          const spec = await axios.get(res.data.species.url);
          return { ...res.data, bg: spec.data.color.name };
        })
      );

      const pokemonData = [...pokemons].concat(pokemonArray);

      if (pokemons.length >= data.count) {
        setHasMore(false);
        return;
      }

      setPokemons(pokemonData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <article className="py-10">
      <section className="container mx-auto">
        <h1 className="text-center xl:text-2xl text-large font-semibold text-primary-500 mb-5">
          Explore your pokemon here
        </h1>
        <InfinateScroll
          dataLength={pokemons.length}
          next={() => setOffset(offset + 10)}
          hasMore={hasMore}
          loader={
            <article className="flex items-center justify-center py-16">
              <Spinner
                label="Loading..."
                color="primary"
                labelColor="primary"
              />
            </article>
          }
        >
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xl:gap-7 gap-5">
            {pokemons.length > 0 &&
              pokemons.map((el: any) => {
                const props = {
                  id: el.id,
                  bg: el.bg,
                  species: el.species,
                  sprites: el.sprites,
                  types: el.types,
                  abilities: el.abilities,
                };

                return <PokemonCards key={el.id} {...props} />;
              })}
          </div>
        </InfinateScroll>
      </section>
    </article>
  );
};

export default ListAllPokemon;
