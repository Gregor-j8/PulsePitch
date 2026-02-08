import { useRef, useEffect, useState } from 'react';
import { PlayersInFormationDTO, WalkthroughTimeline as WalkthroughTimelineType } from '../../../types';
import { formatTime, timeToX, xToTime, getStepBoundaries } from '../../../utils/walkthroughHelpers';

interface WalkthroughTimelineProps {
  players: PlayersInFormationDTO[];
  timeline: WalkthroughTimelineType;
  currentTime: number;
  onSeek: (time: number) => void;
  onAddKeyframe?: (playerId: number, time: number) => void;
  embedded?: boolean;
}

export const WalkthroughTimeline = ({
  players,
  timeline,
  currentTime,
  onSeek,
  onAddKeyframe,
  embedded = false,
}: WalkthroughTimelineProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [timelineWidth, setTimelineWidth] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        setTimelineWidth(svgRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSeek = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = xToTime(x, timeline.duration, timelineWidth);
    const clampedTime = Math.max(0, Math.min(timeline.duration, time));
    onSeek(clampedTime);
  };

  const handleKeyframeClick = (playerId: number, time: number) => {
    if (onAddKeyframe) {
      onAddKeyframe(playerId, time);
    }
  };

  const timeMarkers: number[] = [];
  const markerInterval = 1000;
  for (let t = 0; t <= timeline.duration; t += markerInterval) {
    timeMarkers.push(t);
  }

  const laneHeight = 30;
  const headerHeight = 40;
  const totalHeight = headerHeight + players.length * laneHeight + 20;
  const playheadX = timeToX(currentTime, timeline.duration, timelineWidth);
  const stepBoundaries = getStepBoundaries(timeline.steps, timelineWidth);

  const getKeyframeGlobalTime = (localTime: number, step: number): number => {
    let globalTime = 0;
    for (const s of timeline.steps) {
      if (s.stepNumber === step) {
        return globalTime + localTime;
      }
      globalTime += s.duration;
    }
    return localTime;
  };

  const containerClass = embedded
    ? ''
    : 'bg-white border border-neutral-200 rounded-lg p-4 shadow-sm';

  return (
    <div className={containerClass}>
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-neutral-700">Timeline</h3>
        <span className="text-xs text-neutral-500">
          Duration: {formatTime(timeline.duration)}
        </span>
      </div>

      <svg
        ref={svgRef}
        width="100%"
        height={totalHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="cursor-pointer"
      >
        <rect width="100%" height={totalHeight} fill="#F9FAFB" />

        {stepBoundaries.length > 1 && (
          <g className="step-backgrounds">
            {stepBoundaries.map((boundary) => (
              <g key={boundary.step}>
                <rect
                  x={boundary.startX}
                  y={headerHeight}
                  width={boundary.endX - boundary.startX}
                  height={totalHeight - headerHeight}
                  fill={boundary.color}
                  opacity={0.5}
                />
                <line
                  x1={boundary.startX}
                  y1={0}
                  x2={boundary.startX}
                  y2={totalHeight}
                  stroke="#94A3B8"
                  strokeWidth={2}
                  strokeDasharray="4,2"
                />
                <text
                  x={boundary.startX + 5}
                  y={headerHeight - 5}
                  fontSize="10"
                  fontWeight="600"
                  fill="#475569"
                >
                  Step {boundary.step}
                </text>
              </g>
            ))}
          </g>
        )}

        <g className="time-markers">
          {timeMarkers.map((t, idx) => {
            const x = timeToX(t, timeline.duration, timelineWidth);
            return (
              <g key={t}>
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={totalHeight}
                  stroke="#E5E7EB"
                  strokeWidth={idx % 5 === 0 ? 2 : 1}
                />
                {idx % 5 === 0 && (
                  <text
                    x={x}
                    y={headerHeight - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#6B7280"
                  >
                    {formatTime(t)}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {players.slice(0, 11).map((player, idx) => {
          const y = headerHeight + idx * laneHeight;
          const playerWalkthrough = timeline.players[player.id];

          return (
            <g key={player.id} className="player-lane">
              <rect
                x={0}
                y={y}
                width="100%"
                height={laneHeight}
                fill={idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB'}
              />

              <text
                x={5}
                y={y + laneHeight / 2 + 4}
                fontSize="12"
                fill="#374151"
                fontWeight="500"
              >
                {player.name || `Player ${player.positionId}`}
              </text>

              {playerWalkthrough?.keyframes.map((kf, kfIdx) => {
                const globalTime = getKeyframeGlobalTime(kf.time, kf.step ?? 1);
                const kfX = timeToX(globalTime, timeline.duration, timelineWidth);
                return (
                  <circle
                    key={kfIdx}
                    cx={kfX}
                    cy={y + laneHeight / 2}
                    r={4}
                    fill={playerWalkthrough.color || player.color}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleKeyframeClick(player.id, globalTime);
                    }}
                    className="cursor-pointer hover:r-6"
                  />
                );
              })}
            </g>
          );
        })}

        <line
          x1={playheadX}
          y1={0}
          x2={playheadX}
          y2={totalHeight}
          stroke="#EF4444"
          strokeWidth={2}
          pointerEvents="none"
        />
        <polygon
          points={`${playheadX - 6},0 ${playheadX + 6},0 ${playheadX},10`}
          fill="#EF4444"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
};
