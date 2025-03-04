"use client";

import { useEffect, useState } from "react";

interface IHero {
  name: string;
  img: string;
}

interface IHeroImageProps {
  selectedHero: IHero;
}

export default function HeroImage({ selectedHero }: IHeroImageProps) {
  const [displayHero, setDisplayHero] = useState<IHero | null>(null);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (selectedHero) {
      if (displayHero) {
        // Jika ada hero sebelumnya, tambahkan animasi keluar dulu
        setAnimationClass("fly-out");
        setTimeout(() => {
          setDisplayHero(selectedHero);
          setAnimationClass("fly-in");
        }, 500);
      } else {
        setDisplayHero(selectedHero);
        setAnimationClass("fly-in");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHero]);

  return (
    <>
      {displayHero && (
        <img
          src={displayHero.img}
          alt={displayHero.name}
          className={animationClass}
          onAnimationEnd={() => setAnimationClass("")}
        />
      )}
    </>
  );
}
