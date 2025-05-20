import React from 'react';
import Team from './Team';
import { MatchProps } from './types';

const Match: React.FC<MatchProps> = ({ 
  match, 
  roundIndex, 
  matchIndex, 
  isHighlighted, 
  setHighlightedMatchId,
  onMatchClick
}) => {
  const { teams, winner, status = 'upcoming' } = match;

  const handleMouseEnter = () => {
    setHighlightedMatchId(match.id);
  };

  const handleMouseLeave = () => {
    setHighlightedMatchId(null);
  };

  const handleClick = () => {
    if (onMatchClick) {
      onMatchClick(match.id);
    }
  };

  return (
    <div 
      className={`
        match relative flex flex-col gap-1 p-2 rounded-lg transition-all duration-200 ease-in-out
        ${isHighlighted ? 'bg-gray-700 bg-opacity-50 shadow-md' : 'bg-transparent'}
        ${onMatchClick ? 'cursor-pointer' : ''}
      `}
      data-match-id={match.id}
      data-round-index={roundIndex}
      data-match-index={matchIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Team 
        team={teams[0]} 
        isWinner={!!winner && teams[0]?.id === winner}
        matchStatus={status}
      />
      <Team 
        team={teams[1]} 
        isWinner={!!winner && teams[1]?.id === winner}
        matchStatus={status}
      />
      {status === 'inProgress' && (
        <div className="absolute -right-1 -top-1">
          <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="inline-flex absolute h-3 w-3 rounded-full bg-red-500"></span>
        </div>
      )}
    </div>
  );
};

export default Match;