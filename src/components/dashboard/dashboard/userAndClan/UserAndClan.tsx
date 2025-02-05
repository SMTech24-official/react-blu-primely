import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Members } from "../../../../lib/fakeData/leaderboardData";
import { Tournaments, UserAndClan } from "../../../../lib/icons/AllIcons";
import { UserAndTable } from "./UserAndTable";




export default function UserAndClanTab() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("user");

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
        { value: "user", label: "User", icon: UserAndClan, component: <UserAndTable members={Members} /> },
        { value: "clan", label: "Clan", icon: Tournaments, component: <UserAndTable members={Members} /> },
        // { value: "chat", label: "Chat", icon: ChatIcon, component: <CommunicationComponent /> },
    ];

    return (
        <div className="bg-fourthColor p-4 rounded-lg">
            <p className="font-semibold text-2xl uppercase">User and Clan Management</p>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="bg-fourthColor p-4 mt-4">
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

        </div>
    );
}
