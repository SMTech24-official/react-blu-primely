// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   createTheme,
//   SingleEliminationBracket,
//   SVGViewer
// } from "@g-loot/react-tournament-brackets";
// import React from "react";
// import { matches } from "./match";
// import useDeviceSize from "../../../../hooks/useDeviceSize";

// // Define a custom theme
// const BlackTheme = createTheme({
//   textColor: { main: "#FFFFFF", highlighted: "#D1D3D8", dark: "#A0A4A9" },
//   matchBackground: { wonColor: "#2C3E50", lostColor: "#34495E" },
//   score: {
//     background: { wonColor: "#1ABC9C", lostColor: "#E74C3C" },
//     text: { highlightedWonColor: "#16A085", highlightedLostColor: "#E74C3C" },
//   },
//   border: {
//     color: "#34495E",
//     highlightedColor: "#1ABC9C",
//   },
//   roundHeader: { backgroundColor: "#1ABC9C", fontColor: "#FFFFFF" },
//   connectorColor: "#34495E",
//   connectorColorHighlight: "#1ABC9C",
//   svgBackground: "#2C3E50",
//   hoverEffect: {
//     path: {
//       stroke: "#1E90FF", // Blue color on hover
//     },
//   },
// });

// const FixtureBracket: React.FC = () => {
//   const { width } = useDeviceSize()
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-transparent container section-gap overflow-auto">
//       <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
//         Tournament Bracket
//       </h2>
//       <div className="w-full overflow-x-auto rounded-lg shadow-lg overflow-scroll">
//         <SingleEliminationBracket
//           matches={matches}
//           theme={BlackTheme}
//           svgWrapper={({ children, ...props }: { children: any }) => (
//             <SVGViewer width={width} height={1000} {...props}>
//               {children}
//             </SVGViewer>
//           )}
//           matchComponent={({
//             topParty,
//             bottomParty,
//             onMouseEnter,
//             teamNameFallback,
//             resultFallback,
//           }: {
//             topParty: any,
//             bottomParty: any,
//             onMouseEnter: any,
//             teamNameFallback: any,
//             resultFallback: any,
//           }) => (
//             <div className="css_bg p-[2px] rounded-lg">
//               <div className="flex flex-col gap-2 p-2 bg-fourthColor  rounded-lg shadow-md transition-all duration-300 hover:scale-105">
//                 <div
//                   className="team flex justify-between items-center p-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition"
//                   onMouseEnter={() => onMouseEnter(topParty.id)}
//                 >
//                   <span className="text-white font-medium">
//                     {topParty.name || teamNameFallback}
//                   </span>
//                   <span className="text-green-400 font-bold">
//                     {topParty.resultText ?? resultFallback(topParty)}
//                   </span>
//                 </div>
//                 {/* <div className="divider h-1 bg-blue-500 mx-6" /> */}
//                 <div
//                   className=" flex justify-between items-center p-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition"
//                   onMouseEnter={() => onMouseEnter(bottomParty.id)}
//                 >
//                   <span className="text-white font-medium">
//                     {bottomParty.name || teamNameFallback}
//                   </span>
//                   <span className="text-red-400 font-bold">
//                     {bottomParty.resultText ?? resultFallback(bottomParty)}
//                   </span>
//                 </div>

//               </div>
//             </div>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default FixtureBracket;

import { Trophy } from "lucide-react";
import { useState } from "react";
import Bracket from "../../../newBracket/components/Tournament/Bracket";
import sampleTournament from "../../../newBracket/data/sampleTournament";

function FixtureBracket() {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const handleMatchClick = (matchId: string) => {
    setSelectedMatchId(matchId === selectedMatchId ? null : matchId);
  };

  // Find selected match details
  const getSelectedMatch = () => {
    if (!selectedMatchId) return null;

    for (const round of sampleTournament.rounds) {
      const match = round.matches.find((m) => m.id === selectedMatchId);
      if (match) {
        return {
          match,
          roundName: round.name,
        };
      }
    }
    return null;
  };

  const selectedMatchInfo = getSelectedMatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-white">



      
      <header className="bg-black bg-opacity-30 py-6 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center">
            <Trophy className="h-10 w-10 mr-3 text-amber-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
              {sampleTournament.name}
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Professional eSports Tournament
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Bracket
          tournament={sampleTournament}
          onMatchClick={handleMatchClick}
        />

        {selectedMatchInfo && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              {selectedMatchInfo.roundName}:{" "}
              {selectedMatchInfo.match.teams[0]?.name || "TBD"} vs{" "}
              {selectedMatchInfo.match.teams[1]?.name || "TBD"}
              {selectedMatchInfo.match.winner && (
                <Trophy className="h-5 w-5 ml-2 text-amber-400" />
              )}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-medium mb-2">Match Details</h4>
                <ul className="space-y-2 text-gray-200">
                  <li className="flex justify-between">
                    <span>Status:</span>
                    <span
                      className={`font-medium ${
                        selectedMatchInfo.match.status === "completed"
                          ? "text-green-400"
                          : selectedMatchInfo.match.status === "inProgress"
                          ? "text-amber-400"
                          : "text-blue-400"
                      }`}
                    >
                      {selectedMatchInfo.match.status === "completed"
                        ? "Completed"
                        : selectedMatchInfo.match.status === "inProgress"
                        ? "In Progress"
                        : "Upcoming"}
                    </span>
                  </li>
                  {selectedMatchInfo.match.winner && (
                    <li className="flex justify-between">
                      <span>Winner:</span>
                      <span className="text-amber-400 font-medium flex items-center">
                        {
                          selectedMatchInfo.match.teams.find(
                            (t) => t?.id === selectedMatchInfo.match.winner
                          )?.name
                        }
                        <Trophy className="h-4 w-4 ml-1" />
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-medium mb-2">Team Records</h4>
                <div className="space-y-3">
                  {selectedMatchInfo.match.teams.map((team, index) =>
                    team ? (
                      <div
                        key={team.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
                            {team.seed}
                          </div>
                          <div>
                            <span
                              className={
                                team.id === selectedMatchInfo.match.winner
                                  ? "text-amber-400 font-medium"
                                  : ""
                              }
                            >
                              {team.name}
                            </span>
                            <div className="text-xs text-gray-400">
                              Record: {team.wins}-{team.losses}
                            </div>
                          </div>
                        </div>
                        {team.id === selectedMatchInfo.match.winner && (
                          <Trophy className="h-4 w-4 text-amber-400" />
                        )}
                      </div>
                    ) : (
                      <div key={index} className="text-gray-400">
                        TBD
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
                onClick={() => setSelectedMatchId(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default FixtureBracket;
