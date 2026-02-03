import { useCallback, useEffect, useRef, useState } from "react"
import { useImmer } from "use-immer"
import { useEditPlayersInFormations, usePlayersByFormationId } from "../../hooks/usePlayersInFormation"
import {EditPlayerModal} from "./EditPlayerModal"
import { EditFormationModal } from "./EditFormationModal"
import { Button } from "../ui/Button"
import * as d3 from "d3"
import { PlayersInFormationDTO } from "../../types/dtos"
import { Field } from "./Field"

interface PitchComponentProps {
  formationId: number | null;
  setFormationId: (value: number | null) => void;
  setFormationModal: (value: boolean) => void;
  setCreateFormationModal: (value: boolean) => void;
  canManageFormations: boolean;
}

export const PitchComponent = ({ formationId, setFormationId, setFormationModal, setCreateFormationModal, canManageFormations }: PitchComponentProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayersInFormationDTO | null>(null)
  const [editFormationModal, setEditFormationModal] = useState<boolean>(false)
  const [ball, setBall] = useState<{ x: number; y: number }>({ x: 500, y: 350 })
  const [players, setPlayers] = useImmer<PlayersInFormationDTO[]>([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const { data: Players } = usePlayersByFormationId(formationId ?? 0)
  const mutation = useEditPlayersInFormations()
  const ballRef = useRef<HTMLDivElement | null>(null)
  const draggedBallRef = useRef<boolean | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRefs = useRef<{ [key: number]: HTMLDivElement }>({})
  const draggedPlayerRef = useRef<{ id: number; x?: number; y?: number } | null>(null)
  const circleRef = useRef<d3.Selection<SVGCircleElement, unknown, HTMLElement, any> | null>(null)

  // Backend stores coordinates in reference system: 1000px width x 700px height
  const REFERENCE_WIDTH = 1000
  const REFERENCE_HEIGHT = 700

  const scaleCoordinate = useCallback((coord: number, refSize: number, actualSize: number) => {
    if (!actualSize || actualSize === 0) return coord
    return (coord / refSize) * actualSize
  }, [])

  const unscaleCoordinate = useCallback((coord: number, refSize: number, actualSize: number) => {
    if (!actualSize || actualSize === 0) return coord
    return (coord / actualSize) * refSize
  }, [])

  useEffect(() => {
    if (Players) {
      setPlayers(Players)
    }
  }, [Players, setPlayers])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: rect.height })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setContainerSize({ width, height })
      }
    })

    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
      if (circleRef.current) return

      const overlaySvg = d3.select("#d3-overlay")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("position", "absolute")
        .style("top", 0)
        .style("left", 0)
        .style("pointer-events", "none")
        .style("z-index", 5)

      circleRef.current = overlaySvg.append("circle")
        .attr("r", 10)
        .attr("fill", "red")
    }, [isMobile])

    useEffect(() => {
      if (circleRef.current) {
        circleRef.current
          .attr("cx", ball.x)
          .attr("cy", ball.y)
      }
    }, [ball])

  const handlePlayerUpdate = useCallback((id: number, x: number, y: number) => {
    const player = players.find((p) => p.id === id)
    if (!player) return
    if (player.x === x && player.y === y) return
    const updatedPlayer = { ...player, x, y }
    mutation.mutate(updatedPlayer as any)
  }, [players, mutation])

    const startDragBall = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    draggedBallRef.current = true

    const move = (ev: MouseEvent) => {
      const newX = ev.clientX - rect.left
      const newY = ev.clientY - rect.top
      if (newX < 0 || newX > rect.width || newY < 0 || newY > rect.height) return

      const unscaledX = unscaleCoordinate(newX, REFERENCE_WIDTH, containerSize.width)
      const unscaledY = unscaleCoordinate(newY, REFERENCE_HEIGHT, containerSize.height)

      setBall({ x: unscaledX, y: unscaledY })
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
  }, [containerSize, unscaleCoordinate, REFERENCE_WIDTH, REFERENCE_HEIGHT])


  const startDragBallTouch = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    draggedBallRef.current = true

    const move = (ev: TouchEvent) => {
      const touch = ev.touches[0]
      if (!touch) return
      const newX = touch.clientX - rect.left
      const newY = touch.clientY - rect.top
      if (newX < 0 || newX > rect.width || newY < 0 || newY > rect.height) return

      const unscaledX = unscaleCoordinate(newX, REFERENCE_WIDTH, containerSize.width)
      const unscaledY = unscaleCoordinate(newY, REFERENCE_HEIGHT, containerSize.height)

      setBall({ x: unscaledX, y: unscaledY })
      if (ballRef.current) {
        ballRef.current.style.left = `${newX}px`
        ballRef.current.style.top = `${newY}px`
      }
    }

    const up = () => {
      window.removeEventListener("touchmove", move as any)
      window.removeEventListener("touchend", up)
      draggedBallRef.current = false
    }

    window.addEventListener("touchmove", move as any)
    window.addEventListener("touchend", up)
  }, [containerSize, unscaleCoordinate, REFERENCE_WIDTH, REFERENCE_HEIGHT])

  const startDrag = useCallback((e: React.MouseEvent, id: number) => {
    if (selectedPlayer) return
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    draggedPlayerRef.current = { id }
    let hasMoved = false

  const move = (ev: MouseEvent) => {
    const newX = ev.clientX - rect.left
    const newY = ev.clientY - rect.top
    const distance = Math.sqrt(newX * newX + newY * newY)
    if (distance < 3) return
    hasMoved = true
    const playerId = playerRefs.current[id]
    if (playerId) {
      playerId.style.left = `${newX}px`
      playerId.style.top = `${newY}px`
      if (draggedPlayerRef.current) {
        draggedPlayerRef.current.x = newX
        draggedPlayerRef.current.y = newY
      }
    }
  }

    const up = () => {
      if (hasMoved && draggedPlayerRef.current?.x != null && draggedPlayerRef.current?.y != null) {
      const { id, x, y } = draggedPlayerRef.current

      const unscaledX = unscaleCoordinate(x, REFERENCE_WIDTH, containerSize.width)
      const unscaledY = unscaleCoordinate(y, REFERENCE_HEIGHT, containerSize.height)

      if (x !== undefined && y !== undefined) {
        setPlayers((draft) => {
          const player = draft.find((p) => p.id === id)
          if (player) {
            player.x = unscaledX
            player.y = unscaledY
          }
        })
        handlePlayerUpdate(id, unscaledX, unscaledY)
      }
    }
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
      draggedPlayerRef.current = null
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
  }, [setPlayers, handlePlayerUpdate, selectedPlayer, containerSize, unscaleCoordinate, REFERENCE_WIDTH, REFERENCE_HEIGHT])

  const startDragTouch = useCallback((e: React.TouchEvent, id: number) => {
    if (selectedPlayer) return
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    draggedPlayerRef.current = { id }
    let hasMoved = false

    const move = (ev: TouchEvent) => {
      const touch = ev.touches[0]
      if (!touch) return
      const newX = touch.clientX - rect.left
      const newY = touch.clientY - rect.top
      hasMoved = true
      const playerId = playerRefs.current[id]
      if (playerId) {
        playerId.style.left = `${newX}px`
        playerId.style.top = `${newY}px`
        if (draggedPlayerRef.current) {
          draggedPlayerRef.current.x = newX
          draggedPlayerRef.current.y = newY
        }
      }
    }

    const up = () => {
      if (hasMoved && draggedPlayerRef.current?.x != null && draggedPlayerRef.current?.y != null) {
        const { id, x, y } = draggedPlayerRef.current

        const unscaledX = unscaleCoordinate(x, REFERENCE_WIDTH, containerSize.width)
        const unscaledY = unscaleCoordinate(y, REFERENCE_HEIGHT, containerSize.height)

        if (x !== undefined && y !== undefined) {
          setPlayers((draft) => {
            const player = draft.find((p) => p.id === id)
            if (player) {
              player.x = unscaledX
              player.y = unscaledY
            }
          })
          handlePlayerUpdate(id, unscaledX, unscaledY)
        }
      }
      window.removeEventListener("touchmove", move as any)
      window.removeEventListener("touchend", up)
      draggedPlayerRef.current = null
    }

    window.addEventListener("touchmove", move as any)
    window.addEventListener("touchend", up)
  }, [setPlayers, handlePlayerUpdate, selectedPlayer, containerSize, unscaleCoordinate, REFERENCE_WIDTH, REFERENCE_HEIGHT])

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black text-center my-15">
        Tactical Pitch
      </h2>
     <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 mb-6 px-2">
      {canManageFormations && (
        <>
          <Button
            variant="primary"
            onClick={() => { setCreateFormationModal(true); setFormationId(null);}}
            className="w-full sm:w-auto text-sm"
          >
            + Add Formation
          </Button>
          <Button
            variant="primary"
            onClick={() => { setEditFormationModal(true)}}
            className="w-full sm:w-auto text-sm"
          >
            Edit Formation
          </Button>
        </>
      )}
      <Button
        variant="primary"
        onClick={() => { setFormationModal(true); setFormationId(null)}}
        className="w-full sm:w-auto text-sm"
      >
        Change Formation
      </Button>
    </div>
      <div ref={containerRef} className="relative w-full max-w-[1000px] md:max-w-[1000px] sm:max-w-full aspect-[4/3] mx-auto">
        <Field isMobile={isMobile} />
        <div id="d3-overlay" className="absolute inset-0 z-10 pointer-events-none" />
          <div
            ref={ballRef}
            onMouseDown={canManageFormations ? startDragBall : undefined}
            onTouchStart={canManageFormations ? startDragBallTouch : undefined}
            style={{
              position: "absolute",
              left: `${scaleCoordinate(ball.x, REFERENCE_WIDTH, containerSize.width)}px`,
              top: `${scaleCoordinate(ball.y, REFERENCE_HEIGHT, containerSize.height)}px`,
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "white",
              border: "3px solid black",
              cursor: canManageFormations ? "grab" : "default",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
            title="Ball"
          />
        {players.map((p) => {
          const scaledX = scaleCoordinate(p.x, REFERENCE_WIDTH, containerSize.width)
          const scaledY = scaleCoordinate(p.y, REFERENCE_HEIGHT, containerSize.height)
          const playerSize = isMobile ? 40 : 30

          return (
            <div
              key={p.id}
              ref={(player) => {
                if (player) playerRefs.current[p.id] = player;
              }}
              title={`${p.name} - ${p.role}`}
              onMouseDown={canManageFormations ? (e) => startDrag(e, p.id) : undefined}
              onTouchStart={canManageFormations ? (e) => startDragTouch(e, p.id) : undefined}
              onDoubleClick={canManageFormations ? (e) => {
                  e.stopPropagation()
                  setSelectedPlayer(p)
                } : undefined}
              style={{
                position: "absolute",
                left: scaledX,
                top: scaledY,
                width: playerSize,
                height: playerSize,
                borderRadius: "50%",
                backgroundColor: p.color,
                color: "black",
                textAlign: "center",
                lineHeight: `${playerSize}px`,
                fontWeight: "bold",
                fontSize: isMobile ? "11px" : "10px",
                userSelect: "none",
                cursor: canManageFormations ? "grab" : "default",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              {p.name}
            </div>
          )
        })}
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
              mutation.mutate(updatedPlayer as any)
              setSelectedPlayer(null)
            }}
          />
        )}
        {editFormationModal && formationId !== null && (
            <EditFormationModal setFormationId={setFormationId} setEditFormationModal={setEditFormationModal} formationId={formationId} setFormationModal={setFormationModal}/>
        )}
    </div>
  )
}