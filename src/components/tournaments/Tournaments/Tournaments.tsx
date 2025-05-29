
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import { tournaments } from "../../../lib/fakeData/tournments";
import { Tournament, useGetTournamentsQuery } from "../../../redux/apis/tournament/TournamentApi";
import TournamentCard from "../../allCards/tournmentCommunity/TournmentsCommunity";
import Loading from "../../others/Loading";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";
import SwiperSlider from "../../shared/slider/SwiperSlider";

export default function Tournaments() {
  const [currentPage, setCurrentPage] = useState(1);
  const tournamentsPerPage = 6;



  const { data: GameData, isLoading } = useGetTournamentsQuery({})

  if (isLoading) {
    return <Loading />
  }



  const indexOfLastTournament = currentPage * tournamentsPerPage;
  // const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  // const currentTournaments = tournaments.slice(indexOfFirstTournament, indexOfLastTournament);

  const nextPage = () => setCurrentPage(prev => prev + 1);
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1)); // Prevent going below page 1



  return (
    <div className="container section-gap">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tournaments</h1>
        <p className="text-gray-400 mb-8">Explore upcoming, live, and past tournaments</p>

        {GameData && GameData?.data?.length > 0 ? (
          <div className="sm:grid grid-cols-1 md:grid-cols-2 gap-10 hidden ">
            {GameData?.data?.map((tournament: Tournament, idx: number) => (
              <div key={idx} className="relative">
                <TournamentCard
                  id={tournament.id}
                  badge={true}
                  imageSrc={tournament.image}
                  prize={tournament.prizePool}
                  description={tournament.description}
                  title={tournament.title}
                  date={tournament.startDate}
                  entryFee={tournament.entryFee}
                  teamSize={tournament.teamSize}
                  regions={tournament.region}
                  skillLevel={tournament.skillLevel}
                />
              </div>
            ))}
          </div>
        ) : (
          <NoDataAvailable text="No tournaments available right now" />
        )}
        <div className="sm:hidden block">
          <SwiperSlider spaceLg={2} spaceMd={1} spaceSm={1}>
            {GameData && GameData?.data?.length > 0 ? GameData?.data?.map((tournament: Tournament, idx: number) => (
              <SwiperSlide key={idx} className="">
                <TournamentCard
                  id={tournament.id}
                  badge={true}
                  imageSrc={tournament.image}
                  prize={tournament.prizePool}
                  description={tournament.description}
                  title={tournament.title}
                  date={tournament.startDate}
                  entryFee={tournament.entryFee}
                  teamSize={tournament.teamSize}
                  regions={tournament.region}
                  skillLevel={tournament.skillLevel}
                />
              </SwiperSlide>
            )
            ) : (
              <NoDataAvailable text="No tournaments available right now" />
            )}
          </SwiperSlider>
        </div>


        {/* Pagination */}
        <div className=" hidden sm:flex justify-between mt-28 max-w-[100px] ml-auto">
          <button className="css_bg p-2 rounded-full" onClick={prevPage} disabled={currentPage === 1}>
            <ChevronLeft />
          </button>
          <button className="css_bg p-2 rounded-full" onClick={nextPage} disabled={indexOfLastTournament >= tournaments.length}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}


// {
//   FeaturedTournaments?.map((data, idx) => <SwiperSlide key={idx} className=''><FeaturenmentsCard slug={data.slug} image={data.imageSrc.src} tournaments={data.game} /></SwiperSlide>)
// }