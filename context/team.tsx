"use client"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

export type TeamType = "blue" | "red"
interface ITeam {
  bluePlayerNames: string[]
  redPlayerNames: string[]
  redTeamName: string
  blueTeamName: string
}
export interface ITeamContext extends ITeam {
  changePlayerName: (index: number, name: string, side: TeamType) => void
  swapPlayerNames: () => void
  resetPlayerNames: () => void
  changeTeamName: (name: string, side: TeamType) => void
  swapTeamName: () => void
}

const TeamContext = createContext<ITeamContext | null>(null)

export function useTeam() {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}

export function TeamProvider({ children }: PropsWithChildren) {
  const [bluePlayerNames, setBluePlayerNames] = useState<string[]>([])
  const [redPlayerNames, setRedPlayerNames] = useState<string[]>([])
  const [blueTeamName, setBlueTeamName] = useState<string>("")
  const [redTeamName, setRedTeamName] = useState<string>("")

  const changePlayerName = useCallback(
    (index: number, name: string, side: TeamType) => {
      if (side === "blue") {
        setBluePlayerNames((prev) => {
          const newNames = [...prev]
          newNames[index] = name
          return newNames
        })
      } else {
        setRedPlayerNames((prev) => {
          const newNames = [...prev]
          newNames[index] = name
          return newNames
        })
      }
    },
    [],
  )

  const swapPlayerNames = useCallback(() => {
    setBluePlayerNames(() => [...redPlayerNames])
    setRedPlayerNames(() => [...bluePlayerNames])
  }, [bluePlayerNames, redPlayerNames])

  const resetPlayerNames = useCallback(() => {
    setBluePlayerNames([])
    setRedPlayerNames([])
  }, [])

  const changeTeamName = useCallback((name: string, side: TeamType) => {
    if (side === "blue") {
      setBlueTeamName(name)
    } else {
      setRedTeamName(name)
    }
  }, [])

  const swapTeamName = useCallback(() => {
    setBlueTeamName(redTeamName)
    setRedTeamName(blueTeamName)
  }, [blueTeamName, redTeamName])

  // Gunakan useMemo agar nilai context tidak berubah setiap render
  const contextValue = useMemo(
    () => ({
      bluePlayerNames,
      redPlayerNames,
      blueTeamName,
      redTeamName,
      changePlayerName,
      swapPlayerNames,
      resetPlayerNames,
      changeTeamName,
      swapTeamName,
    }),
    [
      bluePlayerNames,
      redPlayerNames,
      blueTeamName,
      redTeamName,
      changePlayerName,
      swapPlayerNames,
      resetPlayerNames,
      changeTeamName,
      swapTeamName,
    ],
  )

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  )
}
