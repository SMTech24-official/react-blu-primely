/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetRecentMatchQuery } from "../../../redux/apis/match/matchApi";
import MatchCard from "../../allCards/matchCard/MatchCard";
import { DatePickerDemo } from "../../datePicker/Date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { MatchTable } from "./MatchTable";
import Loading from "../../others/Loading";

const MatchesTab = () => {
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [date, setDate] = useState<Date>();

  const { data, isLoading } = useGetRecentMatchQuery({});
  if (isLoading) {
    return <Loading />;
  }

  if (data && !Array.isArray(data.data)) {
    // Now TypeScript knows it's MatchGroupedResponse

    return (
      <div className="space-y-6 md:space-y-8 lg:space-y-14">
        <div className="space-y-2 md:space-y-4 lg:space-y-8">
          <p className="text-lg lg:text-2xl font-bold">
            {" "}
            Matches & Tournaments
          </p>
          <div className=" grid-cols-1 md:grid-cols-3 gap-4 mb-8 hidden">
            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger className="w-full bg-transparent border-gray-800">
                <SelectValue placeholder="Games" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matches</SelectItem>
                <SelectItem value="Tournaments">Tournaments</SelectItem>
                <SelectItem value="Championship">Championship</SelectItem>
              </SelectContent>
            </Select>

            <DatePickerDemo date={date} setDate={setDate} />
          </div>
          <MatchTable members={data.data.upcoming as any} />
        </div>
        <div className="space-y-2 md:space-y-4 lg:space-y-8">
          <p className="text-lg lg:text-2xl font-bold">Recent Matches</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3 md:gap-5 lg:gap-6">
            {data.data.recent?.map((match, index) => (
              <MatchCard
                image={
                  match.tournament.image ||
                  "https://img.freepik.com/free-photo/professional-esports-gamer-back-side-view-rejoices-victory-generative-ai_191095-2016.jpg?ga=GA1.1.603131680.1747477038&semt=ais_hybrid&w=740"
                }
                key={index}
                date={match.tournament.startDate}
                opponent={match.opponent.fullName as string}
                result={
                  match.winnerId
                    ? "N/A"
                    : match.winnerId === match.id
                    ? "Win"
                    : "Loss"
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};
export default MatchesTab;
