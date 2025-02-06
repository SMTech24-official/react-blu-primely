import MetricCards from "./MetricCards";
import RecentTab from "./RecentTabs";

const DashBoardPage = () => {
    return (
        <div className="">
            <MetricCards cardOneText="Total Active Tournaments" cardThreeText="Total Players Registered" cardTwoText="Revenue Generated" players={120} revenue={1200} tournments={20} />
            <div className="p-6 bg-fourthColor mt-10 rounded-lg">
                <RecentTab />
            </div>
        </div>
    );
};

export default DashBoardPage;