import { motion } from 'framer-motion';
import { InterpolatedPosition, BallKeyframe } from '../../../types';

interface AnimatedBallProps {
  position: InterpolatedPosition;
  referenceWidth: number;
  referenceHeight: number;
  containerWidth: number;
  containerHeight: number;
  ballSize: number;
  isPlaying: boolean;
  currentKeyframe?: BallKeyframe;
}

export const AnimatedBall = ({
  position,
  referenceWidth,
  referenceHeight,
  containerWidth,
  containerHeight,
  ballSize,
  isPlaying,
  currentKeyframe,
}: AnimatedBallProps) => {
  const scaleX = (x: number) => (x / referenceWidth) * containerWidth;
  const scaleY = (y: number) => (y / referenceHeight) * containerHeight;

  const scaledX = scaleX(position.x);
  const scaledY = scaleY(position.y);

  const action = currentKeyframe?.action;
  const isMoving = isPlaying && (action === 'passed' || action === 'shot' || action === 'moving');

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
      style={{
        position: 'absolute',
        width: ballSize,
        height: ballSize,
        transform: 'translate(-50%, -50%)',
        zIndex: 15,
      }}
      className="select-none"
    >
      <svg
        width={ballSize}
        height={ballSize}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        <defs>
          <radialGradient id="ball-gradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#E5E7EB" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </radialGradient>

          <filter id="ball-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="3" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="40"
          fill="url(#ball-gradient)"
          stroke="#000000"
          strokeWidth="1"
        />

        <g fill="#000000" opacity="0.8">
          <polygon points="50,20 38,32 45,48 55,48 62,32" />
          <polygon points="30,40 22,52 32,66 45,62 38,48" />
          <polygon points="70,40 62,48 68,62 82,58 78,45" />
          <polygon points="38,72 45,82 55,82 62,72 50,68" />
        </g>

        {isMoving && (
          <>
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              opacity="0.6"
            >
              <animate
                attributeName="r"
                from="40"
                to="50"
                dur="0.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.6"
                to="0"
                dur="0.4s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}

        {action === 'shot' && isPlaying && (
          <text
            x="50"
            y="95"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#EF4444"
          >
            SHOT
          </text>
        )}

        {action === 'passed' && isPlaying && (
          <text
            x="50"
            y="95"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#10B981"
          >
            PASS
          </text>
        )}
      </svg>
    </motion.div>
  );
};
