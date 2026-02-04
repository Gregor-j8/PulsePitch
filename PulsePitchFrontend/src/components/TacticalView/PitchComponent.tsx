import { useCallback, useEffect, useRef, useState } from "react"
import { useImmer } from "use-immer"
import { useEditPlayersInFormations, usePlayersByFormationId } from "../../hooks/usePlayersInFormation"
import {EditPlayerModal} from "./EditPlayerModal"
import { EditFormationModal } from "./EditFormationModal"
import { Button } from "../ui/Button"
import * as d3 from "d3"
import { PlayersInFormationDTO } from "../../types/dtos"
import { Field } from "./Field"
import { EnhancedPlayer } from "./EnhancedPlayer"
import { SoccerBall } from "./SoccerBall"
import { toPng } from 'html-to-image'
import { toast } from 'react-toastify'
import { useGetFormationsById } from "../../hooks/useFormation"

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

  const [history, setHistory] = useState<PlayersInFormationDTO[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const { data: Players } = usePlayersByFormationId(formationId ?? 0)
  const { data: formation } = useGetFormationsById(formationId ?? 0)
  const mutation = useEditPlayersInFormations()
  const ballRef = useRef<HTMLDivElement | null>(null)
  const draggedBallRef = useRef<boolean | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRefs = useRef<{ [key: number]: HTMLDivElement }>({})
  const draggedPlayerRef = useRef<{ id: number; x?: number; y?: number } | null>(null)
  const circleRef = useRef<d3.Selection<SVGCircleElement, unknown, HTMLElement, any> | null>(null)

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
      setHistory([JSON.parse(JSON.stringify(Players))])
      setHistoryIndex(0)
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

  const saveToHistory = useCallback((newPlayers: PlayersInFormationDTO[]) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(JSON.parse(JSON.stringify(newPlayers)))
      return newHistory.slice(-50)
    })
    setHistoryIndex((prev) => Math.min(prev + 1, 49))
  }, [historyIndex])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setPlayers(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }, [historyIndex, history, setPlayers])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setPlayers(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }, [historyIndex, history, setPlayers])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      }
    }

    if (canManageFormations) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [undo, redo, canManageFormations])

  const exportAsPNG = useCallback(async () => {
    if (!containerRef.current) return

    try {
      const dataUrl = await toPng(containerRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#5fb830',
      })

      const link = document.createElement('a')
      link.download = `formation-${formation?.description || 'tactical-view'}.png`
      link.href = dataUrl
      link.click()

      toast.success('Formation exported successfully!')
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('Failed to export formation')
    }
  }, [formation])

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
        const updatedPlayers = players.map((p) =>
          p.id === id ? { ...p, x: unscaledX, y: unscaledY } : p
        )
        saveToHistory(updatedPlayers)
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
          const updatedPlayers = players.map((p) =>
            p.id === id ? { ...p, x: unscaledX, y: unscaledY } : p
          )
          saveToHistory(updatedPlayers)
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
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              onClick={undo}
              disabled={historyIndex <= 0}
              className="flex-1 sm:flex-initial text-sm"
              title="Undo (Ctrl+Z)"
            >
              ↶ Undo
            </Button>
            <Button
              variant="ghost"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="flex-1 sm:flex-initial text-sm"
              title="Redo (Ctrl+Y)"
            >
              ↷ Redo
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={exportAsPNG}
            className="w-full sm:w-auto text-sm"
            title="Export formation as PNG"
          >
            📸 Export PNG
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
          <SoccerBall
            x={scaleCoordinate(ball.x, REFERENCE_WIDTH, containerSize.width)}
            y={scaleCoordinate(ball.y, REFERENCE_HEIGHT, containerSize.height)}
            canManageFormations={canManageFormations}
            onMouseDown={startDragBall}
            onTouchStart={startDragBallTouch}
            ballRef={ballRef}
          />
        {players.map((p) => {
          const scaledX = scaleCoordinate(p.x, REFERENCE_WIDTH, containerSize.width)
          const scaledY = scaleCoordinate(p.y, REFERENCE_HEIGHT, containerSize.height)
          const playerSize = isMobile ? 50 : 40

          return (
            <EnhancedPlayer
              key={p.id}
              player={p}
              scaledX={scaledX}
              scaledY={scaledY}
              playerSize={playerSize}
              isMobile={isMobile}
              canManageFormations={canManageFormations}
              onMouseDown={(e) => startDrag(e, p.id)}
              onTouchStart={(e) => startDragTouch(e, p.id)}
              onDoubleClick={(e) => {
                e.stopPropagation()
                setSelectedPlayer(p)
              }}
              playerRef={(player) => {
                if (player) playerRefs.current[p.id] = player
              }}
            />
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