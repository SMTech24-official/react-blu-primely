import { GitBranchPlus, ScrollText, Users } from "lucide-react";
import { participants } from "../../../redux/apis/tournament/TournamentApi";
import NewBracket from "../../newBracket/NewBracket";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import Clan from "./Clan/Clan";
import Rules from "./Rules/Rules";
import { useLocation } from "react-router-dom";

export default function TournamentDetailsTab({
  rules,
  participants,
}: {
  rules: string;
  participants: participants[];
}) {
  const location = useLocation(); // Get the current location
  const path = location.pathname; // Extract the pathname
  // const { width, height } = useWindowSize();
  const id = path?.split("/")[2];

  const TAB_ITEMS = [
    {
      value: "rules",
      label: "RULES",
      icon: ScrollText,
      component: <Rules rules={rules} />,
    },
    {
      value: "bracket",
      label: "BRACKET",
      icon: GitBranchPlus,
      component: (
        <div className="lg:mx-24">
          <NewBracket admin={false} newId={id} />
        </div>
      ),
    },
    {
      value: "clan",
      label: "CLAN",
      icon: Users,
      component: <Clan participants={participants} />,
    },
    // { value: "admin", label: "ADMIN", icon: Settings, component: <Admin /> },
  ] as const;

  return (
    <Tabs defaultValue="bracket" className=" section-gap ">
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
