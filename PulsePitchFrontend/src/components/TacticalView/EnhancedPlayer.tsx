import { motion } from "framer-motion"
import { PlayersInFormationDTO } from "../../types/dtos"

interface EnhancedPlayerProps {
  player: PlayersInFormationDTO
  scaledX: number
  scaledY: number
  playerSize: number
  isMobile: boolean
  canManageFormations: boolean
  onMouseDown?: (e: React.MouseEvent) => void
  onTouchStart?: (e: React.TouchEvent) => void
  onDoubleClick?: (e: React.MouseEvent) => void
  playerRef: (element: HTMLDivElement | null) => void
}

export const EnhancedPlayer = ({
  player,
  scaledX,
  scaledY,
  playerSize,
  isMobile,
  canManageFormations,
  onMouseDown,
  onTouchStart,
  onDoubleClick,
  playerRef
}: EnhancedPlayerProps) => {
  const jerseyNumber = player.positionId?.toString() || "1"

  const isGoalkeeper = player.role?.toLowerCase().includes("gk") ||
                       player.role?.toLowerCase().includes("goalkeeper") ||
                       player.role?.toLowerCase().includes("keeper")

  return (
    <motion.div
      ref={playerRef}
      title={`${player.name} - ${player.role}`}
      onMouseDown={canManageFormations ? onMouseDown : undefined}
      onTouchStart={canManageFormations ? onTouchStart : undefined}
      onDoubleClick={canManageFormations ? onDoubleClick : undefined}
      style={{
        position: "absolute",
        left: scaledX,
        top: scaledY,
        width: playerSize,
        height: playerSize,
        cursor: canManageFormations ? "grab" : "default",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
      className="select-none"
    >
      {/* SVG Jersey */}
      <svg
        width={playerSize}
        height={playerSize}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        <defs>

          <filter id={`shadow-${player.id}`} x="-50%" y="-50%" width="200%" height="200%">
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

          <radialGradient id={`jersey-gradient-${player.id}`} cx="40%" cy="40%">
            <stop offset="0%" stopColor={player.color} stopOpacity="1" />
            <stop offset="100%" stopColor={player.color} stopOpacity="0.7"
                  style={{ stopColor: `color-mix(in srgb, ${player.color} 70%, black)` }}/>
          </radialGradient>

          {isGoalkeeper && (
            <pattern id={`gk-pattern-${player.id}`} patternUnits="userSpaceOnUse" width="8" height="8">
              <rect width="8" height="8" fill={player.color} />
              <circle cx="4" cy="4" r="1.5" fill="rgba(255,255,255,0.3)" />
            </pattern>
          )}
        </defs>

        <circle
          cx="50"
          cy="50"
          r="45"
          fill={isGoalkeeper ? `url(#gk-pattern-${player.id})` : `url(#jersey-gradient-${player.id})`}
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="2"
          filter={`url(#shadow-${player.id})`}
        />

        <path
          d="M 45 10 L 50 20 L 55 10"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.5"
        />

        <text
          x="50"
          y="55"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={isMobile ? "32" : "28"}
          fontWeight="bold"
          fill="white"
          stroke="rgba(0, 0, 0, 0.3)"
          strokeWidth="1"
          style={{
            fontFamily: "Arial, sans-serif",
            paintOrder: "stroke fill",
          }}
        >
          {jerseyNumber}
        </text>

        <text
          x="50"
          y="80"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="9"
          fontWeight="600"
          fill="white"
          stroke="rgba(0, 0, 0, 0.5)"
          strokeWidth="0.5"
          style={{
            fontFamily: "Arial, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            paintOrder: "stroke fill",
          }}
        >
          {player.name.length > 8 ? player.name.substring(0, 7) + "." : player.name}
        </text>

        {isGoalkeeper && (
          <g transform="translate(70, 20)">
            <circle cx="0" cy="0" r="8" fill="rgba(255, 255, 255, 0.3)" />
            <text x="0" y="1" textAnchor="middle" fontSize="8" fill="white">GK</text>
          </g>
        )}
      </svg>
    </motion.div>
  )
}
