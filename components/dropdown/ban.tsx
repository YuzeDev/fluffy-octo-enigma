"use client"
import { IGameContext } from "@/context/game"
import { useEffect, useRef, useState } from "react"

type IDropdownBanProps = Pick<IGameContext, "ban" | "changeBan">

export default function DropdownBan({ ban, changeBan }: IDropdownBanProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  function handleItemClick(ban: number) {
    setIsOpen(false)
    changeBan(ban)
  }

  return (
    <div ref={dropdownRef} className="relative flex-1">
      <button onClick={toggleDropdown} className="btn w-full">
        Ban {ban}
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-10 mt-[5px] max-h-[180px] w-full overflow-y-auto rounded-[5px] bg-[#343434] shadow"
        >
          <button
            className="w-full cursor-pointer p-2 text-center text-sm transition-colors hover:bg-[#3d3d3d]"
            onClick={() => handleItemClick(3)}
          >
            Ban 3
          </button>
          <button
            className="w-full cursor-pointer p-2 text-center text-sm transition-colors hover:bg-[#3d3d3d]"
            onClick={() => handleItemClick(5)}
          >
            Ban 5
          </button>
        </div>
      )}
    </div>
  )
}
