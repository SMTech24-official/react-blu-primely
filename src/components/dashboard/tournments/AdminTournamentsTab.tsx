import { useState } from "react"
import {
    Select, SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select"
import { tournaments } from "../../../lib/fakeData/tournments";
import { TournamentProps } from "../../../types/types";
import TournamentCard from "../../allCards/tournmentCommunity/TournmentsCommunity";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";
import { DatePickerDemo } from "../../datePicker/Date";





export default function AdminTournamentsTab() {


    const [selectedGame, setSelectedGame] = useState<string>("started");
    const [selectedSkill, setSelectedSkill] = useState<string>("all");
    const [type, setType] = useState<string>("all");



    const [date, setDate] = useState<Date>()
    return (
        <div className="p-4 bg-fourthColor rounded-lg">
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 ">
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

                    {/* Skill Level Filter */}
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-full bg-transparent border-gray-800">
                            <SelectValue placeholder="Skill Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="tournaments">Tournaments</SelectItem>
                            <SelectItem value="championship">Championship</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                        <SelectTrigger className="w-full bg-transparent border-gray-800">
                            <SelectValue placeholder="Skill Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Skill</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {tournaments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tournaments
                            .map((tournament: TournamentProps, idx: number) => (
                                <TournamentCard
                                    game={tournament.game}
                                    enrollmentStatus={tournament.enrollmentStatus}
                                    registrationStatus={tournament.registrationStatus}
                                    badge={false}
                                    key={idx}
                                    imageSrc={tournament.imageSrc}
                                    prize={tournament.prize}
                                    description={tournament.description}
                                    title={tournament.title}
                                    date={tournament.date}
                                    entryFee={tournament.entryFee}
                                    teamSize={tournament.teamSize}
                                    regions={tournament.regions}
                                    skillLevel={tournament.skillLevel}
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

