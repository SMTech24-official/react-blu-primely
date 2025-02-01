import MetricCards from "./MetricCards";
import RecentTab from "./RecentTabs";

const DashBoardPage = () => {
    return (
        <div className="p-4">
            <MetricCards players={120} revenue={1200} tournments={20} />
            <div className="p-6 bg-fourthColor mt-10 rounded-lg">
                <RecentTab />
            </div>
        </div>
    );
};

export default DashBoardPage;