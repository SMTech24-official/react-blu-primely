import { Plus } from "lucide-react";
import { useState } from "react";
import { tournaments } from "../../../lib/fakeData/tournments";
import { TournamentProps } from "../../../types/types";
import TournamentsInfo from "../../allCards/tournmentsInfoCard/TournamentsInfo";
import { DatePickerDemo } from "../../datePicker/Date";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";
import { Button } from "../../ui/button";
import {
    Select, SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import MetricCards from "../dashboard/MetricCards";





export default function AdminTournamentsTab() {


    const [selectedGame, setSelectedGame] = useState<string>("started");
    // const [selectedSkill, setSelectedSkill] = useState<string>("all");
    // const [type, setType] = useState<string>("all");



    const [date, setDate] = useState<Date>()
    return (
        <div className="p-4  rounded-lg space-y-11">
            <div className="">
                <MetricCards cardOneText="Total Tournaments" cardThreeText="Completed Tournaments" cardTwoText="Total Participants" subtitle={false} icon={false} players={10} revenue={10} tournments={10} />
            </div>
            <div className="bg-fourthColor p-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
                    <Select value={selectedGame} onValueChange={setSelectedGame}>
                        <SelectTrigger className="w-full bg-transparent border-gray-800">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="started">Started</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                    <DatePickerDemo date={date} setDate={setDate} />
                    <div />
                    <div>
                        <Button
                            className="bg-primary_highlighted hover:bg-blue-600 text-white flex items-center gap-2 w-full h-full"
                        >
                            <Plus className="w-4 h-4" />  Add Tournaments
                        </Button>
                    </div>
                </div>

                {tournaments.length > 0 ? (
                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                        {tournaments
                            .map((tournament: TournamentProps, idx: number) => (
                                <TournamentsInfo
                                    tournamentType={tournament.tournamentType as string}
                                    createdAt=""
                                    maxTeams={tournament.maxTeams as number}
                                    gameName={tournament.game as string}
                                    key={idx}
                                    imageSrc={tournament.imageSrc}
                                    prize={tournament.prize ?? 0}
                                    title={tournament.title}
                                    date={tournament.date}
                                    entryFee={tournament.entryFee}
                                    teamSize={tournament.teamSize}
                                    regions={tournament.regions}
                                    skillLevel={tournament.skillLevel}
                                    status={tournament?.status}
                                />
                            ))}
                    </div>
                ) : (
                    <NoDataAvailable text="No tournaments available right now" />
                )}
            </div>
        </div>
    );
}

