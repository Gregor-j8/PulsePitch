import { useState } from 'react';
import { PlayersInFormationDTO } from '../../../types';

interface EntitySelectorSidebarProps {
  players: PlayersInFormationDTO[];
  selectedPlayerId: number | null;
  onSelectPlayer: (playerId: number | null) => void;
  selectedEntityType: 'player' | 'ball';
  onSelectEntityType: (type: 'player' | 'ball') => void;
  onEnableEditMode: () => void;
}

export const EntitySelectorSidebar = ({
  players,
  selectedPlayerId,
  onSelectPlayer,
  selectedEntityType,
  onSelectEntityType,
  onEnableEditMode,
}: EntitySelectorSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const playersByTeam = players.slice(0, 22).reduce((acc, player) => {
    const color = player.color || '#3B82F6';
    if (!acc[color]) {
      acc[color] = [];
    }
    acc[color].push(player);
    return acc;
  }, {} as Record<string, PlayersInFormationDTO[]>);

  const teamColors = Object.keys(playersByTeam);

  const handleToggle = () => {
    if (!isOpen) {
      onEnableEditMode();
    }
    setIsOpen(!isOpen);
  };

  const handlePlayerClick = (playerId: number) => {
    if (playerId === selectedPlayerId) {
      onSelectPlayer(null);
    } else {
      onSelectPlayer(playerId);
      onSelectEntityType('player');
      setIsOpen(false);
    }
  };

  const handleBallClick = () => {
    onSelectPlayer(null);
    onSelectEntityType('ball');
    setIsOpen(false);
  };

  return (
    <div className="flex" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={handleToggle}
        className={`
          h-full w-8 flex items-center justify-center
          bg-neutral-800 hover:bg-neutral-700
          text-white transition-colors
          ${isOpen ? 'rounded-l-lg' : 'rounded-lg'}
        `}
        title={isOpen ? 'Close player panel' : 'Open player panel'}
      >
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        className={`
          bg-white border-r border-neutral-200 shadow-lg
          transition-all duration-300 overflow-hidden
          ${isOpen ? 'w-48' : 'w-0'}
        `}
      >
        <div className="w-48 h-full overflow-y-auto p-2">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2 px-1">
            Select Entity
          </div>

          {teamColors.map((color, teamIndex) => (
            <div key={color} className={teamIndex > 0 ? 'mt-3' : ''}>
              <div className="flex items-center gap-1 mb-1 px-1">
                <div
                  className="w-3 h-3 rounded-full border border-neutral-300"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-medium text-neutral-600">
                  Team {teamIndex + 1}
                </span>
              </div>
              <div className="space-y-1">
                {(playersByTeam[color] ?? []).map(player => {
                  const isSelected = player.id === selectedPlayerId && selectedEntityType === 'player';
                  return (
                    <button
                      key={player.id}
                      onClick={() => handlePlayerClick(player.id)}
                      className={`
                        w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-xs
                        transition-colors
                        ${isSelected
                          ? 'bg-primary-100 border border-primary-400 text-primary-800'
                          : 'bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-neutral-700'
                        }
                      `}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                        style={{ backgroundColor: color }}
                      >
                        {player.positionId}
                      </div>
                      <span className="truncate">
                        {player.name || `Player ${player.positionId}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-3 pt-2 border-t border-neutral-200">
            <button
              onClick={handleBallClick}
              className={`
                w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-xs
                transition-colors
                ${selectedEntityType === 'ball'
                  ? 'bg-neutral-800 border border-neutral-900 text-white'
                  : 'bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-neutral-700'
                }
              `}
            >
              <div className="w-5 h-5 rounded-full bg-white border-2 border-neutral-400 flex-shrink-0" />
              <span>Ball</span>
            </button>
          </div>

          {(selectedPlayerId || selectedEntityType === 'ball') && (
            <div className="mt-3 pt-2 border-t border-neutral-200">
              <div className="text-xs text-neutral-500 px-1">
                {selectedEntityType === 'ball' ? (
                  <span className="text-neutral-700 font-medium">Ball selected</span>
                ) : (
                  <span className="text-primary-700 font-medium">
                    {players.find(p => p.id === selectedPlayerId)?.name || 'Player'} selected
                  </span>
                )}
              </div>
              <div className="text-[10px] text-neutral-400 px-1 mt-0.5">
                Click on field to add keyframe
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
