import { useCallback, useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { Draft } from 'immer';
import { Field } from '../Field';
import { Button } from '../../ui/Button';
import { TimelineDrawer } from './TimelineDrawer';
import { PathOverlay } from './PathOverlay';
import { EntitySelectorSidebar } from './EntitySelectorSidebar';
import { AnimatedPlayer } from './AnimatedPlayer';
import { AnimatedBall } from './AnimatedBall';
import { ControlsDrawer } from './ControlsDrawer';
import { PlayersInFormationDTO, WalkthroughPlannerDTO, PlaybackSpeed, WalkthroughTimeline as WalkthroughTimelineType } from '../../../types';
import { getInterpolatedPositionForStep, getStepAndLocalTime, generateEmptyTimeline } from '../../../utils/walkthroughHelpers';
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
  const [selectedWalkthroughId, _setSelectedWalkthroughId] = useState<number | null>(null);
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
  const [selectedEntityType, setSelectedEntityType] = useState<'player' | 'ball'>('player');
  const [activeStep, setActiveStep] = useState(1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);

  const [history, setHistory] = useState<WalkthroughTimelineType[]>(() => [generateEmptyTimeline(players.map(p => p.id))]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const pendingHistorySave = useRef(false);

  useGetWalkthroughsByFormationId(formationId);
  const createWalkthrough = useCreateWalkthrough();
  const updateWalkthrough = useUpdateWalkthrough();

  const mutateTimeline = useCallback((updater: (draft: Draft<WalkthroughTimelineType>) => void) => {
    setTimeline(updater);
    pendingHistorySave.current = true;
  }, [setTimeline]);

  useEffect(() => {
    if (!pendingHistorySave.current) return;
    pendingHistorySave.current = false;

    const snapshot = JSON.parse(JSON.stringify(timeline)) as WalkthroughTimelineType;
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(snapshot);
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [timeline, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    const snapshot = JSON.parse(JSON.stringify(history[newIndex])) as WalkthroughTimelineType;
    setTimeline(() => snapshot);
  }, [historyIndex, history, setTimeline]);

  const handleRedo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    const snapshot = JSON.parse(JSON.stringify(history[newIndex])) as WalkthroughTimelineType;
    setTimeline(() => snapshot);
  }, [historyIndex, history, setTimeline]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

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
    if (!isEditMode || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const refX = (x / containerSize.width) * REFERENCE_WIDTH;
    const refY = (y / containerSize.height) * REFERENCE_HEIGHT;

    const { currentStep, localTime } = getStepAndLocalTime(playbackState.currentTime, timeline.steps);
    const keyframeTime = currentStep === activeStep ? localTime : 0;

    if (selectedEntityType === 'ball') {
      mutateTimeline(draft => {
        const stepKeyframes = draft.ball.keyframes.filter(kf => (kf.step ?? 1) === activeStep);
        if (stepKeyframes.length === 0 && keyframeTime > 0) {
          draft.ball.keyframes.push({ time: 0, x: 500, y: 350, step: activeStep });
        }
        draft.ball.keyframes.push({
          time: keyframeTime,
          x: refX,
          y: refY,
          step: activeStep,
        });
        draft.ball.keyframes.sort((a, b) => (a.step ?? 1) - (b.step ?? 1) || a.time - b.time);
      });
    } else {
      if (!selectedPlayerId) return;

      mutateTimeline(draft => {
        if (!draft.players[selectedPlayerId]) {
          const player = players.find(p => p.id === selectedPlayerId);
          draft.players[selectedPlayerId] = {
            playerId: selectedPlayerId,
            keyframes: [],
            pathType: 'straight',
            color: player?.color || '#3B82F6',
          };
        }

        const pw = draft.players[selectedPlayerId];
        const stepKeyframes = pw.keyframes.filter(kf => (kf.step ?? 1) === activeStep);
        if (stepKeyframes.length === 0 && keyframeTime > 0) {
          const player = players.find(p => p.id === selectedPlayerId);
          if (player) {
            pw.keyframes.push({ time: 0, x: player.x, y: player.y, step: activeStep });
          }
        }

        pw.keyframes.push({
          time: keyframeTime,
          x: refX,
          y: refY,
          step: activeStep,
        });

        pw.keyframes.sort((a, b) => (a.step ?? 1) - (b.step ?? 1) || a.time - b.time);
      });
    }

    setPlaybackState(draft => {
      draft.currentTime = Math.min(playbackState.currentTime + 1500, timeline.duration);
    });
  }, [isEditMode, selectedEntityType, selectedPlayerId, containerSize, playbackState.currentTime, mutateTimeline, players, setPlaybackState, timeline.duration, timeline.steps, activeStep]);

  const handleKeyframeDrag = useCallback((playerId: number, keyframeIndex: number, newX: number, newY: number) => {
    setTimeline(draft => {
      const pw = draft.players[playerId];
      if (pw && pw.keyframes[keyframeIndex]) {
        pw.keyframes[keyframeIndex].x = newX;
        pw.keyframes[keyframeIndex].y = newY;
      }
    });
  }, [setTimeline]);

  const handleKeyframeDragEnd = useCallback(() => {
    pendingHistorySave.current = true;
    setTimeline(draft => draft);
  }, [setTimeline]);

  const handleClearPath = useCallback((playerId: number) => {
    mutateTimeline(draft => {
      if (draft.players[playerId]) {
        draft.players[playerId].keyframes = [];
      }
    });
  }, [mutateTimeline]);

  const handleClearBallPath = useCallback(() => {
    mutateTimeline(draft => {
      draft.ball.keyframes = [];
    });
  }, [mutateTimeline]);

  const handleSelectEntityType = useCallback((type: 'player' | 'ball') => {
    setSelectedEntityType(type);
    if (type === 'ball') {
      setSelectedPlayerId(null);
    }
  }, []);

  const handleAddStep = useCallback(() => {
    mutateTimeline(draft => {
      const newStepNumber = draft.steps.length + 1;
      const newStepDuration = 3000;
      draft.steps.push({ stepNumber: newStepNumber, duration: newStepDuration });
      draft.duration = draft.steps.reduce((sum, s) => sum + s.duration, 0);
    });
    setActiveStep(timeline.steps.length + 1);
  }, [mutateTimeline, timeline.steps.length]);

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
      else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
      else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
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
  }, [handleTogglePlay, handleRestart, handlePrevFrame, handleNextFrame, handleSetSpeed, handleUndo, handleRedo]);

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
    const player = players.find(p => p.id === playerId);
    const fallback = player ? { x: player.x, y: player.y } : { x: 0, y: 0 };

    if (!playerWalkthrough || playerWalkthrough.keyframes.length === 0) {
      return fallback;
    }

    const { currentStep, localTime } = getStepAndLocalTime(playbackState.currentTime, timeline.steps);
    return getInterpolatedPositionForStep(playerWalkthrough.keyframes, currentStep, localTime, fallback);
  };

  const getBallPosition = () => {
    const fallback = { x: 500, y: 350 };

    if (timeline.ball.keyframes.length === 0) {
      return fallback;
    }

    const { currentStep, localTime } = getStepAndLocalTime(playbackState.currentTime, timeline.steps);
    return getInterpolatedPositionForStep(timeline.ball.keyframes, currentStep, localTime, fallback);
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

      <div className="flex justify-center gap-2">
        <EntitySelectorSidebar
          players={players}
          selectedPlayerId={selectedPlayerId}
          onSelectPlayer={(id) => {
            setSelectedPlayerId(id);
            if (id !== null) setSelectedEntityType('player');
          }}
          selectedEntityType={selectedEntityType}
          onSelectEntityType={handleSelectEntityType}
          onEnableEditMode={() => setIsEditMode(true)}
        />

        <div
          ref={containerRef}
          onClick={handleFieldClick}
          className={`relative bg-neutral-100 rounded-lg overflow-hidden shadow-lg flex-1 ${isEditMode ? 'cursor-crosshair' : ''}`}
          style={{
            maxWidth: '1200px',
            aspectRatio: `${REFERENCE_WIDTH} / ${REFERENCE_HEIGHT}`,
          }}
        >
          <Field isMobile={containerSize.width < 768} />

          {showPaths && (
          <PathOverlay
            timeline={timeline}
            width={containerSize.width}
            height={containerSize.height}
            referenceWidth={REFERENCE_WIDTH}
            referenceHeight={REFERENCE_HEIGHT}
            showPaths={showPaths}
            onKeyframeDrag={handleKeyframeDrag}
            onKeyframeDragEnd={handleKeyframeDragEnd}
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

        <ControlsDrawer
          players={players}
          selectedPlayerId={selectedPlayerId}
          onClearPath={handleClearPath}
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode(!isEditMode)}
          selectedEntityType={selectedEntityType}
          onClearBallPath={handleClearBallPath}
          steps={timeline.steps}
          activeStep={activeStep}
          onStepChange={setActiveStep}
          onAddStep={handleAddStep}
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
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
        </div>

        <TimelineDrawer
          players={players}
          timeline={timeline}
          currentTime={playbackState.currentTime}
          onSeek={handleSeek}
        />
      </div>
    </div>
  );
};
