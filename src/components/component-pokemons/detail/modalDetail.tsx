"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  Tab,
  Tabs,
  Progress,
  Image,
  Divider,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";

const fetchEvolution = async (evolution: any) => {
  // evolution chain
  const evoData = await axios.get(evolution);

  // evolution 1
  const getEvo1 = await axios.get(evoData.data.chain.species.url);
  const evolution_1 = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${getEvo1.data.id}`
  );

  // evolution 2
  const getEvo2 = await axios.get(evoData.data.chain.evolves_to[0].species.url);
  const evolution_2 = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${getEvo2.data.id}`
  );

  // evolution 3
  let evolution_3: any = {};
  if (evoData.data.chain.evolves_to[0].evolves_to[0]) {
    const getEvo3 = await axios.get(
      evoData.data.chain.evolves_to[0].evolves_to[0].species.url
    );
    evolution_3 = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${getEvo3.data.id}`
    );
  }

  return {
    nameEvo1: evolution_1.data.name,
    imageEvo1: evolution_1.data.sprites.other["official-artwork"].front_default,
    nameEvo2: evolution_2.data.name,
    imageEvo2: evolution_2.data.sprites.other["official-artwork"].front_default,
    nameEvo3: evolution_3?.data?.name || null,
    imageEvo3:
      evolution_3?.data?.sprites?.other["official-artwork"]?.front_default ||
      null,
  };
};

interface ModalDetailProps {
  isOpen: boolean;
  onOpenChange: () => void;
  stats: object[];
  evolution: string;
}

const ModalDetail: FC<ModalDetailProps> = ({
  isOpen,
  onOpenChange,
  stats,
  evolution,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["data", evolution],
    queryFn: () => {
      return fetchEvolution(evolution);
    },
  });

  if (isLoading) return <div className="hidden">loading...</div>;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent className="py-7 h-[23rem] overflow-auto m-auto max-w-[80%] xl:max-w-[40%] bg-white/60 dark:bg-black/60">
        {(onClose) => (
          <>
            <ModalBody>
              <Tabs aria-label="Options" color="warning" variant="underlined">
                <Tab key="status" title="Status">
                  <ul className="space-y-1">
                    {stats.map((el: any, idx: number) => (
                      <li key={idx}>
                        <Progress
                          isStriped
                          aria-label="Value"
                          color="warning"
                          value={el.base_stat}
                          className="w-full text-sm col-span-2"
                          showValueLabel
                          maxValue={120}
                          formatOptions={{ style: "decimal" }}
                          label={el.stat.name}
                          size="sm"
                        />
                      </li>
                    ))}
                  </ul>
                </Tab>
                <Tab key="evolution" title="Evolution">
                  <ul className="grid grid-cols-1 place-items-center space-y-7">
                    <li className="flex-col items-center justify-center capitalize flex">
                      <h3>{data?.nameEvo1}</h3>
                      <Image
                        src={data?.imageEvo1}
                        alt="evolution-1"
                        width={200}
                      />
                    </li>
                    <Divider orientation="vertical" />
                    <li className="flex-col items-center capitalize justify-center flex">
                      <h3>{data?.nameEvo2}</h3>
                      <Image
                        src={data?.imageEvo2}
                        alt="evolution-2"
                        width={200}
                      />
                    </li>
                    {data?.nameEvo3 ? (
                      <>
                        <Divider orientation="vertical" />
                        <li className="flex-col items-center capitalize justify-center flex">
                          <h3>{data?.nameEvo3}</h3>
                          <Image
                            src={data?.imageEvo3}
                            alt="evolution-3"
                            width={200}
                          />
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDetail;
