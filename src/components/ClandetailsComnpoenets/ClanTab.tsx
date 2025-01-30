import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Achievements, Matches, Overview, RoasterIcon } from "../../lib/icons/AllIcons";
import UnderConstruction from "../others/UnderConstruction";
import OverviewTab from "./Overvie";
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
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    // Sync tab with URL hash on mount
    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (hash) {
            setActiveTab(hash);
        }
    }, [location]);

    // Update URL when tab changes
    const handleTabChange = (value: string) => {
        setActiveTab(value);
        navigate(`#${value}`, { replace: true });
    };

    const TAB_ITEMS = [
        { value: "overview", label: "Overview", icon: Overview, component: <OverviewTab /> },
        { value: "roaster", label: "Roster", icon: RoasterIcon, component: <Roaster players={teams.players} /> },
        { value: "achievements", label: "Achievements", icon: Achievements, component: <UnderConstruction /> },
        { value: "matches", label: "Matches", icon: Matches, component: <UnderConstruction /> },
        // { value: "chat", label: "Chat", icon: ChatIcon, component: <CommunicationComponent /> },
    ];

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full p-2 mb-8 sm:mb-10 md:mb-14 lg:mb-20">
                <div className="grid grid-cols-4 items-center justify-center w-full overflow-y-scroll">
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
