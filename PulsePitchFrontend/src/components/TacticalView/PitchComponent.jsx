import Rabona from "rabonajs"
import { useCallback, useEffect, useRef, useState } from "react"
import { useImmer } from "use-immer"
import { useEditPlayersInFormations, usePlayersByFormationId } from "../../hooks/usePlayersInFormation"
import {EditPlayerModal} from "./EditPlayerModal"
import { EditFormationModal } from "./EditFormationModal"
import * as d3 from "d3"


export const PitchComponent = ({ formationId, setFormationId, setFormationModal, setCreateFormationModal }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [editFormationModal, setEditFormationModal] = useState(false)
  const [ball, setBall] = useState({ x: 500, y: 350 })
  const [players, setPlayers] = useImmer([])
  const { data: Players } = usePlayersByFormationId(formationId)
  const mutation = useEditPlayersInFormations()
  const ballRef = useRef(null)
  const draggedBallRef = useRef(null)
  const containerRef = useRef(null)
  const playerRefs = useRef({})
  const draggedPlayerRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    if (Players) {
      setPlayers(Players)
    }
  }, [Players, setPlayers])

  useEffect(() => {
      if (circleRef.current) return
      Rabona.pitch("pitch", {
        height: 80,
        width: 120,
        padding: 100,
        linecolour: "#ffffff",
        fillcolour: "#7ec850"
      })
      const svg = d3.select("#d3-overlay")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("position", "absolute")
        .style("top", 0)
        .style("left", 0)
        .style("pointer-events", "none")
        .style("z-index", 5)

      circleRef.current = svg.append("circle")
        .attr("r", 10)
        .attr("fill", "red")
    }, [])

    useEffect(() => {
      if (circleRef.current) {
        circleRef.current
          .attr("cx", ball.x)
          .attr("cy", ball.y)
        console.log("Drawing D3 circle at", ball.x, ball.y)
      }
    }, [ball])



  const handlePlayerUpdate = useCallback((id, x, y) => {
    const player = players.find((p) => p.id === id)
    if (!player) return
    if (player.x === x && player.y === y) return
    const updatedPlayer = { ...player, x, y }
    mutation.mutate(updatedPlayer)
  }, [players, mutation])

    const startDragBall = useCallback((e) => {
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    draggedBallRef.current = true

    const move = (ev) => {
      const newX = ev.clientX - rect.left
      const newY = ev.clientY - rect.top
      if (newX < 0 || newX > rect.width || newY < 0 || newY > rect.height) return
      setBall({ x: newX, y: newY })
      if (ballRef.current) {
        ballRef.current.style.left = `${newX}px`
        ballRef.current.style.top = `${newY}px`
      }
    }

    const up = () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
      draggedBallRef.current = false
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
  }, [])


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
  }, [setPlayers, handlePlayerUpdate, selectedPlayer])

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black text-center my-15">
        Tactical Pitch
      </h2>
     <div className="flex flex-wrap justify-center gap-4 mb-6">
      <button onClick={() => { setCreateFormationModal(true); setFormationId(null);}}
        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg">
        + Add Formation
      </button>
      <button onClick={() => { setFormationModal(true); setFormationId(null)}}
        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg">
        Change Formation
      </button>
      <button
        onClick={() => { setEditFormationModal(true)}} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg">
        Edit Formation
      </button>
    </div>
      <div ref={containerRef} className="relative w-full max-w-[1000px] aspect-[4/3] mx-auto">
        <div id="pitch" className="absolute inset-0 bg-green-600" />
        <div id="d3-overlay" className="absolute inset-0 z-10 pointer-events-none" />
          <div
            ref={ballRef}
            onMouseDown={startDragBall}
            style={{
              position: "absolute",
              left: `${ball.x}px`,
              top: `${ball.y}px`,
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "white",
              border: "3px solid black",
              cursor: "grab",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
            title="Ball"
          />
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
              backgroundColor: p.color ,
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
        {editFormationModal && (
            <EditFormationModal setFormationId={setFormationId} setEditFormationModal={setEditFormationModal} formationId={formationId} setFormationModal={setFormationModal}/> 
        )}
    </div>
  )
}