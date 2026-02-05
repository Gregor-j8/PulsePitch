import { motion } from 'framer-motion';
import { PlayersInFormationDTO, InterpolatedPosition } from '../../../types';

interface AnimatedPlayerProps {
  player: PlayersInFormationDTO;
  position: InterpolatedPosition;
  referenceWidth: number;
  referenceHeight: number;
  containerWidth: number;
  containerHeight: number;
  playerSize: number;
  isPlaying: boolean;
  action?: string;
}

export const AnimatedPlayer = ({
  player,
  position,
  referenceWidth,
  referenceHeight,
  containerWidth,
  containerHeight,
  playerSize,
  isPlaying,
  action,
}: AnimatedPlayerProps) => {
  const scaleX = (x: number) => (x / referenceWidth) * containerWidth;
  const scaleY = (y: number) => (y / referenceHeight) * containerHeight;

  const scaledX = scaleX(position.x);
  const scaledY = scaleY(position.y);

  const jerseyNumber = player.positionId?.toString() || '1';
  const isGoalkeeper = player.role?.toLowerCase().includes('gk') ||
                       player.role?.toLowerCase().includes('goalkeeper') ||
                       player.role?.toLowerCase().includes('keeper');

  return (
    <motion.div
      animate={{
        left: scaledX,
        top: scaledY,
      }}
      transition={{
        duration: isPlaying ? 0.05 : 0,
        ease: 'linear',
      }}
      title={`${player.name} - ${player.role}`}
      style={{
        position: 'absolute',
        width: playerSize,
        height: playerSize,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
      className="select-none"
    >
      <svg
        width={playerSize}
        height={playerSize}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        <defs>
          <filter id={`shadow-animated-${player.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id={`jersey-gradient-animated-${player.id}`} cx="40%" cy="40%">
            <stop offset="0%" stopColor={player.color} stopOpacity="1" />
            <stop offset="100%" stopColor={player.color} stopOpacity="0.7" />
          </radialGradient>

          {isGoalkeeper && (
            <pattern id={`gk-pattern-animated-${player.id}`} patternUnits="userSpaceOnUse" width="8" height="8">
              <rect width="8" height="8" fill={player.color} />
              <circle cx="4" cy="4" r="1.5" fill="rgba(255,255,255,0.3)" />
            </pattern>
          )}
        </defs>

        <circle
          cx="50"
          cy="50"
          r="45"
          fill={isGoalkeeper ? `url(#gk-pattern-animated-${player.id})` : `url(#jersey-gradient-animated-${player.id})`}
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="2"
          filter={`url(#shadow-animated-${player.id})`}
        />

        <path
          d="M 45 10 L 50 20 L 55 10"
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="2"
        />

        <text
          x="50"
          y="60"
          textAnchor="middle"
          fontSize="32"
          fontWeight="bold"
          fill="white"
          stroke="rgba(0, 0, 0, 0.3)"
          strokeWidth="1"
        >
          {jerseyNumber}
        </text>

        {action && isPlaying && (
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            opacity="0.8"
          >
            <animate
              attributeName="r"
              from="45"
              to="55"
              dur="0.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.8"
              to="0"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>

      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-neutral-700 whitespace-nowrap bg-white/80 px-1 rounded">
        {player.name || `P${jerseyNumber}`}
      </div>
    </motion.div>
  );
};
