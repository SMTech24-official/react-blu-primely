import gameReviewsData from "../../../lib/fakeData/latestNews";
import LatestNewsCard from "../../allCards/latestNews/LatestNewsCard";


const LatestNews = () => {



    return (
        <div className='container section-gap'>
            <div className="space-y-5">
                <h1 className='text-4xl md:text-5xl text-center font-bold text-white uppercase'>Latest News</h1>
                <h6 className='text-center'>Level Up with the Latest Insights and News</h6>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20 ">
                {gameReviewsData.slice(0, 4).map((news, index) => (
                    <LatestNewsCard
                        key={index}
                        image={news.image}
                        title={news.title}
                        description={news.description}
                        publishedDate={new Date(news.publishedDate).toDateString()}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestNews;