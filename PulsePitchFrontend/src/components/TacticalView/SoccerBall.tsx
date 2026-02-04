import { motion } from "framer-motion"
import { RefObject } from "react"

interface SoccerBallProps {
  x: number
  y: number
  canManageFormations: boolean
  onMouseDown?: (e: React.MouseEvent) => void
  onTouchStart?: (e: React.TouchEvent) => void
  ballRef: RefObject<HTMLDivElement | null>
}

export const SoccerBall = ({
  x,
  y,
  canManageFormations,
  onMouseDown,
  onTouchStart,
  ballRef
}: SoccerBallProps) => {
  const size = 24

  return (
    <motion.div
      ref={ballRef}
      onMouseDown={canManageFormations ? onMouseDown : undefined}
      onTouchStart={canManageFormations ? onTouchStart : undefined}
      whileHover={canManageFormations ? { scale: 1.15 } : undefined}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: size,
        height: size,
        cursor: canManageFormations ? "grab" : "default",
        transform: "translate(-50%, -50%)",
        zIndex: 20,
      }}
      title="Ball"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-md"
      >
        <defs>
          {/* Shadow */}
          <filter id="ball-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5"/>
            <feOffset dx="1" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="ball-gradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f0f0f0" />
            <stop offset="100%" stopColor="#d0d0d0" />
          </radialGradient>

          <pattern id="ball-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon
              points="50,30 62,42 56,58 44,58 38,42"
              fill="#1a1a1a"
              stroke="#2a2a2a"
              strokeWidth="0.5"
            />

            <polygon
              points="50,15 58,20 58,30 50,35 42,30 42,20"
              fill="white"
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />

            <polygon
              points="65,35 73,40 73,50 65,55 57,50 57,40"
              fill="white"
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />

            <polygon
              points="35,35 43,40 43,50 35,55 27,50 27,40"
              fill="white"
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#ball-gradient)"
          filter="url(#ball-shadow)"
        />

        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#ball-pattern)"
          opacity="0.9"
        />

        <ellipse
          cx="38"
          cy="35"
          rx="12"
          ry="8"
          fill="rgba(255, 255, 255, 0.4)"
        />

        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth="0.5"
        />
      </svg>
    </motion.div>
  )
}
