import { Chip, Image, Progress } from "@nextui-org/react";
import React, { FC } from "react";

interface DetailStatsProps {
  namePokemon: string;
  imgPokemon: string;
  statsPokemon: any;
  typesPokemon: any;
  abilitiesPokemon: any;
}

const DetailStats: FC<DetailStatsProps> = ({
  namePokemon,
  imgPokemon,
  statsPokemon,
  typesPokemon,
  abilitiesPokemon,
}) => {
  return (
    <section>
      {/* image */}
      <Image alt={namePokemon + ".png"} src={imgPokemon} width={300} />
      {/* status */}
      <div className="space-y-7">
        {/* title */}
        <div>
          <h1 className="text-3xl font-bold capitalize">{namePokemon}</h1>
          <div className="space-x-3 mt-1">
            {typesPokemon?.map((el: any, idx: number) => (
              <Chip size="sm" color="success" variant="shadow" key={idx}>
                {el.type.name}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col text-left">
          {statsPokemon?.map((el: any, idx: number) => (
            <Progress
              key={idx}
              label={el.stat.name}
              value={el.base_stat}
              maxValue={120}
              color="warning"
              formatOptions={{ style: "decimal" }}
              showValueLabel={true}
              className="max-w-md"
            />
          ))}
        </div>
        {/* abilities */}
        <div className="space-y-2">
          {abilitiesPokemon?.length > 1 ? (
            <h3 className="font-semibold text-xl text-primary-500">
              Abilities
            </h3>
          ) : (
            ""
          )}
          <div className="inline-flex gap-x-3">
            {abilitiesPokemon?.map((el: any, idx: number) => (
              <Chip size="sm" color="warning" variant="flat" key={idx}>
                {el.ability.name}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailStats;
