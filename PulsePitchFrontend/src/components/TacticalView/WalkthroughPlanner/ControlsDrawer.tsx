import { useState } from 'react';
import { PlayersInFormationDTO, PlaybackSpeed, StepConfig } from '../../../types';
import { PathEditor } from './PathEditor';
import { StepSelector } from './StepSelector';
import { WalkthroughControls } from './WalkthroughControls';

interface ControlsDrawerProps {
  // PathEditor props
  players: PlayersInFormationDTO[];
  selectedPlayerId: number | null;
  onClearPath: (playerId: number) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  selectedEntityType: 'player' | 'ball';
  onClearBallPath: () => void;
  // StepSelector props
  steps: StepConfig[];
  activeStep: number;
  onStepChange: (step: number) => void;
  onAddStep: () => void;
  // WalkthroughControls props
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

export const ControlsDrawer = ({
  // PathEditor
  players,
  selectedPlayerId,
  onClearPath,
  isEditMode,
  onToggleEditMode,
  selectedEntityType,
  onClearBallPath,
  // StepSelector
  steps,
  activeStep,
  onStepChange,
  onAddStep,
  // WalkthroughControls
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
}: ControlsDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full h-8 flex items-center justify-center
          bg-neutral-800 hover:bg-neutral-700
          text-white transition-colors
          ${isOpen ? 'rounded-t-lg' : 'rounded-t-lg'}
        `}
        title={isOpen ? 'Close controls' : 'Open controls'}
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
            d="M5 15l7-7 7 7"
          />
        </svg>
        <span className="ml-2 text-sm font-medium">Controls</span>
      </button>

      <div
        className={`
          bg-white border-t border-neutral-200 shadow-lg
          transition-all duration-300 overflow-hidden
          ${isOpen ? 'max-h-96' : 'max-h-0'}
        `}
      >
        <div className="p-3 space-y-3">
          <PathEditor
            players={players}
            selectedPlayerId={selectedPlayerId}
            onClearPath={onClearPath}
            isEditMode={isEditMode}
            onToggleEditMode={onToggleEditMode}
            selectedEntityType={selectedEntityType}
            onClearBallPath={onClearBallPath}
          />

          {isEditMode && (
            <StepSelector
              steps={steps}
              activeStep={activeStep}
              onStepChange={onStepChange}
              onAddStep={onAddStep}
            />
          )}

          <WalkthroughControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            speed={speed}
            loop={loop}
            onTogglePlay={onTogglePlay}
            onRestart={onRestart}
            onPrevFrame={onPrevFrame}
            onNextFrame={onNextFrame}
            onGoToEnd={onGoToEnd}
            onSetSpeed={onSetSpeed}
            onToggleLoop={onToggleLoop}
            canUndo={canUndo}
            canRedo={canRedo}
            onUndo={onUndo}
            onRedo={onRedo}
          />
        </div>
      </div>
    </div>
  );
};
