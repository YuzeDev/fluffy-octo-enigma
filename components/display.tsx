"use client";
import HeroImage from "@/components/hero-image";
import { useGame } from "@/context/game";

export default function Display() {
  const {
    game: {
      ban,
      player,
      bluePlayerNames,
      blueTeamName,
      redPlayerNames,
      redTeamName,
      bluePick,
      blueBan,
      redPick,
      redBan,
    },
  } = useGame();

  return (
    <div className="bg-[#00ff62] p-[50px] flex flex-col gap-0.5">
      <div className="flex justify-center items-stretch gap-0.5 w-full h-[3.5vw]">
        {/* Blue side */}
        <div className="flex items-stretch gap-0.5 flex-1 justify-end">
          <div className="flex gap-0.5 flex-2 flex-row-reverse">
            {Array.from({ length: ban }).map((_, index) => (
              <div
                className="h-full aspect-square bg-cyan-300 overflow-hidden bg-[url(/assets/other/ban.png)] bg-center bg-cover grayscale"
                key={index}
              >
                <div className="max-w-full h-auto">
                  <HeroImage selectedHero={blueBan[index]} key={index} />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#006bd6] flex items-center justify-center flex-1">
            <div className="text-[1.5vw] font-bold text-center">
              {blueTeamName || "BLUE SIDE"}
            </div>
          </div>
        </div>
        {/* Tour Info */}
        <div className="bg-[url(/assets/other/Tournamentnamebg.jpg)] bg-cover bg-center flex-[.42] flex items-center justify-center">
          <p
            id="tournamentnameOutput"
            className="text-[1.5vw] font-extrabold"
          />
        </div>
        {/* Red side */}
        <div className="flex items-stretch gap-0.5 flex-1 header-team-red">
          <div className="bg-[#fc0341] flex items-center justify-center flex-1">
            <div className="text-[1.5vw] font-bold text-center">
              {redTeamName || "RED SIDE"}
            </div>
          </div>
          <div className="flex flex-row gap-0.5 flex-2">
            {Array.from({ length: ban }).map((_, index) => (
              <div
                className="h-full aspect-square bg-cyan-300 overflow-hidden bg-[url(/assets/other/ban.png)] bg-center bg-cover grayscale"
                key={index}
              >
                <div className="max-w-full h-auto">
                  <HeroImage selectedHero={redBan[index]} key={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full flex-wrap gap-0.5 h-[13vw]">
        <div className="flex flex-row flex-1 gap-0.5 h-full">
          {Array.from({ length: player }).map((_, index) => (
            <div
              className="overflow-hidden bg-[url(/assets/other/Pickbg.jpg)] bg-center bg-no-repeat bg-cover cursor-pointer w-full"
              key={index}
            >
              <div className="h-5 flex justify-center items-center bg-[#212529] text-sm font-bold">
                {bluePlayerNames[index]}
              </div>
              <div className="max-w-full h-auto">
                <HeroImage selectedHero={bluePick[index]} key={index} />
              </div>
            </div>
          ))}
        </div>
        {/* Tour info */}
        <div className="bg-[url(/assets/other/Tounamentinfobg.jpg)] bg-cover bg-center flex-[.42]">
          {/* <div class="tournamentlogo"> 
              <img class="logoprop" src="Assets/Other/tournamentlogo.png">
          </div>
  
          <div class="bluevsred">
  
              <div class="bluelogo">
                  <div class="image-container">
                      <img id="image1" src="https://via.placeholder.com/300x200?text=Image+1" alt="Image 1" onclick="swapContent()">
                  </div>
              </div>
              
              <div class="vslogo">
                  <img class="vsprop" src="Assets/Other/vs.png">
  
              </div>
              
              <div class="redlogo">
                  <div class="image-container">
                      <img id="image2" src="https://via.placeholder.com/300x200?text=Image+2" alt="Image 2" onclick="swapContent()">
                  </div>
              </div>
              
          </div>
  
          <div class="winlose">
              
              <div class="win1">
  
                  <div class="w">
                      <div class="wimg">
                          <img id="extraImage1" src="Assets/Other/win.png" alt="Extra Image 1">
  
                      </div>
                  </div>
  
                  <div class="w">
                      <div class="wimg">
                          <img id="extraImage2" src="Assets/Other/win.png" alt="Extra Image 2">
  
                      </div>
                  </div>
  
                  <div class="w">
                      <div class="wimg">
                          <img id="extraImage3" src="Assets/Other/win.png" alt="Extra Image 3">
  
                      </div>
                  </div>
  
              </div>
  
              <div class="midwin"></div>
  
              <div class="win1">
  
                  <div class="w">
                      <div class="wimg">
                          <img id="extraImage6" src="Assets/Other/win.png" alt="Extra Image 6">
  
                      </div>
                  </div>
  
                  <div class="w">
                      <div class="wimg">
                          <img id="extraImage5" src="Assets/Other/win.png" alt="Extra Image 5">
  
                      </div>
                  </div>
  
                  <div class="w">
                      <div class="wimg">
                          <img id="extraImage4" src="Assets/Other/win.png" alt="Extra Image 4">
  
                      </div>
                  </div>
                  
              </div>
  
  
  
          </div> */}
        </div>
        {/* Red side */}
        <div className="flex flex-row flex-1 gap-0.5 h-full">
          {Array.from({ length: player }).map((_, index) => (
            <div
              className="overflow-hidden bg-[url(/assets/other/Pickbg.jpg)] bg-center bg-no-repeat bg-cover cursor-pointer w-full"
              key={index}
            >
              <div className="h-5 flex justify-center items-center bg-[#212529] text-sm font-bold">
                {redPlayerNames[index]}
              </div>
              <div className="max-w-full h-auto">
                <HeroImage selectedHero={redPick[index]} key={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
