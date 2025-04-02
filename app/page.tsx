"use server"
import Display from "@/app/display"
import GeneralControl from "@/app/general-control"
import TeamControl from "@/app/team-control"
import { DraftProvider } from "@/context/draft"
import { GameProvider } from "@/context/game"
import { TeamProvider } from "@/context/team"
import getHeroes from "@/helper/get-heroes"

export default async function Home() {
  const data = await getHeroes()

  return (
    <GameProvider>
      <TeamProvider>
        <DraftProvider>
          <Display />
          <div className="flex h-full justify-center gap-5 bg-[#232323] p-5 py-10">
            <TeamControl side="blue" heroes={data} />
            <GeneralControl />
            <TeamControl side="red" heroes={data} />
          </div>
        </DraftProvider>
      </TeamProvider>
    </GameProvider>
  )
}
