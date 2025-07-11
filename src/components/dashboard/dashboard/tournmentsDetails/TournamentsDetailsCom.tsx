import { formatCurrency } from "../../../../lib/utils";
import { TournamentProps } from "../../../../types/types";

export default function TournamentDetails({
  date,
  entryFee,
  imageSrc,
  prize,
  regions,
  skillLevel,
  teamSize,
  title,
  enrolledTeams,
  game,
  maxTeams,
  platform,
  status,
  subtitle,
  tournamentType,
  rules,
  handleGenerateMatches,
  id,
  handleDelete,
}: TournamentProps) {
  return (
    <div className="min-h-screen bg-fourthColor text-white p-4 rounded-lg">
      <div className="p-4">
        <p className="font-semibold text-2xl uppercase">About The Game</p>

        <div className="space-y-6 mt-4">
          {/* Banner Image */}
          <div className="relative w-full h-[200px] lg:h-[500px] rounded-lg overflow-hidden">
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={title}
              className="object-cover w-full h-auto"
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <button
                onClick={() => handleGenerateMatches?.(id)}
                className="bg-[#1E90FF] py-2 text-center rounded-md text-white text-sm xl:text-[17px] font-bold hover:bg-[#2563EB] px-3"
              >
                Generate Match
              </button>
            </div>
            <div>
              <button
                onClick={() => handleDelete?.(id)}
                className="bg-[#d64734] py-2 text-center rounded-md text-white text-sm xl:text-[17px] font-bold hover:bg-[#ff5d41] px-3"
              >
                Delete tournament
              </button>
            </div>
          </div>

          {/* Tournament Name */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
            <p className="text-zinc-400 text-sm md:text-base">{subtitle}</p>
          </div>

          {/* Tournament Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Status :</span>
              <span
                className={` uppercase text-center  ${
                  status
                    ? status === "ACTIVE"
                      ? " text-green-600"
                      : status === "UPCOMING"
                      ? " text-blue-600"
                      : status === "CANCEL"
                      ? " text-red-600"
                      : ""
                    : " text-red-600"
                }`}
              >
                {status ? status : "Closed"}
              </span>
            </div>
            {/* <div className="flex justify-between items-center">
              <span className="text-zinc-400">Registration Status :</span>
              <span
                className={`${registrationStatus ? "text-green-500" : "text-red-400"
                  }`}
              >
                {registrationStatus ? "Open" : "Closed"}
              </span>
            </div> */}
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Category :</span>
              <span>{tournamentType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Game :</span>
              <span className="logo text-xs px-1 py-[2px] border uppercase">
                {game}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Team Size :</span>
              <span>{teamSize}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Entry Fee :</span>
              <span>{formatCurrency(entryFee)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Region :</span>
              <span>{regions}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Prize Pool :</span>
              <span className="text-blue-500">{formatCurrency(prize)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Max Team :</span>
              <span>{maxTeams} Teams</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Total Registrations :</span>
              <span>{enrolledTeams} Players</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Game Platform :</span>
              <span>{platform}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Skill Level :</span>
              <span>{skillLevel}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Start Date :</span>
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Rules Section */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              RULES AND REGULATIONS
            </h3>
            <div className="space-y-4">
              <div dangerouslySetInnerHTML={{ __html: rules ?? "ss" }} />
            </div>
            <p className="text-zinc-500 text-xs mt-4">
              All rights reserved by Admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
