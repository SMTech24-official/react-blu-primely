import React from 'react';
import Match from './Match';
import { RoundProps } from './types';

const Round: React.FC<RoundProps> = ({
  round,
  roundIndex,
  highlightedMatchId,
  setHighlightedMatchId,
  onMatchClick
}) => {
  // Calculate spacing to create vertical distribution
  const spacing = () => {
    // As rounds progress, we need more space between matches
    const baseSpacing = 'gap-4';
    
    if (roundIndex === 0) return baseSpacing;
    if (roundIndex === 1) return 'gap-16';
    if (roundIndex === 2) return 'gap-32';
    if (roundIndex === 3) return 'gap-64';
    return 'gap-96'; // For very large brackets
  };

  return (
    <div 
      className={`round-column flex flex-col ${spacing()} px-4 justify-center`}
      data-round-id={round.id}
      data-round-index={roundIndex}
    >
      <div className="round-title text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-200">{round.name}</h3>
      </div>
      <div className={`matches flex flex-col ${spacing()}`}>
        {round.matches.map((match, matchIndex) => (
          <Match
            key={match.id}
            match={match}
            roundIndex={roundIndex}
            matchIndex={matchIndex}
            isHighlighted={highlightedMatchId === match.id}
            setHighlightedMatchId={setHighlightedMatchId}
            onMatchClick={onMatchClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Round;