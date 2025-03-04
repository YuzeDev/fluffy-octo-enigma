import Control from "@/components/control/control";
import Display from "@/components/display";
import { GameProvider } from "@/context/game";

export default function Home() {
  return (
    <GameProvider>
      <Display />
      <Control />
    </GameProvider>
  );
}
