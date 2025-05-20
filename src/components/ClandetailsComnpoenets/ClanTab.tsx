import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Achievements, Matches, Overview, RoasterIcon } from "../../lib/icons/AllIcons";
import { Clan, ClanMember } from "../../redux/types";
import AchievementsTab from "./Achievements/Achievements";
import MatchesTab from "./matches/Matches";
import OverviewTab from "./Overvie";
import Roaster from "./Roaster";


export default function ClanTab({ data, }: { data: Clan | null }) {
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
        { value: "overview", label: "Overview", icon: Overview, component: <OverviewTab overview={data} /> },
        { value: "roaster", label: "Roster", icon: RoasterIcon, component: <Roaster players={data?.ClanMember as ClanMember[]} /> },
        { value: "achievements", label: "Achievements", icon: Achievements, component: <AchievementsTab /> },
        { value: "matches", label: "Matches", icon: Matches, component: <MatchesTab /> },
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
                            className="flex  w-full items-center justify-center gap-2 text-gray-400 hover:text-gray-200 border-b border-transparent data-[state=active]:border-blue-400 pb-2 sm:pb-3 lg:pb-6"
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
