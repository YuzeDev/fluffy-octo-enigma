"use client";
import { useGame } from "@/context/game";
import { ChangeEvent, useState } from "react";

interface IDropdownHeroProps {
  type: "ban" | "pick";
  side: "blue" | "red";
  heroes: IHeroes[];
}

interface IHeroes {
  name: string;
  img: string;
}

export default function DropdownHero({
  type,
  heroes,
  side,
}: IDropdownHeroProps) {
  const [show, setShow] = useState("");
  const [data, setData] = useState<IHeroes[]>(heroes);
  const [selected, setSelected] = useState<IHeroes[]>([]);
  const {
    game: { player, ban },
    setPickOrBan,
  } = useGame();

  function inputSearch(event: ChangeEvent<HTMLInputElement>, index: number) {
    const val = event.target.value;
    setSelected((prev) => {
      const updated = [...prev];
      updated[index] = { name: val, img: "" };
      return updated;
    });
    setData(() => {
      return heroes.filter((hero) => hero.name.toLowerCase().includes(val));
    });
  }

  function onSelect(value: IHeroes, index: number) {
    setSelected((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    setPickOrBan(type, side, index, value);

    setData(heroes);
    setShow("");
  }

  return (
    <>
      {Array.from({ length: type == "ban" ? ban : player }).map((_, index) => {
        return (
          <div className="relative" key={type + index}>
            <input
              type="text"
              className="input"
              onChange={(e) => inputSearch(e, index)}
              onFocus={() => setShow(type + index)}
              onBlur={() => setShow("")}
              value={selected[index]?.name || ""}
              placeholder={`${
                side.charAt(0).toUpperCase() + side.slice(1)
              } side ${type} ${index + 1}`}
            />

            <div className="absolute w-full max-h-[180px] overflow-y-auto bg-[#343434] z-10 mt-[5px] shadow rounded-[5px]">
              <div className={show == type + index ? "block" : "hidden"}>
                {data.map((hero, j) => (
                  <div
                    className="p-2 cursor-pointer text-sm transition-colors hover:bg-[#3d3d3d]"
                    key={j}
                    onMouseDown={() => onSelect(hero, index)}
                  >
                    {hero.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
