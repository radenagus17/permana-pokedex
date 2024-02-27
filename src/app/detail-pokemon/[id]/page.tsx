"use client";

import DetailCardPokemon from "@/components/component-pokemons/detail";
import SkeletonCardDetail from "@/ui/SkeletonCardDetail";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPokemon = async (pokeID: number) => {
  const pokeData = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokeID}`
  );

  const pokeSpec = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${pokeID}`
  );

  return {
    ...pokeData.data,
    desc: pokeSpec.data.flavor_text_entries,
    bgColor: pokeSpec.data.color.name,
    evolution: pokeSpec.data.evolution_chain.url,
  };
};

export default function DetailPokemonPage({
  params,
}: {
  params: { id: string };
}) {
  const pokeID = +params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["data", pokeID],
    queryFn: () => {
      return fetchPokemon(pokeID);
    },
  });

  if (isLoading) return <SkeletonCardDetail />;

  return (
    <main>
      <DetailCardPokemon detail_pokemon={data} />
    </main>
  );
}
