import Rabona from "rabonajs"
import { useCallback, useEffect, useRef, useState } from "react"
import { useImmer } from "use-immer"
import { useEditPlayersInFormations, usePlayersByFormationId } from "../../hooks/usePlayersInFormation"
import {EditPlayerModal} from "./EditPlayerModal" 

export const PitchComponent = ({ formationId }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [players, setPlayers] = useImmer([])
  const { data: Players } = usePlayersByFormationId(formationId)
  const mutation = useEditPlayersInFormations()
  const containerRef = useRef(null)
  const playerRefs = useRef({})
  const draggedPlayerRef = useRef(null)

  useEffect(() => {
    if (Players) {
      setPlayers(Players)
    }
  }, [Players, setPlayers])

  useEffect(() => {
    if (!containerRef.current) return
    Rabona.pitch("pitch", {
      height: 80,
      width: 120,
      padding: 100,
      linecolour: "#ffffff",
      fillcolour: "#7ec850"
    })
  }, [])

const handlePlayerUpdate = useCallback((id, x, y) => {
  const player = players.find((p) => p.id === id)
  if (!player) return
  if (player.x === x && player.y === y) return
  const updatedPlayer = { ...player, x, y }
  mutation.mutate(updatedPlayer)
}, [players, mutation])

  const startDrag = useCallback((e, id) => {
    if (selectedPlayer) return
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    draggedPlayerRef.current = { id }
    let hasMoved = false

  const move = (ev) => {
    const newX = ev.clientX - rect.left
    const newY = ev.clientY - rect.top
    const distance = Math.sqrt(newX * newX + newY * newY)
    if (distance < 3) return 
    hasMoved = true
    const playerId = playerRefs.current[id]
    if (playerId) {
      playerId.style.left = `${newX}px`
      playerId.style.top = `${newY}px`
      draggedPlayerRef.current.x = newX
      draggedPlayerRef.current.y = newY
    }
  }

    const up = () => {
      if (hasMoved && draggedPlayerRef.current?.x != null && draggedPlayerRef.current?.y != null) {
      const { id, x, y } = draggedPlayerRef.current
      if (id !== null && x !== null && y !== null) {
        setPlayers((draft) => {
          const player = draft.find((p) => p.id === id)
          if (player) {
            player.x = x
            player.y = y
          }
        })
      }
      handlePlayerUpdate(id, x, y)
    }
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
      draggedPlayerRef.current = null
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
  }, [setPlayers, handlePlayerUpdate])

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">
        Tactical Pitch
      </h2>
      <div ref={containerRef} className="relative w-full max-w-[1000px] aspect-[4/3] mx-auto">
        <div id="pitch" className="absolute inset-0" />
        {players.map((p) => (
          <div
            key={p.id}
            ref={(player) => {
              if (player) playerRefs.current[p.id] = player;
            }}
            title={`${p.name} - ${p.role}`}
            onMouseDown={(e) => startDrag(e, p.id)}
            onDoubleClick={(e) => {
                e.stopPropagation()
                setSelectedPlayer(p)
              }}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "red",
              color: "black",
              textAlign: "center",
              lineHeight: "30px",
              fontWeight: "bold",
              userSelect: "none",
              cursor: "grab",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            {p.name}
          </div>
        ))}
      </div>

          {selectedPlayer && (
          <EditPlayerModal
            player={selectedPlayer}
            onClose={() => setSelectedPlayer(null)}
            onSave={(updatedPlayer) => {
              setPlayers((draft) => {
                const index = draft.findIndex((p) => p.id === updatedPlayer.id)
                if (index !== -1) {
                  draft[index] = updatedPlayer
                }
              })
              mutation.mutate(updatedPlayer)
              setSelectedPlayer(null)
            }}
          />
        )}
    </div>
  )
}