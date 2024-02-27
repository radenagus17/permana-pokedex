import colourNameToHex from "@/constants/colorNameToHex";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import hexToRgba from "hex-to-rgba";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface PokemonCardsProps {
  id: number;
  bg: string;
  species: any;
  sprites: any;
  types: any;
  abilities: any;
}

const PokemonCards: FC<PokemonCardsProps> = ({
  id,
  bg,
  species,
  sprites,
  types,
  abilities,
}) => {
  const router = useRouter();

  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => router.push(`/detail-pokemon/${id}`)}
    >
      <CardBody className="overflow-visible p-0 relative">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={species.name}
          style={{
            backgroundColor: hexToRgba(colourNameToHex(bg) ?? "FFFFFF", 0.2),
          }}
          className="w-full object-contain h-[180px]"
          src={sprites.other["official-artwork"].front_default}
        />
        <div className="absolute z-10 top-[5%] inset-x-[3%] flex justify-between flex-wrap gap-y-2 text-small">
          {types.map((val: any, idx: number) => (
            <Chip variant="dot" color="warning" key={idx}>
              {val.type.name}
            </Chip>
          ))}
        </div>
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b className="capitalize">{species.name}</b>
        <div className="inline-flex gap-2 text-default-500 flex-wrap justify-end">
          {abilities.map((el: any, idx: number) => (
            <Chip variant="faded" color="secondary" size="sm" key={idx}>
              {el.ability.name}
            </Chip>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PokemonCards;
