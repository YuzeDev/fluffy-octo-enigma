"use client"
import { createContext, PropsWithChildren, useContext, useState } from "react"

interface IDropdownHeroContext {
  search: string
  setSearch: (val: string) => void
}

const DropdownHeroContext = createContext<IDropdownHeroContext | null>(null)

export function useDropdownHero() {
  const context = useContext(DropdownHeroContext)
  if (!context) {
    throw new Error(
      "useDropdownHeroContext must be used within a DropdownHeroProvider",
    )
  }
  return context
}

export function DropdownHeroProvider({ children }: PropsWithChildren) {
  const [search, setSearch] = useState("")

  return (
    <DropdownHeroContext.Provider value={{ search, setSearch }}>
      {children}
    </DropdownHeroContext.Provider>
  )
}
