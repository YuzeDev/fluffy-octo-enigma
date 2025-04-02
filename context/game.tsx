"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react"

export type BanPhase = string[]

interface IGameContext {
  gameName: string
  banCount: number
  playerCount: number
  phaseList: BanPhase
  currentPhaseIndex: number
  timer: number
  isRunning: boolean
  setGameName: (name: string) => void
  setBanCount: (ban: number) => void
  setPlayerCount: (player: number) => void
  startPhase: () => void
  pausePhase: () => void
  resetPhase: () => void
  nextPhase: () => void
}

interface IGameProviderProps {
  children: ReactNode
}

const GameContext = createContext<IGameContext | null>(null)

const ban3Phase: BanPhase = [
  "Blue Ban Phase",
  "Red Ban Phase",
  "Blue Ban Phase",
  "Red Ban Phase",
  "Blue Pick Phase",
  "Red Pick Phase",
  "Blue Pick Phase",
  "Red Pick Phase",
  "Red Ban Phase",
  "Blue Ban Phase",
  "Red Pick Phase",
  "Blue Pick Phase",
  "Red Pick Phase",
]

const ban5Phase: BanPhase = [
  "Blue Ban Phase",
  "Red Ban Phase",
  "Blue Ban Phase",
  "Red Ban Phase",
  "Blue Ban Phase",
  "Red Ban Phase",
  "Blue Pick Phase",
  "Red Pick Phase",
  "Blue Pick Phase",
  "Red Pick Phase",
  "Red Ban Phase",
  "Blue Ban Phase",
  "Red Ban Phase",
  "Blue Ban Phase",
  "Red Pick Phase",
  "Blue Pick Phase",
  "Red Pick Phase",
]

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}

export function GameProvider({ children }: IGameProviderProps) {
  const [gameName, setGameName] = useState<string>("")
  const [banCount, setBanCountState] = useState<number>(3)
  const [playerCount, setPlayerCountState] = useState<number>(5)

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0)
  const [timer, setTimer] = useState<number>(30)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const phaseList = useMemo(
    () => (banCount === 3 ? ban3Phase : ban5Phase),
    [banCount],
  )

  const startPhase = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pausePhase = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetPhase = useCallback(() => {
    setIsRunning(false)
    setCurrentPhaseIndex(0)
    setTimer(30)
  }, [])

  const nextPhase = useCallback(() => {
    setIsRunning(false) // Hentikan timer sebelum pindah fase

    setCurrentPhaseIndex((prevIndex) => {
      if (prevIndex + 1 < phaseList.length) {
        setTimer(30) // Reset timer untuk fase baru
        return prevIndex + 1
      }
      return prevIndex // Jangan ubah jika sudah di fase terakhir
    })
  }, [phaseList.length])

  const setBanCount = useCallback((ban: number) => {
    setBanCountState(ban)
  }, [])

  const setPlayerCount = useCallback((player: number) => {
    setPlayerCountState(player)
  }, [])

  // Timer logic
  useEffect(() => {
    if (isRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }

    // Jika timer habis, pindah ke fase berikutnya
    if (timer === 0 && isRunning) {
      setIsRunning(false)

      setTimeout(() => {
        setCurrentPhaseIndex((prevIndex) => {
          if (prevIndex + 1 < phaseList.length) {
            setTimer(30) // Reset timer ke 30 detik untuk fase berikutnya
            setIsRunning(true)
            return prevIndex + 1
          } else {
            return prevIndex // Jangan ubah jika sudah di fase terakhir
          }
        })
      }, 500) // Delay kecil sebelum pindah fase
    }
  }, [isRunning, timer, phaseList.length])

  return (
    <GameContext.Provider
      value={{
        gameName,
        banCount,
        playerCount,
        phaseList,
        currentPhaseIndex,
        timer,
        isRunning,
        setGameName,
        setBanCount,
        setPlayerCount,
        startPhase,
        pausePhase,
        resetPhase,
        nextPhase,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
