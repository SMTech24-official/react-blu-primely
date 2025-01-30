
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Achievements, ChatIcon, Matches, Overview, RoasterIcon } from "../../lib/icons/AllIcons";
import Clan from "../leaderboards/Clan/Clan";
import Admin from "../TournamentDetails/TournamentDetailsTab/Admin/Admin";
import Rules from "../TournamentDetails/TournamentDetailsTab/Rules/Rules";
import Roaster from "./Roaster";

type Teams = {
    teamName: string;
    teamLogo: string;
    players: {
        name: string;
        discordId: string;
        avatar: string;
    }[];
};


export default function ClanTab({ teams }: { teams: Teams }) {


    const TAB_ITEMS = [
        { value: "overview", label: "Overview", icon: Overview, component: <Rules /> },
        {
            value: "roaster",
            label: "Roster",
            icon: RoasterIcon,
            component: <Roaster players={teams.players} />,
        },
        { value: "achievements", label: "Achievements", icon: Achievements, component: <Clan /> },
        { value: "matches", label: "Matches", icon: Matches, component: <Admin /> },
        { value: "chat", label: "Chat", icon: ChatIcon, component: <Admin /> },
    ]



    return (
        <Tabs defaultValue="rules" className="">
            <TabsList className="w-full p-2 mb-20">
                <div className={`grid grid-cols-5 items-center justify-center w-full overflow-y-scroll `}>
                    {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
                        <TabsTrigger
                            key={value}
                            value={value}
                            className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-200 data-[state=active]:border-b border-blue-400 pb-2 sm:pb-3 lg:pb-6"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Icon />
                                <p className="text-nowrap hidden sm:block">{label}</p>
                            </div>
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>
            {TAB_ITEMS.map(({ value, component }) => (
                <TabsContent key={value} value={value}>
                    {component}
                </TabsContent>
            ))}
        </Tabs>
    );
}
