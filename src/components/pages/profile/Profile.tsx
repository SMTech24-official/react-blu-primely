import Achievements from '../../ProfilePage/Achievements';
import ClanAndGame from '../../ProfilePage/ClanAndGame';
import ProfilePage from '../../ProfilePage/ProfilePage';

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