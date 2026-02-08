import { useState } from 'react';
import { PlayersInFormationDTO, WalkthroughTimeline as WalkthroughTimelineType } from '../../../types';
import { WalkthroughTimeline } from './WalkthroughTimeline';

interface TimelineDrawerProps {
  players: PlayersInFormationDTO[];
  timeline: WalkthroughTimelineType;
  currentTime: number;
  onSeek: (time: number) => void;
  onAddKeyframe?: (playerId: number, time: number) => void;
}

export const TimelineDrawer = ({
  players,
  timeline,
  currentTime,
  onSeek,
  onAddKeyframe,
}: TimelineDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex" onClick={(e) => e.stopPropagation()}>
      <div
        className={`
          bg-white border-l border-neutral-200 shadow-lg
          transition-all duration-300 overflow-hidden
          ${isOpen ? 'w-64' : 'w-0'}
        `}
      >
        <div className="w-64 h-full overflow-y-auto p-2">
          <WalkthroughTimeline
            players={players}
            timeline={timeline}
            currentTime={currentTime}
            onSeek={onSeek}
            onAddKeyframe={onAddKeyframe}
            embedded
          />
        </div>
      </div>

      <button
        onClick={handleToggle}
        className={`
          h-full w-8 flex items-center justify-center
          bg-neutral-800 hover:bg-neutral-700
          text-white transition-colors
          ${isOpen ? 'rounded-r-lg' : 'rounded-lg'}
        `}
        title={isOpen ? 'Close timeline' : 'Open timeline'}
      >
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? '' : 'rotate-180'}`}
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
    </div>
  );
};
