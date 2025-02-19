/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createTheme,
  SingleEliminationBracket,
  SVGViewer
} from "@g-loot/react-tournament-brackets";
import React from "react";
import { matches } from "./match";
import useDeviceSize from "../../../../hooks/useDeviceSize";

// Define a custom theme
const BlackTheme = createTheme({
  textColor: { main: "#FFFFFF", highlighted: "#D1D3D8", dark: "#A0A4A9" },
  matchBackground: { wonColor: "#2C3E50", lostColor: "#34495E" },
  score: {
    background: { wonColor: "#1ABC9C", lostColor: "#E74C3C" },
    text: { highlightedWonColor: "#16A085", highlightedLostColor: "#E74C3C" },
  },
  border: {
    color: "#34495E",
    highlightedColor: "#1ABC9C",
  },
  roundHeader: { backgroundColor: "#1ABC9C", fontColor: "#FFFFFF" },
  connectorColor: "#34495E",
  connectorColorHighlight: "#1ABC9C",
  svgBackground: "#2C3E50",
  hoverEffect: {
    path: {
      stroke: "#1E90FF", // Blue color on hover
    },
  },
});

const FixtureBracket: React.FC = () => {
  const { width } = useDeviceSize()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent container section-gap overflow-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Tournament Bracket
      </h2>
      <div className="w-full overflow-x-auto rounded-lg shadow-lg overflow-scroll">
        <SingleEliminationBracket
          matches={matches}
          theme={BlackTheme}
          svgWrapper={({ children, ...props }: { children: any }) => (
            <SVGViewer width={width} height={1000} {...props}>
              {children}
            </SVGViewer>
          )}
          matchComponent={({
            topParty,
            bottomParty,
            onMouseEnter,
            teamNameFallback,
            resultFallback,
          }: {
            topParty: any,
            bottomParty: any,
            onMouseEnter: any,
            teamNameFallback: any,
            resultFallback: any,
          }) => (
            <div className="css_bg p-[2px] rounded-lg">
              <div className="flex flex-col gap-2 p-2 bg-fourthColor  rounded-lg shadow-md transition-all duration-300 hover:scale-105">
                <div
                  className="team flex justify-between items-center p-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition"
                  onMouseEnter={() => onMouseEnter(topParty.id)}
                >
                  <span className="text-white font-medium">
                    {topParty.name || teamNameFallback}
                  </span>
                  <span className="text-green-400 font-bold">
                    {topParty.resultText ?? resultFallback(topParty)}
                  </span>
                </div>
                {/* <div className="divider h-1 bg-blue-500 mx-6" /> */}
                <div
                  className=" flex justify-between items-center p-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition"
                  onMouseEnter={() => onMouseEnter(bottomParty.id)}
                >
                  <span className="text-white font-medium">
                    {bottomParty.name || teamNameFallback}
                  </span>
                  <span className="text-red-400 font-bold">
                    {bottomParty.resultText ?? resultFallback(bottomParty)}
                  </span>
                </div>

              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default FixtureBracket;