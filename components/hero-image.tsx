"use client"

import { useEffect, useRef, useState } from "react"

interface IHero {
  name: string
  img: string
}

interface IHeroImageProps {
  selectedHero?: IHero
  type?: "pick" | "ban"
}

export default function HeroImage({
  selectedHero,
  type = "pick",
}: IHeroImageProps) {
  const [displayHero, setDisplayHero] = useState<IHero | null>(null)
  const [animationClass, setAnimationClass] = useState("")
  const prevHeroRef = useRef<IHero | null>(null)

  useEffect(() => {
    if (!selectedHero) {
      // Jika hero direset, beri animasi keluar
      if (displayHero) {
        setAnimationClass("fly-out")
        setTimeout(() => {
          setDisplayHero(null)
          setAnimationClass("")
        }, 500)
      }
      return
    }

    // Cek apakah hero sebelumnya berbeda dengan hero sekarang
    if (prevHeroRef.current && prevHeroRef.current !== selectedHero) {
      setAnimationClass("fly-out")
      setTimeout(() => {
        setDisplayHero(selectedHero)
        setAnimationClass("fly-in")
      }, 500)
    } else {
      // Jika pertama kali muncul, langsung tampilkan hero tanpa animasi keluar
      setDisplayHero(selectedHero)
      setAnimationClass("fly-in")
    }

    // Simpan hero saat ini sebagai hero sebelumnya
    prevHeroRef.current = selectedHero
  }, [selectedHero, displayHero])

  return (
    <>
      {displayHero && (
        <div
          className={animationClass || ""}
          onAnimationEnd={() => setAnimationClass("")}
        >
          <div className="relative">
            {type === "pick" && (
              <div className="absolute h-full w-full border-l-[1.5vw] border-transparent">
                <div className="flex h-[1.5vw] w-[200%] origin-top-left rotate-90 items-center bg-gradient-to-t from-black via-black/70 to-transparent px-[3vw] text-[.7vw]">
                  <p>{displayHero.name}</p>
                </div>
              </div>
            )}
            <img src={displayHero.img} alt={displayHero.name} />
          </div>
        </div>
      )}
    </>
  )
}
