import achievements, { AchievementType } from "../../../lib/fakeData/achievements";
import Award from "./Award";
import { TableComponents } from "./Table";



const AchievementsTab = () => {

    return (
        <div className="space-y-6 md:space-y-8 lg:space-y-14">
            <div className="space-y-2 md:space-y-4 lg:space-y-8">
                <p className="text-lg lg:text-2xl font-bold"> Tournaments Won</p>
                <TableComponents<AchievementType> members={achievements} />
            </div>
            <div className="space-y-2 md:space-y-4 lg:space-y-8">
                <p className="text-lg lg:text-2xl font-bold">Special Awards</p>
                <Award awards={["mvp", "teamwork"]} />
            </div>
        </div>
    );
};

export default AchievementsTab;