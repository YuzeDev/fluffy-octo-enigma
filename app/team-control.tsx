"use client"

import DropdownHero from "@/components/dropdown/hero"
import { useDraft } from "@/context/draft"
import { DropdownHeroProvider } from "@/context/dropdown-hero"
import { useGame } from "@/context/game"
import { useTeam } from "@/context/team"
import IHeroes from "@/interface/heroes"
import {
  ChangeEvent,
  memo,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useDebouncedCallback } from "use-debounce"

interface ITeamControl {
  side: "blue" | "red"
  heroes: IHeroes[]
}

export default function TeamControl({ side, heroes }: ITeamControl) {
  const { playerCount, banCount } = useGame()
  const {
    blueTeamName,
    bluePlayerNames,
    redTeamName,
    redPlayerNames,
    changeTeamName,
    changePlayerName,
  } = useTeam()
  const { blueBan, bluePick, redBan, redPick, setPickOrBan } = useDraft()

  const playerNameValues = useMemo(
    () => (side === "blue" ? bluePlayerNames : redPlayerNames),
    [side, bluePlayerNames, redPlayerNames],
  )
  const teamNameValue = useMemo(
    () => (side == "blue" ? blueTeamName : redTeamName),
    [side, blueTeamName, redTeamName],
  )

  return (
    <div
      className={`relative flex-1 rounded-[5px] border p-5 ${
        side == "blue" ? "border-[#006bd6]" : "border-[#fc0341]"
      }`}
    >
      <div className="absolute -top-[15px] left-[15px] inline-block bg-[#232323] p-[3px] font-bold">
        {side.charAt(0).toUpperCase() + side.slice(1)} Team Control
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        <div className="mt-[5px] mb-5 w-full">
          <Input
            value={teamNameValue || ""}
            placeholder="Team name"
            onChange={(val) => changeTeamName(val, side)}
          />
        </div>
        <div className="mt-[5px] mb-5 w-full">
          <button className="btn w-full">Upload team logo</button>
          {/* <input id="file1" type="file" accept="image/*" onchange="loadImage(event, 'image1')"> */}
        </div>
        <div className="mt-[5px] mb-5 flex w-full flex-1 items-center justify-center gap-2.5">
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
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: playerCount }).map((_, index) => (
              <Input
                key={index}
                value={playerNameValues[index] || ""}
                onChange={(newName) => changePlayerName(index, newName, side)}
                placeholder={`${side.charAt(0).toUpperCase() + side.slice(1)} side player ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <DropdownHeroProvider>
          <div className="flex-1">
            <div id="dropdowns-container">
              <h3 className="mb-[5px] font-bold">Pick</h3>
              <div className="flex flex-col gap-2.5">
                <DropdownHero
                  type="pick"
                  heroes={heroes}
                  side={side}
                  ban={banCount}
                  blueBan={blueBan}
                  bluePick={bluePick}
                  player={playerCount}
                  redBan={redBan}
                  redPick={redPick}
                  setPickOrBan={setPickOrBan}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div id="dropdowns-container">
              <h3 className="mb-[5px] font-bold">Ban</h3>
              <div className="flex flex-col gap-2.5">
                <DropdownHero
                  type="ban"
                  heroes={heroes}
                  side={side}
                  ban={banCount}
                  blueBan={blueBan}
                  bluePick={bluePick}
                  player={playerCount}
                  redBan={redBan}
                  redPick={redPick}
                  setPickOrBan={setPickOrBan}
                />
              </div>
            </div>
          </div>
        </DropdownHeroProvider>
      </div>
    </div>
  )
}

interface InputProps {
  value: string
  onChange: (newValue: string) => void
  placeholder?: string
  className?: string
  type?: "text" | "number" | "email" | "password"
}

const Input = memo(
  ({ value, onChange, placeholder, className, type = "text" }: InputProps) => {
    const [localValue, setLocalValue] = useState(value)
    const deferredValue = useDeferredValue(localValue) // Untuk smooth UI

    // Debounce agar tidak terlalu sering update state global
    const debouncedOnChange = useDebouncedCallback((newValue: string) => {
      onChange(newValue)
    }, 300)

    useEffect(() => {
      setLocalValue(value) // Sync jika value dari luar berubah
    }, [value])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const newValue = event.target.value
      setLocalValue(newValue) // Update lokal state agar input responsif
      debouncedOnChange(newValue) // Update global state dengan debounce
    }

    return (
      <input
        type={type}
        className={`input ${className || ""}`}
        placeholder={placeholder}
        onChange={handleChange}
        value={deferredValue} // Gunakan deferred agar lebih smooth
      />
    )
  },
)

Input.displayName = "Input"
