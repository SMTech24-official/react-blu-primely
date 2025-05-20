import React from 'react';
import { TeamProps } from './types';
import { Trophy } from 'lucide-react';

const Team: React.FC<TeamProps> = ({ team, isWinner, matchStatus }) => {
  if (!team) {
    return (
      <div className="team-slot h-14 px-3 py-2 flex items-center bg-gray-800 bg-opacity-30 rounded-md border border-gray-700">
        <span className="text-gray-500 text-sm">TBD</span>
      </div>
    );
  }
  
  const hasRecord = typeof team.wins === 'number' && typeof team.losses === 'number';

  return (
    <div 
      className={`team-slot h-14 px-3 py-2 flex items-center justify-between 
        rounded-md border transition-all duration-300 ease-in-out
        ${isWinner 
            ? 'bg-[#2A323C] border-blue-400 shadow-sm shadow-blue-500/20' 
            : matchStatus === 'completed' 
              ? 'bg-gray-800 border-gray-700 opacity-75' 
              : 'bg-gray-800 border-gray-700'
        }`}
    >
      <div className="flex items-center gap-2">
        {team.seed && (
          <span className="text-xs bg-gray-700 text-gray-300 w-5 h-5 flex items-center justify-center rounded-full">
            {team.seed}
          </span>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className={`font-medium ${isWinner ? 'text-white' : 'text-gray-300'}`}>
              {team.name}
            </span>
            {isWinner && <Trophy className="h-3 w-3 text-amber-400" />}
          </div>
          {hasRecord && (
            <span className="text-xs text-gray-400">
              {team.wins}-{team.losses}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;