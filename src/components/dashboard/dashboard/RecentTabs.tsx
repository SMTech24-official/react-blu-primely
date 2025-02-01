import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Overview, Payment, Tournaments, UserAndClan } from "../../../lib/icons/AllIcons";
import FinancialTab from "./allTabs/FinancialTab";
import PlayerTab from "./allTabs/PlayerTab";
import RecentAll from "./allTabs/RecentAll";
import TournamentsTab from "./allTabs/TournamentsTab";



export default function RecentTab() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");

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
        { value: "all", label: "All", icon: Overview, component: <RecentAll /> },
        { value: "tournaments", label: "Tournaments", icon: Tournaments, component: <TournamentsTab /> },
        { value: "players", label: "Players", icon: UserAndClan, component: <PlayerTab /> },
        { value: "financial", label: "Financial", icon: Payment, component: <FinancialTab /> },
        // { value: "chat", label: "Chat", icon: ChatIcon, component: <CommunicationComponent /> },
    ];

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="bg-fourthColor">
            <TabsList className="bg-fourthColor w-full mb-3 sm:mb-4 md:mb-6 lg:mb-10">
                <div className="grid grid-cols-4 items-center justify-center w-full  bg-fourthColor ">
                    {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
                        <TabsTrigger
                            key={value}
                            value={value}
                            className="flex  w-full items-center justify-center gap-2 text-gray-400 hover:text-gray-200 border-b border-transparent data-[state=active]:border-blue-400 pb-2 sm:pb-3 lg:pb-6"
                        >
                            <div className="flex items-center justify-center gap-2 w-full">
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
