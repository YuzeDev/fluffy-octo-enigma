"use client";
import { useGame } from "@/context/game";

interface ITeamNameInputProps {
  side: "blue" | "red";
}

export default function TeamNameInput({ side }: ITeamNameInputProps) {
  const {
    changeTeamName,
    game: { blueTeamName, redTeamName },
  } = useGame();
  return (
    <input
      type="text"
      onChange={(e) => changeTeamName(e.target.value, side)}
      className="input"
      placeholder="Team name"
      value={(side == "blue" ? blueTeamName : redTeamName) || ""}
    />
  );
}
