"use server";

import DropdownHero from "@/components/dropdown/hero";
import NameInput from "@/components/control/name-input";
import TeamNameInput from "@/components/control/team-name-input";
import getHeroes from "@/helper/get-heroes";
import { DropdownHeroProvider } from "@/context/dropdown-hero";

interface ITeamControl {
  side: "blue" | "red";
}

export default async function TeamControl({ side }: ITeamControl) {
  const data = await getHeroes();

  return (
    <div
      className={`rounded-[5px] relative p-5 border ${
        side == "blue" ? "border-[#006bd6]" : "border-[#fc0341]"
      }`}
    >
      <div className="bg-[#232323] p-[3px] inline-block font-bold absolute -top-[15px] left-[15px]">
        {side.charAt(0).toUpperCase() + side.slice(1)} Team Control
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        <div className="w-full mt-[5px] mb-5">
          <TeamNameInput side={side} />
        </div>
        <div className="w-full mt-[5px] mb-5">
          <button className="btn">Upload team logo</button>
          {/* <input id="file1" type="file" accept="image/*" onchange="loadImage(event, 'image1')"> */}
        </div>
        <div className="flex gap-2.5 items-center flex-1 justify-center w-full mt-[5px] mb-5">
          <h5>Win</h5>
          <label>
            <input
              type="checkbox"
              id="checkbox1"
              //   onclick="toggleImage('extraImage1')"
            />
            1
          </label>
          <label>
            <input
              type="checkbox"
              id="checkbox2"
              //   onclick="toggleImage('extraImage2')"
            />
            2
          </label>
          <label>
            <input
              type="checkbox"
              id="checkbox3"
              //   onclick="toggleImage('extraImage3')"
            />
            3
          </label>
        </div>
        <div className="flex-1">
          <h3 className="mb-[5px] font-bold">Nickname</h3>
          <NameInput side={side} />
        </div>
        <DropdownHeroProvider>
          <div className="flex-1">
            <div id="dropdowns-container">
              <h3 className="mb-[5px] font-bold">Pick</h3>
              <div className="flex flex-col gap-2.5">
                <DropdownHero type="pick" heroes={data} side={side} />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div id="dropdowns-container">
              <h3 className="mb-[5px] font-bold">Ban</h3>
              <div className="flex flex-col gap-2.5">
                <DropdownHero type="ban" heroes={data} side={side} />
              </div>
            </div>
          </div>
        </DropdownHeroProvider>
      </div>
    </div>
  );
}
