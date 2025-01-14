import { Share2 } from "lucide-react";
import { TournamentBannerProps } from "../../../types/types";
import { Separator } from "../../ui/separator";

const TournamentBanner = ({
  bannerImage,
  title,
  subtitle,
  gameName,
  tournamentType,
  platform,
  startDate,
  registrationStatus,
  enrollmentStatus,
  entryFee,
  teamSize,
  maxTeams,
  enrolledTeams,
  skillLevel,
  setShowConfetti
}: TournamentBannerProps) => {




  const handleEnroll = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setShowConfetti((prev: any) => !prev)
  }

  return (
    <div className="mb-[450px] lg:mb-[200px]">
      <div style={{
        backgroundImage: `url("${typeof bannerImage === 'string' ? bannerImage : bannerImage}")`

      }} className="w-full h-[600px] relative bg-cover bg-no-repeat">
        {/* <img
          src={bannerImage}
          alt="banner"
          className="w-full h-full object-fit"
        /> */}
      </div>

      {/* Details Card Section */}
      <div className="bg-[#161616] container absolute left-1/2 transform -translate-x-1/2 -translate-y-2/4 xl:-translate-y-1/2 text-white overflow-x-hidden rounded-2xl w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row gap-5 xl:gap-16 py-8 ">
          <img
            src={bannerImage}
            alt="Tournament banner"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full lg:w-64 xl:w-80 h-auto"
          />
          <div className="flex flex-col gap-8  lg:w-[90%] xl:w-[60%]">
            {/* Section Header */}
            <div className="space-y-3">
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-[32px] font-bold">
                {title}
              </h1>
              <span className="text-gray-400">{subtitle}</span>
            </div>

            {/* Tournament Info Section */}
            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-5 mt-4">
              <div className="flex items-center gap-4 lg:gap-8 font-normal text-sm lg:text-base">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 capitalize">
                    {gameName}
                  </span>
                  <span className="text-[#3B82F6]">{tournamentType}</span>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <span className="text-gray-400 uppercase">{platform}</span>
              </div>
              <button className="text-white flex items-center justify-center bg-[#2E2E2E] px-10 py-2 rounded-md font-medium text-sm xl:text-base">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>

            {/* Registration Section */}
            <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-3 xl:gap-8 items-center justify-between font-normal text-sm xl:text-[17px]">
              <div className="bg-[#2E2E2E] text-[#1E90FF] py-2 text-center rounded-md">
                Registration : {registrationStatus ? "Open" : "Close"}
              </div>
              <div className="bg-[#2E2E2E] text-[#1E90FF] py-2 text-center rounded-md">
                Start Time: {startDate}
              </div>
              <button onClick={handleEnroll} disabled={registrationStatus ? enrollmentStatus ? true : false : true} className="bg-[#1E90FF] py-2 text-center rounded-md text-white text-sm xl:text-[17px] font-bold hover:bg-[#2563EB]">
                {registrationStatus ? enrollmentStatus ? "Enrolled" : "Enroll Now" : "Closed"}
              </button>
            </div>

            {/* Details Section */}
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div>
                <div className="text-sm md:text-base xl:text-lg font-medium text-gray-400">
                  ENTRY/PLAYER
                </div>
                <div className="text-base xl:text-xl font-medium">
                  {entryFee}
                </div>
              </div>
              <div>
                <div className="text-sm md:text-base xl:text-lg font-medium text-gray-400">
                  TEAM SIZE
                </div>
                <div className="text-base xl:text-xl font-medium">
                  {teamSize}
                </div>
              </div>
              <div>
                <div className="text-sm md:text-base xl:text-lg font-medium text-gray-400">
                  MAX TEAMS
                </div>
                <div className="text-base xl:text-xl font-medium">
                  {maxTeams}
                </div>
              </div>
              <div>
                <div className="text-sm md:text-base xl:text-lg font-medium text-gray-400">
                  ENROLLED
                </div>
                <div className="text-base xl:text-xl font-medium">
                  {enrolledTeams}
                </div>
              </div>
              <div>
                <div className="text-sm md:text-base xl:text-lg font-medium text-gray-400">
                  SKILL Level
                </div>
                <div className="text-base xl:text-xl font-medium">
                  {skillLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBanner;
