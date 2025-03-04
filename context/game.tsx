"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type Team = "blue" | "red";

interface IHeroes {
  name: string;
  img: string;
}

interface IGame {
  ban: number;
  player: number;
  bluePlayerNames: string[];
  redPlayerNames: string[];
  redTeamName: string;
  blueTeamName: string;
  bluePick: IHeroes[];
  blueBan: IHeroes[];
  redPick: IHeroes[];
  redBan: IHeroes[];
}

interface IGameContext {
  game: IGame;
  changeBan: (ban: number) => void;
  changePlayer: (player: number) => void;
  changePlayerName: (index: number, name: string, side: Team) => void;
  swapPlayerNames: () => void;
  resetPlayerNames: () => void;
  changeTeamName: (name: string, side: Team) => void;
  swapTeamName: () => void;
  setPickOrBan: (
    type: "pick" | "ban",
    side: Team,
    index: number,
    hero: IHeroes
  ) => void;
}

interface IGameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<IGameContext | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export function GameProvider({ children }: IGameProviderProps) {
  const [game, setGame] = useState<IGame>({
    ban: 3,
    player: 5,
    bluePlayerNames: [],
    redPlayerNames: [],
    blueTeamName: "",
    redTeamName: "",
    bluePick: [],
    blueBan: [],
    redPick: [],
    redBan: [],
  });

  function changeBan(ban: number) {
    setGame((prev) => ({ ...prev, ban }));
  }

  function changePlayer(player: number) {
    setGame((prev) => ({ ...prev, player }));
  }

  function changePlayerName(index: number, name: string, side: Team) {
    setGame((prev) => {
      if (side == "blue") {
        const bluePlayerNames = [...prev.bluePlayerNames];
        bluePlayerNames[index] = name;
        return { ...prev, bluePlayerNames };
      } else {
        const redPlayerNames = [...prev.redPlayerNames];
        redPlayerNames[index] = name;
        return { ...prev, redPlayerNames };
      }
    });
  }

  function swapPlayerNames() {
    setGame((prev) => {
      const bluePlayerNames = [...prev.bluePlayerNames];
      const redPlayerNames = [...prev.redPlayerNames];
      return {
        ...prev,
        bluePlayerNames: redPlayerNames,
        redPlayerNames: bluePlayerNames,
      };
    });
  }

  function resetPlayerNames() {
    setGame((prev) => ({ ...prev, bluePlayerNames: [], redPlayerNames: [] }));
  }

  function changeTeamName(name: string, side: Team) {
    setGame((prev) => {
      if (side == "blue") {
        return { ...prev, blueTeamName: name };
      } else return { ...prev, redTeamName: name };
    });
  }

  function swapTeamName() {
    setGame((prev) => {
      const blue = prev.blueTeamName;
      const red = prev.redTeamName;
      return { ...prev, blueTeamName: red, redTeamName: blue };
    });
  }

  function setPickOrBan(
    type: "pick" | "ban",
    side: Team,
    index: number,
    hero: IHeroes
  ) {
    setGame((prev) => {
      const updated = { ...prev };

      if (type === "pick") {
        if (side === "blue") {
          updated.bluePick[index] = hero;
        } else {
          updated.redPick[index] = hero;
        }
      } else {
        if (side === "blue") {
          updated.blueBan[index] = hero;
        } else {
          updated.redBan[index] = hero;
        }
      }

      return updated;
    });
  }

  return (
    <GameContext.Provider
      value={{
        game,
        changeBan,
        changePlayer,
        changePlayerName,
        swapPlayerNames,
        resetPlayerNames,
        changeTeamName,
        swapTeamName,
        setPickOrBan,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
