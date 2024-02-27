"use client";

import { MyContext } from "@/app/providers";
import { Button, Chip, Divider, Image, Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { FC, useContext } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import DetailStats from "./DetailStats";

interface ComparePokemonProps {}

const ComparePokemon: FC<ComparePokemonProps> = ({}) => {
  const { compare } = useContext(MyContext);
  const total: number = Array.isArray(compare) ? compare.length : 0;
  const dataComparePokemon = Array.isArray(compare) ? compare : [];
  const router = useRouter();

  const namePokemon_1 = dataComparePokemon[0]?.name;
  const namePokemon_2 = dataComparePokemon[1]?.name;
  const imgPokemon_1 =
    dataComparePokemon[0]?.sprites?.other["official-artwork"]?.front_default;
  const imgPokemon_2 =
    dataComparePokemon[1]?.sprites?.other["official-artwork"]?.front_default;
  const statsPokemon_1 = dataComparePokemon[0]?.stats;
  const statsPokemon_2 = dataComparePokemon[1]?.stats;
  const typesPokemon_1 = dataComparePokemon[0]?.types;
  const typesPokemon_2 = dataComparePokemon[1]?.types;
  const abilitiesPokemon_1 = dataComparePokemon[0]?.abilities;
  const abilitiesPokemon_2 = dataComparePokemon[1]?.abilities;

  return (
    <article className="py-12">
      <section className="container mx-auto text-center">
        <h1 className="inline-flex gap-2 items-center text-3xl font-semibold">
          Let&apos;s see how are strong!
        </h1>
        <Divider className="my-4" />
        <div className="py-20 text-center">
          {!total ? (
            <>
              <h2 className="text-xl font-medium">
                Hmm... Sepertinya belum ada pokemon yang ingin kamu compare
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
            <div className="grid md:grid-cols-3 xl:gap-7 gap-5 place-items-center">
              <DetailStats
                namePokemon={namePokemon_1}
                imgPokemon={imgPokemon_1}
                typesPokemon={typesPokemon_1}
                statsPokemon={statsPokemon_1}
                abilitiesPokemon={abilitiesPokemon_1}
              />
              <span className={`text-3xl font-bold text-danger-500 py-10`}>
                VS
              </span>
              <DetailStats
                namePokemon={namePokemon_2}
                imgPokemon={imgPokemon_2}
                typesPokemon={typesPokemon_2}
                statsPokemon={statsPokemon_2}
                abilitiesPokemon={abilitiesPokemon_2}
              />
            </div>
          )}
        </div>
      </section>
    </article>
  );
};

export default ComparePokemon;
