"use server";
import GeneralControl from "@/components/control/general";
import TeamControl from "@/components/control/team";

export default async function Control() {
  return (
    <div className="flex flex-col items-center bg-[#232323] h-full py-5 gap-5">
      <GeneralControl />
      <div className="flex w-4/5 gap-[50px] justify-center">
        <TeamControl side="blue" />
        <TeamControl side="red" />
      </div>
    </div>
  );
}
