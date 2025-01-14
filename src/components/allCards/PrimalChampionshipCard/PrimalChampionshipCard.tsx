import { Link } from "react-router-dom";
import OctagonCard from "../../shared/octagon/octagon";
import { Button } from "../../ui/button";
import { PrimalChampionshipCardProps } from "../../../types/types";


const PrimalChampionshipCard: React.FC<PrimalChampionshipCardProps> = ({
  title,
  image,
  prize,
  battleground,
  enrollmentStatus,
  regions,
  entryFee,
  teamSize,
  maxTeams,
  enrolled,
  registrationStatus,
  startingTime,
  onView,
  game
}) => {
  return (
    <div className=" bg-[#1F1F1F] p-3 xl:p-8 rounded-2xl text-white w-full">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative">
          <div className="absolute -left-8 -top-8 xl:-left-5 xl:-top-5 z-10">
            <OctagonCard className="max-w-[150px] max-h-[150px]" prize={prize ?? 0} description={"Wining Prize"} />
          </div>
          <div className="w-full h-full lg:w-[300px] lg:h-[320px] 2xl:w-[339px] 2xl:h-[366px] rounded ">
            <img
              src={image}
              alt={title}
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between py-4 pr-4 w-full">
          <div className="space-y-6 2xl:space-y-8">
            <h2 className="text-2xl lg:text-3xl xl:text-3xl 2xl:text-[32px] font-bold">
              ${entryFee} Entry {title}
            </h2>

            <div className="flex items-center gap-5 text-zinc-400 xl:text-lg">
              <span>Battle Grounds : {battleground}</span>
              <span className="text-red-500">|</span>
              <span>{regions}</span>
            </div>

            <div className="flex flex-wrap gap-8 text-sm">
              <div>
                <div className="text-zinc-400">ENTRY/PLAYER</div>
                <div className="font-medium  text-lg md:text-xl xl:text-2xl">
                  {entryFee} Credits
                </div>
              </div>
              <div>
                <div className="text-zinc-400">TEAM SIZE</div>
                <div className="font-medium text-lg md:text-xl xl:text-2xl">
                  {teamSize}
                </div>
              </div>
              <div>
                <div className="text-zinc-400">MAX TEAMS</div>
                <div className="font-medium text-lg md:text-xl xl:text-2xl">
                  {maxTeams}
                </div>
              </div>
              <div>
                <div className="text-zinc-400">ENROLLED</div>
                <div className="font-medium text-lg md:text-xl xl:text-2xl">
                  {enrolled}
                </div>
              </div>
            </div>
          </div>

          <div className="xl:w-3/4 mt-6 bg-[#1C1B1D] p-3 lg:p-5 border border-white/20 rounded-lg flex flex-col lg:flex-row gap-10 md:gap-5 lg:items-center justify-between font-medium xl:text-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="">Registration -</span>
                <span className="text-blue-500"> {registrationStatus ? "Open" : "Close"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="">Starting time -</span>
                <span className="text-blue-500">{new Date(startingTime).toDateString()}</span>
              </div>
            </div>
            <Link to={`/tournament-details/${game}`} className="">
              <Button
                onClick={onView}
                className="bg-blue-500 px-8 hover:bg-blue-600 mr-0 xl:mr-14 text-base font-medium"
              >
                {registrationStatus ? enrollmentStatus ? "Enrolled" : "View Details" : "Closed"}
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimalChampionshipCard;
