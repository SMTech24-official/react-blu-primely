
import { ChevronRight } from "lucide-react";

import React, { useEffect, useState } from "react";
import { TournamentProps } from "../../../types/types";
import OctagonCard from "../../shared/octagon/octagon";
import SpotLight from "../../ui/demo";
import { Link } from "react-router-dom";
import PrimaryButton from "../../shared/primaryButton";

const TournamentCard: React.FC<TournamentProps> = ({
  imageSrc,
  title,
  prize,
  date,
  entryFee,
  teamSize,
  regions,
  skillLevel,
  badge,
  registrationStatus,
  enrollmentStatus,
  game
}) => {
  const [timeLeft, setTimeLeft] = useState<string>(date);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startDate = new Date(date);
      const now = new Date();

      const diffInMs = startDate.getTime() - now.getTime();

      if (diffInMs <= 0) {
        setTimeLeft("Started");
        return;
      }

      const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

      let result = "";
      if (days > 0) result += `${days}D `;
      if (hours > 0) result += `${hours}H `;
      if (minutes > 0) result += `${minutes}M `;
      if (seconds > 0) result += `${seconds}S`;

      setTimeLeft(`Starts in ${result.trim()}`);
    };

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, [date]);

  return (
    <div>
      {badge && (
        <div className="absolute -left-2 -top-7 xl:-left-5 xl:-top-5 z-50">
          <OctagonCard
            prize={prize ?? 0}
            description={"Wining Prize"}
          />
        </div>
      )}
      <SpotLight>

        <div className=" rounded-lg bg-[#1E1724] border border-gray-800">
          <div className=" p-4 flex flex-col sm:flex-row md:flex-col xl:flex-row gap-4">
            {/* Image */}
            <div className="w-full sm:w-40 md:w-full xl:w-40 h-52 rounded overflow-hidden flex-shrink-0">
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col  items-start justify-between px-2 ">
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <span>{new Date(date).toDateString()}</span>
                <span className="text-red-500">{timeLeft}</span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm my-6 w-full ">
                <div className="space-y-[10px]">
                  <div className="text-gray-400">ENTRY/PLAYER</div>
                  <div>{entryFee}</div>
                </div>
                <div className="space-y-[10px]">
                  <div className="text-gray-400">TEAM SIZE</div>
                  <div>{teamSize}</div>
                </div>
                <div className="space-y-[10px]">
                  <div className="text-gray-400">REGIONS</div>
                  <div>{regions}</div>
                </div>
                <div className="space-y-[10px]">
                  <div className="text-gray-400">SKILL LEVEL</div>
                  <div>{skillLevel}</div>
                </div>
              </div>

              {/* Button */}
              <Link to={`/tournament-details/${game}`} className="w-full text-center transition-colors flex items-center justify-center gap-2 rounded-md">
                <PrimaryButton root="w-full" parent="w-full">
                  <div className="flex items-center gap-1">
                    {registrationStatus ? enrollmentStatus ? "Enrolled" : "View Details" : "Closed"}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </SpotLight>
    </div>

  );
};

export default TournamentCard;
