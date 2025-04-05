import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SecondaryButton from "../../shared/secondaryButton";
import { ClanCardProps } from "../../../types/types";

import logo from "@/assets/tournament/team-logo.png";

export default function ClanCard({
  teamName,
  teamLogo,
  players,
  id
}: ClanCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  console.log(players);
  return (
    <div className="group mb-2 w-full overflow-hidden rounded-2xl bg-[#1A1B1E] text-white transition-all duration-200 hover:bg-[#22232A]">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 md:p-8">
        <div className="flex items-center gap-3">
          <img
            src={teamLogo}
            alt={`${teamName} logo`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <h3 className="text-lg font-semibold">{teamName}</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            className=" focus-visible:ring-offset-[#1A1B1E]  font-normal text-base flex items-center gap-1 text-white hover:text-[#6FA5FF]"
            onClick={toggleCollapse}
            aria-label={isOpen ? "Hide team roster" : "Show team roster"}
          >
            {isOpen ? "Hide Roster" : "Show Roster"}
            {isOpen ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 px-3 md:px-6 pb-4">
          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={player.user.id}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
              >
                <img
                  src={player.user.profilePicture || logo}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{player.user.fullName || player.user.userName}</div>
                  <div className="text-sm text-gray-400">
                    Corazon#{player.user.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto md:mx-0">
            <SecondaryButton
              to={`/clan-details/${id}`}
              parent="rounded-md"
              child="rounded-md px-6 lg:px-10"
            >
              <p className="text-sm md:text-base">View details</p>
            </SecondaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
