import { TournamentProps } from "../../../types/types";
import OctagonCard from "../../shared/octagon/octagon";

interface BattleBannerProps {
  tournaments: TournamentProps;
}

const BattleBanner: React.FC<BattleBannerProps> = ({ tournaments }) => {

  return (
    <div className="w-full">
      {/* Banner Image */}
      {tournaments && (
        <div>
          <div className="relative w-full h-[500px]">

            <div style={{
              backgroundImage: `url("${typeof tournaments.imageSrc === 'string' ? tournaments.imageSrc : tournaments.imageSrc}")`

            }} className="w-full h-[600px] relative bg-cover bg-no-repeat">
            </div>
            <div className="z-20 absolute top-2/3 lg:w-4/5 xl:w-3/4 h-80 mx-auto inset-0 bg-black flex flex-col items-center justify-center space-y-6 p-6 rounded-2xl">
              <h1 className="font-bold text-3xl xl:text-[40px] text-white text-center uppercase">
                {tournaments.game}
              </h1>
              {/* Community Tournaments Banner */}

              <div className="rounded-lg overflow-hidden xl:w-2/3 bg-gradient-to-r from-blue-500 to-purple-500 p-8">
                <h2 className="text-white text-center text-2xl font-semibold mb-1">
                  {tournaments.tournamentType === "Community" ? "Community Tournaments" : "Primal Championship"}
                </h2>
                <p className="text-white/80 text-center text-sm">
                  Enter into the biggest esports tournaments and compete with
                  the pros. Free to compete with huge prize pools up for grabs.
                </p>
              </div>
            </div>
          </div>
          {/* Card  */}
          <div className="z-50 lg:w-4/5 xl:w-3/4 mx-auto space-y-4 mt-[280px] rounded-xl p-3 ">

            <div
              className="relative text-white border-zinc-800 shadow-lg bg-[#1F1F1F] lg:p-6 rounded-xl"
            >
              <div className="absolute -left-2 -top-7 xl:-left-5 xl:-top-5 z-20">
                <OctagonCard
                  prize={tournaments.prize ?? 0}
                  description={tournaments.description}
                />
              </div>
              <div className="p-4 flex flex-col sm:flex-row md:flex-col xl:flex-row gap-4 overflow-hidden ">
                {/* Image */}
                <div className="w-full sm:w-40 md:w-full xl:w-60  rounded overflow-hidden flex-shrink-0">
                  <img
                    src={tournaments?.imageSrc}
                    alt={`Thumbnail for ${tournaments?.title}`}
                    className="w-full h-full object-fill"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col  items-start justify-between px-2 ">
                  <h3 className="text-2xl font-bold mb-2">
                    {" "}
                    {tournaments?.title}
                  </h3>

                  <div className="flex items-center gap-5 text-zinc-400 xl:text-lg">
                    <span className="capitalize"> {tournaments.game}: {tournaments.tournamentType === "Community" ? "Community Tournaments" : "Primal Championship"}</span>
                    <span className="text-red-500">|</span>
                    <span>{tournaments.regions}</span>
                  </div>
                  {/* Details */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6 w-full text-sm md:text-base xl:text-lg font-medium">
                    <div className="space-y-[10px]">
                      <div className="text-gray-400">ENTRY/PLAYER</div>
                      <div className="text-lg xl:text-2xl">
                        {" "}
                        ${tournaments?.entryFee}
                      </div>
                    </div>
                    <div className="space-y-[10px]">
                      <div className="text-gray-400">TEAM SIZE</div>
                      <div className="text-lg xl:text-2xl">
                        {" "}
                        {tournaments?.teamSize}
                      </div>
                    </div>

                    <div className="space-y-[10px]">
                      <div className="text-gray-400">MAX TEAMS</div>
                      <div className="text-lg xl:text-2xl">
                        {tournaments.maxTeams}
                      </div>
                    </div>
                    <div className="space-y-[10px]">
                      <div className="text-gray-400">ENROLLED</div>
                      <div className="text-lg xl:text-2xl">
                        {tournaments.enrolledTeams}
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2  bg-[#1C1B1D] p-3 lg:p-5 border border-white/20 rounded-lg flex flex-col lg:flex-row gap-10 md:gap-5 lg:items-center justify-between font-medium xl:text-lg">
                    <div className="space-y-1 py-3">
                      <div className="flex items-center gap-2">
                        <span className="">Registration -</span>
                        <span className="text-blue-500">
                          {tournaments.registrationStatus ? "Open" : "Closed"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="">Starting time -</span>
                        <span className="text-blue-500">
                          {new Date(tournaments.date).toDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleBanner;
