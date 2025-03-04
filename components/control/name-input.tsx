"use client";
import { useGame } from "@/context/game";
import { ChangeEvent, useEffect, useState, useMemo } from "react";

interface INameInput {
  side: "red" | "blue";
}

export default function NameInput({ side }: INameInput) {
  const {
    game: { player, bluePlayerNames, redPlayerNames },
    changePlayerName,
  } = useGame();

  // 🛠️ Gunakan useMemo untuk hanya menghitung ulang saat data berubah
  const initialNames = useMemo(
    () => (side === "blue" ? [...bluePlayerNames] : [...redPlayerNames]),
    [side, bluePlayerNames, redPlayerNames]
  );

  const [localNames, setLocalNames] = useState(initialNames);

  // 🛠️ Perbarui localNames setiap kali initialNames berubah
  useEffect(() => {
    setLocalNames(initialNames);
  }, [initialNames]);

  function onChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const newName = event.target.value;

    setLocalNames((prev) => {
      const updated = [...prev];
      updated[index] = newName;
      return updated;
    });

    // Langsung update context tanpa delay
    changePlayerName(index, newName, side);
  }

  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: player }).map((_, index) => (
        <input
          type="text"
          className="input"
          placeholder={`${
            side.charAt(0).toUpperCase() + side.slice(1)
          } side player ${index + 1}`}
          onChange={(event) => onChange(event, index)}
          value={localNames[index] || ""}
          key={index}
        />
      ))}
    </div>
  );
}
