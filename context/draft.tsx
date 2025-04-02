"use client"
import { TeamType } from "@/context/team"
import IHeroes from "@/interface/heroes"
import { createContext, PropsWithChildren, useContext, useState } from "react"

interface IDraft {
  bluePick: IHeroes[]
  blueBan: IHeroes[]
  redPick: IHeroes[]
  redBan: IHeroes[]
}

export interface IDraftContext extends IDraft {
  setPickOrBan: (
    type: "pick" | "ban",
    side: TeamType,
    index: number,
    hero: IHeroes,
  ) => void
  resetPickAndBan: () => void
}

const DraftContext = createContext<IDraftContext | null>(null)
export function useDraft() {
  const context = useContext(DraftContext)
  if (!context) throw new Error("useDraft must be used within a DraftProvider")
  return context
}

export function DraftProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState<IDraft>({
    bluePick: [],
    blueBan: [],
    redPick: [],
    redBan: [],
  })

  function setPickOrBan(
    type: "pick" | "ban",
    side: TeamType,
    index: number,
    hero: IHeroes,
  ) {
    setDraft((prev) => {
      const updated = { ...prev }

      if (type === "pick") {
        if (side === "blue") {
          updated.bluePick[index] = hero
        } else {
          updated.redPick[index] = hero
        }
      } else {
        if (side === "blue") {
          updated.blueBan[index] = hero
        } else {
          updated.redBan[index] = hero
        }
      }

      return updated
    })
  }

  function resetPickAndBan() {
    setDraft((prev) => {
      const updated = { ...prev }
      updated.blueBan = []
      updated.bluePick = []
      updated.redBan = []
      updated.redPick = []
      return updated
    })
  }

  return (
    <DraftContext.Provider value={{ ...draft, setPickOrBan, resetPickAndBan }}>
      {children}
    </DraftContext.Provider>
  )
}
