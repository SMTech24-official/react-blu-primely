import ClanTab from "./ClanTab";
import { PageHeader } from "./PageHeader";
import banner from "@/assets/header/clan.jpg";

import logo from "@/assets/tournament/team-logo.png";



const dummyTeams = {
    teamName: "Team 1",
    teamLogo: logo,
    players: [
        {
            name: "Player A",
            discordId: "100",
            avatar: logo,
        },
        {
            name: "Player B1",
            discordId: "2001",
            avatar: logo,
        },
    ],
}



const ClanPage = () => {
    return (
        <div>
            <PageHeader subTitle="We are a community of elite gamers passionate about dominating the battlefield in  Apex Legends. Founded in 2017, 6OFpsDuo has grown into one of the most respected clans in the gaming arena, known for our strategic gameplay, teamwork, and relentless pursuit of victory" title="Welcome to Apex Legends" backgroundImage={banner} />
            <div className="section-gap container">
                <ClanTab teams={dummyTeams} />
            </div>
        </div>
    );
};

export default ClanPage;