import { useCallback, useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { Field } from '../Field';
import { Button } from '../../ui/Button';
import { WalkthroughControls } from './WalkthroughControls';
import { WalkthroughTimeline } from './WalkthroughTimeline';
import { PathOverlay } from './PathOverlay';
import { PathEditor } from './PathEditor';
import { AnimatedPlayer } from './AnimatedPlayer';
import { AnimatedBall } from './AnimatedBall';
import { PlayersInFormationDTO, WalkthroughPlannerDTO, PlaybackSpeed, WalkthroughTimeline as WalkthroughTimelineType } from '../../../types';
import { getInterpolatedPosition, generateEmptyTimeline } from '../../../utils/walkthroughHelpers';
import { useGetWalkthroughsByFormationId, useCreateWalkthrough, useUpdateWalkthrough } from '../../../hooks/useWalkthroughPlanner';

interface WalkthroughPlannerCanvasProps {
  formationId: number;
  players: PlayersInFormationDTO[];
  onBack: () => void;
}

const REFERENCE_WIDTH = 1000;
const REFERENCE_HEIGHT = 700;

export const WalkthroughPlannerCanvas = ({
  formationId,
  players,
  onBack,
}: WalkthroughPlannerCanvasProps) => {
  const [selectedWalkthroughId, setSelectedWalkthroughId] = useState<number | null>(null);
  const [timeline, setTimeline] = useImmer<WalkthroughTimelineType>(() => generateEmptyTimeline(players.map(p => p.id)));

  const [playbackState, setPlaybackState] = useImmer({
    currentTime: 0,
    isPlaying: false,
    speed: 1 as PlaybackSpeed,
    loop: false,
  });

  const [showPaths, setShowPaths] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);

  useGetWalkthroughsByFormationId(formationId);
  const createWalkthrough = useCreateWalkthrough();
  const updateWalkthrough = useUpdateWalkthrough();

  const handleTogglePlay = useCallback(() => {
    setPlaybackState(draft => {
      draft.isPlaying = !draft.isPlaying;
      if (draft.currentTime >= timeline.duration) {
        draft.currentTime = 0;
      }
    });
  }, [setPlaybackState, timeline.duration]);

  const handleRestart = useCallback(() => {
    setPlaybackState(draft => {
      draft.currentTime = 0;
      draft.isPlaying = false;
    });
  }, [setPlaybackState]);

  const handlePrevFrame = useCallback(() => {
    setPlaybackState(draft => {
      draft.currentTime = Math.max(0, draft.currentTime - 100);
    });
  }, [setPlaybackState]);

  const handleNextFrame = useCallback(() => {
    setPlaybackState(draft => {
      draft.currentTime = Math.min(timeline.duration, draft.currentTime + 100);
    });
  }, [setPlaybackState, timeline.duration]);

  const handleGoToEnd = useCallback(() => {
    setPlaybackState(draft => {
      draft.currentTime = timeline.duration;
      draft.isPlaying = false;
    });
  }, [setPlaybackState, timeline.duration]);

  const handleSetSpeed = useCallback((speed: PlaybackSpeed) => {
    setPlaybackState(draft => {
      draft.speed = speed;
    });
  }, [setPlaybackState]);

  const handleToggleLoop = useCallback(() => {
    setPlaybackState(draft => {
      draft.loop = !draft.loop;
    });
  }, [setPlaybackState]);

  const handleSeek = useCallback((time: number) => {
    setPlaybackState(draft => {
      draft.currentTime = time;
    });
  }, [setPlaybackState]);

  const handleSaveWalkthrough = useCallback(async () => {
    const walkthroughData: Partial<WalkthroughPlannerDTO> = {
      formationId,
      name: `Walkthrough ${new Date().toLocaleDateString()}`,
      description: 'New tactical walkthrough',
      duration: timeline.duration,
      timeline: {
        duration: timeline.duration,
        players: timeline.players,
        ball: timeline.ball,
        events: timeline.events,
      },
    };

    try {
      if (selectedWalkthroughId) {
        await updateWalkthrough.mutateAsync({
          id: selectedWalkthroughId,
          data: walkthroughData,
        });
      } else {
        await createWalkthrough.mutateAsync(walkthroughData);
      }
    } catch (error) {
      console.error('Failed to save walkthrough:', error);
    }
  }, [formationId, timeline, selectedWalkthroughId, createWalkthrough, updateWalkthrough]);

  const handleFieldClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditMode || !selectedPlayerId || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const refX = (x / containerSize.width) * REFERENCE_WIDTH;
    const refY = (y / containerSize.height) * REFERENCE_HEIGHT;

    setTimeline(draft => {
      if (!draft.players[selectedPlayerId]) {
        const player = players.find(p => p.id === selectedPlayerId);
        draft.players[selectedPlayerId] = {
          playerId: selectedPlayerId,
          keyframes: [],
          pathType: 'straight',
          color: player?.color || '#3B82F6',
        };
      }

      draft.players[selectedPlayerId].keyframes.push({
        time: playbackState.currentTime,
        x: refX,
        y: refY,
      });

      draft.players[selectedPlayerId].keyframes.sort((a, b) => a.time - b.time);
    });
  }, [isEditMode, selectedPlayerId, containerSize, REFERENCE_WIDTH, REFERENCE_HEIGHT, playbackState.currentTime, setTimeline, players]);

  const handleClearPath = useCallback((playerId: number) => {
    setTimeline(draft => {
      if (draft.players[playerId]) {
        draft.players[playerId].keyframes = [];
      }
    });
  }, [setTimeline]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      }
      else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRestart();
      }

      else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        setIsEditMode(prev => !prev);
      }

      else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setShowPaths(prev => !prev);
      }

      else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevFrame();
      }
      else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextFrame();
      }
      else if (e.key === '1') {
        e.preventDefault();
        handleSetSpeed(0.5);
      }
      else if (e.key === '2') {
        e.preventDefault();
        handleSetSpeed(1);
      }
      else if (e.key === '3') {
        e.preventDefault();
        handleSetSpeed(2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTogglePlay, handleRestart, handlePrevFrame, handleNextFrame, handleSetSpeed]);

  useEffect(() => {
    if (!playbackState.isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastTimestampRef.current = 0;
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimestampRef.current) * playbackState.speed;
      lastTimestampRef.current = timestamp;

      setPlaybackState(draft => {
        draft.currentTime += deltaTime;

        if (draft.currentTime >= timeline.duration) {
          if (draft.loop) {
            draft.currentTime = 0;
          } else {
            draft.currentTime = timeline.duration;
            draft.isPlaying = false;
          }
        }
      });

      if (playbackState.isPlaying) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [playbackState.isPlaying, playbackState.speed, timeline.duration, setPlaybackState, playbackState.loop]);

  const getPlayerPosition = (playerId: number) => {
    const playerWalkthrough = timeline.players[playerId];
    if (!playerWalkthrough || playerWalkthrough.keyframes.length === 0) {
      const player = players.find(p => p.id === playerId);
      return player ? { x: player.x, y: player.y } : { x: 0, y: 0 };
    }
    return getInterpolatedPosition(playerWalkthrough.keyframes, playbackState.currentTime);
  };

  const getBallPosition = () => {
    if (timeline.ball.keyframes.length === 0) {
      return { x: 500, y: 350 };
    }
    return getInterpolatedPosition(timeline.ball.keyframes, playbackState.currentTime);
  };

  const playerSize = containerSize.width > 768 ? 50 : 35;
  const ballSize = containerSize.width > 768 ? 30 : 20;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          ← Back to Formations
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPaths(!showPaths)}>
            {showPaths ? 'Hide' : 'Show'} Paths
          </Button>
          <Button variant="primary" onClick={handleSaveWalkthrough}>
            Save Walkthrough
          </Button>
        </div>
      </div>

      <PathEditor
        players={players}
        selectedPlayerId={selectedPlayerId}
        onSelectPlayer={setSelectedPlayerId}
        onAddKeyframe={() => {}}
        onClearPath={handleClearPath}
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
      />

      <div
        ref={containerRef}
        onClick={handleFieldClick}
        className={`relative bg-neutral-100 rounded-lg overflow-hidden shadow-lg ${isEditMode ? 'cursor-crosshair' : ''}`}
        style={{
          width: '100%',
          maxWidth: '1200px',
          aspectRatio: `${REFERENCE_WIDTH} / ${REFERENCE_HEIGHT}`,
          margin: '0 auto',
        }}
      >
        <Field width={containerSize.width} height={containerSize.height} />

        {showPaths && (
          <PathOverlay
            timeline={timeline}
            width={containerSize.width}
            height={containerSize.height}
            referenceWidth={REFERENCE_WIDTH}
            referenceHeight={REFERENCE_HEIGHT}
            showPaths={showPaths}
          />
        )}

        {players.map(player => {
          const position = getPlayerPosition(player.id);
          return (
            <AnimatedPlayer
              key={player.id}
              player={player}
              position={position}
              referenceWidth={REFERENCE_WIDTH}
              referenceHeight={REFERENCE_HEIGHT}
              containerWidth={containerSize.width}
              containerHeight={containerSize.height}
              playerSize={playerSize}
              isPlaying={playbackState.isPlaying}
            />
          );
        })}

        <AnimatedBall
          position={getBallPosition()}
          referenceWidth={REFERENCE_WIDTH}
          referenceHeight={REFERENCE_HEIGHT}
          containerWidth={containerSize.width}
          containerHeight={containerSize.height}
          ballSize={ballSize}
          isPlaying={playbackState.isPlaying}
        />
      </div>

      <WalkthroughControls
        isPlaying={playbackState.isPlaying}
        currentTime={playbackState.currentTime}
        duration={timeline.duration}
        speed={playbackState.speed}
        loop={playbackState.loop}
        onTogglePlay={handleTogglePlay}
        onRestart={handleRestart}
        onPrevFrame={handlePrevFrame}
        onNextFrame={handleNextFrame}
        onGoToEnd={handleGoToEnd}
        onSetSpeed={handleSetSpeed}
        onToggleLoop={handleToggleLoop}
      />

      <WalkthroughTimeline
        players={players}
        timeline={timeline}
        currentTime={playbackState.currentTime}
        onSeek={handleSeek}
      />
    </div>
  );
};
