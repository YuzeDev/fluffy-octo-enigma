"use client"
import HeroImage from "@/components/hero-image"
import { useDraft } from "@/context/draft"
import { useGame } from "@/context/game"
import { useTeam } from "@/context/team"
import Image from "next/image"
import { memo, useRef, useState } from "react"

const TournamentName = memo(function () {
  const { gameName } = useGame()
  return <p className="text-[1.5vw] font-extrabold">{gameName}</p>
})
TournamentName.displayName = "TournamentName"

export default function Display() {
  const { banCount, playerCount, phaseList, currentPhaseIndex } = useGame()
  const { blueTeamName, redTeamName, bluePlayerNames, redPlayerNames } =
    useTeam()
  const { blueBan, redBan, bluePick, redPick } = useDraft()

  const [backgroundImage, setBackgroundImage] = useState<string>(
    "/assets/other/Pickbg.jpg",
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setBackgroundImage(imageUrl)
    }
  }

  function triggerFileInput() {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col gap-0.5 bg-[#00ff62] p-[50px]">
      <div className="flex h-[3.5vw] w-full items-stretch justify-center gap-0.5">
        {/* Blue side */}
        <div className="flex flex-1 items-stretch justify-end gap-0.5">
          <div className="flex flex-2 flex-row-reverse gap-0.5">
            {Array.from({ length: banCount }).map((_, index) => (
              <div
                className="aspect-square h-full overflow-hidden bg-cyan-300 bg-[url(/assets/other/ban.png)] bg-cover bg-center grayscale"
                key={index}
              >
                <div className="h-auto max-w-full">
                  <HeroImage
                    selectedHero={blueBan[index]}
                    key={index}
                    type="ban"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center bg-[#006bd6]">
            <div className="text-center text-[1.5vw] font-bold">
              {blueTeamName || "BLUE SIDE"}
            </div>
          </div>
        </div>
        {/* Tour Info */}
        <div className="flex flex-[.42] items-center justify-center bg-[url(/assets/other/Tournamentnamebg.jpg)] bg-cover bg-center">
          <TournamentName />
        </div>
        {/* Red side */}
        <div className="header-team-red flex flex-1 items-stretch gap-0.5">
          <div className="flex flex-1 items-center justify-center bg-[#fc0341]">
            <div className="text-center text-[1.5vw] font-bold">
              {redTeamName || "RED SIDE"}
            </div>
          </div>
          <div className="flex flex-2 flex-row gap-0.5">
            {Array.from({ length: banCount }).map((_, index) => (
              <div
                className="aspect-square h-full overflow-hidden bg-cyan-300 bg-[url(/assets/other/ban.png)] bg-cover bg-center grayscale"
                key={index}
              >
                <div className="h-auto max-w-full">
                  <HeroImage
                    selectedHero={redBan[index]}
                    key={index}
                    type="ban"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-[13vw] w-full flex-wrap justify-center gap-0.5">
        <div className="flex h-full flex-1 flex-row gap-0.5">
          {Array.from({ length: playerCount }).map((_, index) => (
            <div key={index} className="flex w-full flex-col overflow-hidden">
              <div
                className="h-full w-full cursor-pointer overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                }}
                aria-hidden="true"
                onClick={triggerFileInput}
              >
                <HeroImage selectedHero={bluePick[index]} key={index} />
              </div>
              <div className="flex h-[1vw] items-center justify-center overflow-clip bg-zinc-800 text-[.7vw] font-semibold">
                {bluePlayerNames[index] || "Player " + (index + 1)}
              </div>
            </div>
          ))}
        </div>
        {/* Tour info */}
        <div className="h-full flex-[.42] bg-[url(/assets/other/Tounamentinfobg.jpg)] bg-cover bg-center">
          <div className="flex h-full flex-col">
            <div className="flex flex-1 items-center justify-center">
              <Image
                className="logoprop"
                src="/assets/other/tournamentlogo.png"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
            <div className="flex justify-center font-bold">
              {phaseList[currentPhaseIndex]}
            </div>
            <div className="flex flex-1 flex-row items-center justify-around overflow-hidden">
              <div className="w-1/4">
                <img src="https://placehold.co/200x200" alt="1" />
              </div>
              <div className="">
                <Image
                  src="/assets/other/vs.png"
                  alt="vs"
                  width={75}
                  height={75}
                />
              </div>
              <div className="w-1/4">
                <img src="https://placehold.co/200x200" alt="2" />
              </div>
            </div>
            {/* <div className="winlose">
              <div className="win1">
                <div className="w">
                  <div className="wimg">
                    <img
                      id="extraImage1"
                      src="/assets/other/win.png"
                      alt="Extra 1"
                    />
                  </div>
                </div>
                <div className="w">
                  <div className="wimg">
                    <img
                      id="extraImage2"
                      src="/assets/other/win.png"
                      alt="Extra 2"
                    />
                  </div>
                </div>
                <div className="w">
                  <div className="wimg">
                    <img
                      id="extraImage3"
                      src="/assets/other/win.png"
                      alt="Extra 3"
                    />
                  </div>
                </div>
              </div>
              <div className="midwin" />
              <div className="win1">
                <div className="w">
                  <div className="wimg">
                    <img
                      id="extraImage6"
                      src="/assets/other/win.png"
                      alt="Extra 6"
                    />
                  </div>
                </div>
                <div className="w">
                  <div className="wimg">
                    <img
                      id="extraImage5"
                      src="/assets/other/win.png"
                      alt="Extra 5"
                    />
                  </div>
                </div>
                <div className="w">
                  <div className="wimg">
                    <img
                      id="extraImage4"
                      src="/assets/other/win.png"
                      alt="Extra 4"
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* Red side */}
        <div className="flex h-full flex-1 flex-row gap-0.5">
          {Array.from({ length: playerCount }).map((_, index) => (
            <div key={index} className="flex w-full flex-col overflow-hidden">
              <div
                className="h-full w-full cursor-pointer overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                }}
                aria-hidden="true"
                onClick={triggerFileInput}
              >
                <HeroImage selectedHero={redPick[index]} key={index} />
              </div>
              <div className="flex h-[1vw] items-center justify-center overflow-clip bg-zinc-800 text-[.7vw] font-semibold">
                {redPlayerNames[index] || "Player " + (index + 1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </div>
  )
}
