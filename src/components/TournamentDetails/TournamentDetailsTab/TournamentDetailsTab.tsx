import { GitBranchPlus, ScrollText, Settings, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import Admin from "./Admin/Admin";
import TestBracket from "./Bracket/test/TestBracket";
import Clan from "./Clan/Clan";
import Rules from "./Rules/Rules";


const TAB_ITEMS = [
  { value: "rules", label: "RULES", icon: ScrollText, component: <Rules /> },
  {
    value: "bracket",
    label: "BRACKET",
    icon: GitBranchPlus,
    component: <TestBracket />,
  },
  { value: "clan", label: "CLAN", icon: Users, component: <Clan /> },
  { value: "admin", label: "ADMIN", icon: Settings, component: <Admin /> },
] as const;

export default function TournamentDetailsTab() {
  return (
    <Tabs defaultValue="bracket" className=" section-gap">
      <TabsList className="w-full h-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full border-b border-gray-200/40">
          {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-200 text-xs md:text-sm lg:text-base"
            >
              <Icon className="w-5 h-5" />
              {label}
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
