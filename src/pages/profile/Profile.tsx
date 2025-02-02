import Achievements from "../../components/ProfilePage/Achievements";
import ClanAndGame from "../../components/ProfilePage/ClanAndGame";
import ProfilePage from "../../components/ProfilePage/ProfilePage";


const Profile = () => {
    return (
        <div>
            <ProfilePage />
            <Achievements />
            <ClanAndGame />
        </div>
    );
};

export default Profile;