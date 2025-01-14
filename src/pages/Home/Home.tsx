import Banner from "../../components/home/banner/Banner";
import TournamentPage from "../../components/home/communityTournments/CommunityTournmentsCom";
import Feature from "../../components/home/feature/Feature";
import FeatureTournments from "../../components/home/featuredTournments/FeatureTournments";
import LatestNews from "../../components/home/latestnews/LatestNews";
import PlayerOfTheWeek from "../../components/home/playerOfTheWeek/PlayerOfTheWeek";
import { FloatingNavbar } from "../../components/shared/navbar/Floating-Navbar";

const Home = () => {
    return (
        <div className=''>
            <Banner />
            <FloatingNavbar />
            <FeatureTournments />
            <Feature />
            <TournamentPage />
            <PlayerOfTheWeek />
            <LatestNews />
        </div>
    );
};

export default Home;