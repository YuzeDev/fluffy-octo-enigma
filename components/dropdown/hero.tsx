"use client"
import { IDraftContext } from "@/context/draft"
import { IGameContext } from "@/context/game"
import IHeroes from "@/interface/heroes"
import { ChangeEvent, useEffect, useState } from "react"

interface IDropdownHeroProps
  extends Pick<IGameContext, "ban" | "player">,
    Omit<IDraftContext, "resetPickAndBan"> {
  type: "ban" | "pick"
  side: "blue" | "red"
  heroes: IHeroes[]
}

export default function DropdownHero({
  type,
  heroes,
  side,
  ban,
  blueBan,
  bluePick,
  player,
  redBan,
  redPick,
  setPickOrBan,
}: IDropdownHeroProps) {
  const [show, setShow] = useState("")
  const [data, setData] = useState<IHeroes[]>(heroes)
  const [selected, setSelected] = useState<IHeroes[]>([])

  function inputSearch(event: ChangeEvent<HTMLInputElement>, index: number) {
    const val = event.target.value
    setSelected((prev) => {
      const updated = [...prev]
      updated[index] = { name: val, img: "" }
      return updated
    })
    setData(() => {
      return heroes.filter((hero) => hero.name.toLowerCase().includes(val))
    })
  }

  function onSelect(value: IHeroes, index: number) {
    setSelected((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })

    setPickOrBan(type, side, index, value)

    setData(heroes)
    setShow("")
  }

  useEffect(() => {
    if (type === "pick") {
      setSelected(side === "blue" ? bluePick : redPick)
    } else {
      setSelected(side === "blue" ? blueBan : redBan)
    }
  }, [bluePick, redPick, blueBan, redBan, type, side])

  return (
    <>
      {Array.from({ length: type == "ban" ? ban : player }).map((_, index) => {
        return (
          <div className="relative" key={type + index}>
            <input
              type="text"
              className="input w-full"
              onChange={(e) => inputSearch(e, index)}
              onFocus={() => setShow(type + index)}
              onBlur={() => setShow("")}
              value={selected[index]?.name || ""}
              placeholder={`${
                side.charAt(0).toUpperCase() + side.slice(1)
              } side ${type} ${index + 1}`}
            />

            <div className="absolute z-10 mt-[5px] max-h-[180px] w-full overflow-y-auto rounded-[5px] bg-[#343434] shadow">
              <div className={show == type + index ? "block" : "hidden"}>
                {data.map((hero, j) => (
                  <button
                    className="w-full cursor-pointer p-2 text-start text-sm transition-colors hover:bg-[#3d3d3d]"
                    key={j}
                    onMouseDown={() => onSelect(hero, index)}
                  >
                    {hero.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
