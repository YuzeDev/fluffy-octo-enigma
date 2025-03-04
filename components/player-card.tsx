"use client";
import HeroImage from "@/components/hero-image";
import { memo } from "react";

interface IHero {
  name: string;
  img: string;
}

interface IPlayerCardProps {
  player: number;
  playerNames: string[];
  selectedHeroes: IHero[];
}

function PlayerCardComponent({
  player,
  playerNames,
  selectedHeroes,
}: IPlayerCardProps) {
  return (
    <div className="flex flex-row flex-1 gap-0.5 h-full">
      {Array.from({ length: player }).map((_, index) => (
        <div
          className="overflow-hidden bg-[url(/assets/other/Pickbg.jpg)] bg-center bg-no-repeat bg-cover cursor-pointer w-full"
          key={index}
        >
          <div className="h-5 flex justify-center items-center bg-[#212529] text-sm font-bold">
            {playerNames[index]}
          </div>
          <div className="max-w-full h-auto">
            <HeroImage selectedHero={selectedHeroes[index]} key={index} />
          </div>
        </div>
      ))}
    </div>
  );
}

export const PlayerCard = memo(PlayerCardComponent);
