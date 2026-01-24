import { useDeleteTeamGame, useTeamGame } from "../../hooks/UseGames"
import { CalendarDays } from 'lucide-react'
import { LoadingSpinner } from "../Loading/LoadingPage"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"

export const GameDetailsModals = ({ loggedInUser, choosenGameId, setchoosenGameId, onClose, setEditGameModel, SetStarterFormData }) => {
  const { data: gameData } = useTeamGame(choosenGameId, { enabled: !!choosenGameId })
  const { mutate: deleteTeamGame } = useDeleteTeamGame()

if (!loggedInUser || !gameData) return <LoadingSpinner/>
  return (
    <Modal isOpen={true} onClose={onClose} title={<div className="flex items-center gap-2"><CalendarDays /> Game Details</div>} size="md">
      <ModalBody>
        <div className="space-y-4 text-neutral-700">
          <div className="block text-sm font-semibold text-neutral-500">
            Home Team <p>{gameData.homeTeam?.name}</p>
          </div>
          <div className="block text-sm font-semibold text-neutral-500">
            Away Team <p>{gameData.awayTeam?.name}</p>
          </div>
          <div className="block text-sm font-semibold text-neutral-500">
            Start <p>{new Date(gameData.start).toLocaleString()}</p>
          </div>
          <div className="block text-sm font-semibold text-neutral-500">
            End <p>{new Date(gameData.end).toLocaleString()}</p>
          </div>
          <div className="block text-sm font-semibold text-neutral-500">
            Result <p>{gameData.result}</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="justify-between">
        <div>
          {loggedInUser.roles.includes("Coach") && (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => {
                SetStarterFormData(gameData)
                setEditGameModel(true)
                onClose()
              }}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => { deleteTeamGame(gameData.id); setchoosenGameId(null); onClose()}}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}