"use client"
import DropdownBan from "@/components/dropdown/ban"
import { useDraft } from "@/context/draft"
import { useGame } from "@/context/game"
import { useTeam } from "@/context/team"
import React from "react"

export default function GeneralControl() {
  const { banCount, setBanCount, setGameName } = useGame()
  const { swapPlayerNames, resetPlayerNames, swapTeamName } = useTeam()
  const { resetPickAndBan } = useDraft()

  return (
    <div className="relative flex flex-1 flex-col gap-2.5 rounded-[5px] border border-[rgba(255,255,255,0.4)] p-5">
      <div className="absolute -top-[15px] left-[15px] inline-block bg-[#232323] p-[3px] font-bold">
        General Control
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="input flex-2"
          placeholder="Nama tournament"
          onChange={(e) => setGameName(e.target.value)}
        />
        <DropdownBan ban={banCount} changeBan={setBanCount} />
      </div>
      <hr className="text-[#343434]" />
      <div className="flex gap-2">
        <button className="btn flex-1" onClick={swapPlayerNames}>
          Switch Nickname
        </button>
        <button className="btn flex-1" onClick={swapTeamName}>
          Switch Team
        </button>
      </div>
      <div className="flex gap-2">
        <button className="btn flex-1" onClick={resetPickAndBan}>
          Reset Ban & Pick
        </button>
        <button className="btn flex-1" onClick={resetPlayerNames}>
          Reset Nickname
        </button>
      </div>
      <button
        className="btn"
        // onclick="resetContent()"
      >
        Reset
      </button>
    </div>
  )
}
