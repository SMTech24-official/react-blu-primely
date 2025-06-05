import React from 'react';
import { TeamDisplayProps } from '../types/tournament';
import { User } from 'lucide-react';

const TeamDisplay: React.FC<TeamDisplayProps> = ({ team, isWinner }) => {
  return (
    <div 
      className={`
        flex items-center gap-2 p-1.5 rounded-md transition-colors 
        ${isWinner ? 'bg-amber-900/50' : 'hover:bg-gray-700'}
      `}
    >
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-full
        ${isWinner ? 'bg-amber-800 text-amber-200' : 'bg-gray-700 text-gray-300'}
      `}>
        {team.image ? (
          <img
            src={team.image}
            alt={team.name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <User className="w-4 h-4" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`
            font-medium truncate text-sm
            ${isWinner ? 'text-amber-200' : 'text-gray-200'}
          `}>
            {team.name}
          </p>
          {isWinner && (
            <span className="bg-amber-900 text-amber-200 px-1.5 py-0.5 rounded text-xs font-medium">
              Winner
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 truncate">
          {team.fullName}
        </p>
      </div>
    </div>
  );
};

export default TeamDisplay;