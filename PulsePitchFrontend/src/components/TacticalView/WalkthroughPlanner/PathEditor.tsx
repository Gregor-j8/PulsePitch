import { PlayersInFormationDTO } from '../../../types';
import { Button } from '../../ui/Button';

interface PathEditorProps {
  players: PlayersInFormationDTO[];
  selectedPlayerId: number | null;
  onClearPath: (playerId: number) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  selectedEntityType: 'player' | 'ball';
  onClearBallPath: () => void;
}

export const PathEditor = ({
  players,
  selectedPlayerId,
  onClearPath,
  isEditMode,
  onToggleEditMode,
  selectedEntityType,
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
          <div className="flex flex-wrap items-center gap-3">
            {selectedEntityType === 'ball' ? (
              <div className="flex items-center gap-3 bg-neutral-100 border border-neutral-300 rounded px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-neutral-400" />
                  <span className="text-sm text-neutral-800 font-medium">Ball</span>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={onClearBallPath}
                >
                  Clear Path
                </Button>
              </div>
            ) : selectedPlayer ? (
              <div className="flex items-center gap-3 bg-primary-50 border border-primary-200 rounded px-3 py-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedPlayer.color }}
                  />
                  <span className="text-sm text-primary-800 font-medium">
                    {selectedPlayer.name || `Player ${selectedPlayer.positionId}`}
                  </span>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onClearPath(selectedPlayer.id)}
                >
                  Clear Path
                </Button>
              </div>
            ) : (
              <div className="bg-neutral-50 border border-neutral-200 rounded px-3 py-2">
                <p className="text-sm text-neutral-600">
                  Use the panel on the left to select a player or ball.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
