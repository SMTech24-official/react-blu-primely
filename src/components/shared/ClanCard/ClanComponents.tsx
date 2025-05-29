/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "@/assets/tournament/team-logo.png";
import { participants } from "../../../redux/apis/tournament/TournamentApi";
import ClanCard from "../../allCards/ClanCard/ClanCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const ClanComponents = ({ teams, isRosterHidden }: { teams: participants[], isRosterHidden: boolean }) => {


  return (
    <div className="space-y-4 container sm:mt-16 mt-10">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-medium">TEAM</h2>
        <div className="w-36 text-lg hidden">
          <Select>
            <SelectTrigger className="text-white">
              <SelectValue placeholder="Row Per Page" />
            </SelectTrigger>
            <SelectContent className="w-10 text-white">
              <SelectItem
                value="10"
                className="border-b-2 border-gray-200/40 rounded-none px-6 py-2"
              >
                10
              </SelectItem>
              <SelectItem
                value="20"
                className="border-b-2 border-gray-200/40 rounded-none px-6 py-2"
              >
                20
              </SelectItem>
              <SelectItem
                value="50"
                className="border-b-2 border-gray-200/40 rounded-none px-6 py-2"
              >
                50
              </SelectItem>
              <SelectItem value="100" className="rounded-none px-6 py-2">
                100
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {teams?.length > 0 ? (
        teams.map((team: any, index: number) => (
          <ClanCard
            key={index}
            teamName={team.name}
            teamLogo={logo}
            players={team.ClanMember}
            id={team.id}
            isRosterHidden={isRosterHidden}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">No clan joined yet</p>
        </div>
      )}
    </div>
  );
};

export default ClanComponents;
