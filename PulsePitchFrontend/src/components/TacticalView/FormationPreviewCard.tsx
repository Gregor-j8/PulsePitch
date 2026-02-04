import { motion } from "framer-motion"
import { Layout } from "lucide-react"
import { FormationsDTO } from "../../types/dtos"

interface FormationPreviewCardProps {
  formation: FormationsDTO
  onClick: () => void
}

export const FormationPreviewCard = ({ formation, onClick }: FormationPreviewCardProps) => {
  const playerCount = formation.players?.length || 0

  const getPositionColor = (y: number) => {
    if (y < 200) return "#FCD34D"
    if (y < 350) return "#60A5FA"
    if (y < 550) return "#34D399"
    return "#F87171"
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white border border-neutral-200 rounded-lg p-6 cursor-pointer hover:border-primary-500 transition-all duration-200"
    >
      <div className="space-y-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
              {formation.description}
            </h3>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span className="font-medium text-primary-600">{formation.template || formation.name}</span>
              <span>•</span>
              <span>{playerCount} players</span>
            </div>
          </div>
          <Layout className="h-5 w-5 text-primary-500 flex-shrink-0" />
        </div>

        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gradient-to-b from-[#5fb830] to-[#68c241]">
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute h-full"
                style={{
                  left: `${i * 12.5}%`,
                  width: '12.5%',
                  backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent'
                }}
              />
            ))}
          </div>

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 120 80"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect x="0" y="0" width="120" height="80" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <line x1="60" y1="0" x2="60" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <circle cx="60" cy="40" r="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />

            {formation.players?.map((player, index) => {
              const x = (player.x / 1000) * 120
              const y = (player.y / 700) * 80
              const color = getPositionColor(player.y)

              return (
                <g key={player.id || index}>
                  <circle
                    cx={x + 0.3}
                    cy={y + 0.3}
                    r="2.5"
                    fill="rgba(0,0,0,0.3)"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="2.5"
                    fill={color}
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </g>
              )
            })}
          </svg>

          <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold">
            {formation.template || formation.name}
          </div>
        </div>

        <div className="text-sm text-neutral-500 text-center">
          Click to view and edit
        </div>
      </div>
    </motion.div>
  )
}
