"use client";
import { useGame } from "@/context/game";
import React from "react";

export default function GeneralControl() {
  const { swapPlayerNames, resetPlayerNames, swapTeamName } = useGame();
  return (
    <div className="flex gap-2.5 items-center w-4/5 justify-center p-5 flex-wrap border border-[rgba(255,255,255,0.4)] rounded-[5px] relative">
      <div className="bg-[#232323] p-[3px] inline-block font-bold absolute -top-[15px] left-[15px]">
        Control
      </div>
      <input
        type="text"
        id="tournamentnamemid"
        className="input"
        placeholder="Nama tournament"
      />
      <div className="d-btn-container">
        <button
          className="d-btn"
          //   onclick="toggleDBtn()"
          id="d-btn-ban"
        >
          Ban 3
        </button>
        <div className="d-btn-content" id="d-btn-ban-content">
          <button
          // onclick="changeBan(event, 3)"
          >
            Ban 3
          </button>
          <button
          // onclick="changeBan(event, 5)"
          >
            Ban 5
          </button>
        </div>
      </div>
      <button
        className="btn"
        // onclick="resetAllDropdowns()"
      >
        Reset Pick
      </button>
      <button className="btn" onClick={() => resetPlayerNames()}>
        Reset Nick
      </button>
      <button className="btn" onClick={() => swapPlayerNames()}>
        Switch Nickname
      </button>
      <button className="btn" onClick={() => swapTeamName()}>
        Switch Team
      </button>
      <button
        className="btn"
        // onclick="resetContent()"
      >
        Reset
      </button>
    </div>
  );
}
