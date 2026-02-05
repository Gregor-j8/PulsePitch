import { PlaybackSpeed } from '../../../types';
import { formatTime } from '../../../utils/walkthroughHelpers';
import { Button } from '../../ui/Button';

interface WalkthroughControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  speed: PlaybackSpeed;
  loop: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  onPrevFrame: () => void;
  onNextFrame: () => void;
  onGoToEnd: () => void;
  onSetSpeed: (speed: PlaybackSpeed) => void;
  onToggleLoop: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const WalkthroughControls = ({
  isPlaying,
  currentTime,
  duration,
  speed,
  loop,
  onTogglePlay,
  onRestart,
  onPrevFrame,
  onNextFrame,
  onGoToEnd,
  onSetSpeed,
  onToggleLoop,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: WalkthroughControlsProps) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRestart}
            title="Restart"
          >
            ⏮
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevFrame}
            title="Previous Frame"
          >
            ⏪
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶️'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextFrame}
            title="Next Frame"
          >
            ⏩
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onGoToEnd}
            title="Go to End"
          >
            ⏭
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600">Speed:</span>
          <div className="flex gap-1">
            <Button
              variant={speed === 0.5 ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onSetSpeed(0.5)}
            >
              0.5x
            </Button>
            <Button
              variant={speed === 1 ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onSetSpeed(1)}
            >
              1x
            </Button>
            <Button
              variant={speed === 2 ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onSetSpeed(2)}
            >
              2x
            </Button>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={loop}
            onChange={onToggleLoop}
            className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-700">Loop</span>
        </label>

        <div className="flex items-center gap-2 border-l border-neutral-200 pl-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            ↶
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            ↷
          </Button>
        </div>

        <div className="text-sm font-mono text-neutral-700">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};
