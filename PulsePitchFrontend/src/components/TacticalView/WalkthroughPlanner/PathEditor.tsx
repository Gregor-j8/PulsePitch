import { PlayersInFormationDTO } from '../../../types';
import { Button } from '../../ui/Button';

interface PathEditorProps {
  players: PlayersInFormationDTO[];
  selectedPlayerId: number | null;
  onSelectPlayer: (playerId: number | null) => void;
  onClearPath: (playerId: number) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  selectedEntityType: 'player' | 'ball';
  onSelectEntityType: (type: 'player' | 'ball') => void;
  onClearBallPath: () => void;
}

export const PathEditor = ({
  players,
  selectedPlayerId,
  onSelectPlayer,
  onClearPath,
  isEditMode,
  onToggleEditMode,
  selectedEntityType,
  onSelectEntityType,
  onClearBallPath,
}: PathEditorProps) => {
  const selectedPlayer = players.find(p => p.id === selectedPlayerId);

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-neutral-700">Path Editor</h3>
          <Button
            variant={isEditMode ? 'primary' : 'outline'}
            size="sm"
            onClick={onToggleEditMode}
          >
            {isEditMode ? 'Exit Edit Mode' : 'Edit Paths'}
          </Button>
        </div>

        {isEditMode && (
          <>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">
                Select Player or Ball
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {players.slice(0, 11).map(player => (
                  <button
                    key={player.id}
                    onClick={() => onSelectPlayer(player.id === selectedPlayerId ? null : player.id)}
                    className={`px-3 py-2 text-xs rounded border transition-colors ${
                      player.id === selectedPlayerId && selectedEntityType === 'player'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'
                    }`}
                    style={{
                      borderLeftWidth: '4px',
                      borderLeftColor: player.color,
                    }}
                  >
                    {player.name || `P${player.positionId}`}
                  </button>
                ))}
                <button
                  onClick={() => onSelectEntityType('ball')}
                  className={`px-3 py-2 text-xs rounded border transition-colors ${
                    selectedEntityType === 'ball'
                      ? 'bg-neutral-800 border-neutral-900 text-white'
                      : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'
                  }`}
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: '#FFFFFF',
                  }}
                >
                  Ball
                </button>
              </div>
            </div>

            {selectedEntityType === 'ball' ? (
              <div className="bg-neutral-100 border border-neutral-300 rounded p-3">
                <p className="text-sm text-neutral-800">
                  <strong>Ball</strong> selected.
                  Click on the field to add keyframes to the ball path.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={onClearBallPath}
                  className="mt-2"
                >
                  Clear Ball Path
                </Button>
              </div>
            ) : selectedPlayer ? (
              <div className="bg-primary-50 border border-primary-200 rounded p-3">
                <p className="text-sm text-primary-800">
                  <strong>{selectedPlayer.name || `Player ${selectedPlayer.positionId}`}</strong> selected.
                  Click on the field to add keyframes to their path.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (selectedPlayer) {
                      onClearPath(selectedPlayer.id);
                    }
                  }}
                  className="mt-2"
                >
                  Clear Path
                </Button>
              </div>
            ) : (
              <div className="bg-neutral-50 border border-neutral-200 rounded p-3">
                <p className="text-sm text-neutral-600">
                  Select a player or ball above to start editing their path.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
