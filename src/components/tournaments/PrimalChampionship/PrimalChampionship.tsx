/* eslint-disable @typescript-eslint/no-explicit-any */
import { primalChampionship } from "../../../lib/fakeData/primalChampionship";
import PrimalChampionshipCard from "../../allCards/PrimalChampionshipCard/PrimalChampionshipCard";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";

export default function PrimalChampionship() {
  return (
    <div className="container section-gap">
      <div className="">
        <h1 className="text-4xl md:text-5xl font-bold mb-16">
          Primal Championship
        </h1>
        {primalChampionship.length > 0 ? (
          <div className="flex flex-col flex-wrap gap-12">
            {primalChampionship?.map((tournament: any, idx: number) => (
              <PrimalChampionshipCard key={idx} {...tournament} />
            ))}
          </div>
        ) : (
          <NoDataAvailable text="No Championship available right now" />
        )}
      </div>
    </div>
  );
}
