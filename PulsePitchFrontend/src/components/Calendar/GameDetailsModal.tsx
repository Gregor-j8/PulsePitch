import { useState } from "react"
import { useDeleteTeamGame, useTeamGame } from "../../hooks/UseGames"
import { CalendarDays } from 'lucide-react'
import { LoadingSpinner } from "../Loading/LoadingPage"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { ConfirmDialog } from "../ui"
import { formatDate } from "../../utils"
import { UserProfileDTO } from "../../types"

interface GameDetailsModalsProps {
  loggedInUser: UserProfileDTO;
  choosenGameId: number | null;
  setchoosenGameId: (id: number | null) => void;
  onClose: () => void;
  setEditGameModel: (value: boolean) => void;
  SetStarterFormData: (data: any) => void;
}

export const GameDetailsModals = ({ loggedInUser, choosenGameId, setchoosenGameId, onClose, setEditGameModel, SetStarterFormData }: GameDetailsModalsProps) => {
  const { data: gameData } = useTeamGame(choosenGameId ?? undefined)
  const deleteTeamGameMutation = useDeleteTeamGame()
  const { mutate: deleteTeamGame } = deleteTeamGameMutation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)

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
            Start <p>{formatDate(gameData.start)}</p>
          </div>
          <div className="block text-sm font-semibold text-neutral-500">
            End <p>{formatDate(gameData.end)}</p>
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
              <Button variant="danger" onClick={() => setShowDeleteConfirm(true)} loading={deleteTeamGameMutation.isPending}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </ModalFooter>
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          deleteTeamGame(gameData.id)
          setchoosenGameId(null)
          setShowDeleteConfirm(false)
          onClose()
        }}
        title="Delete Game"
        message="Are you sure you want to delete this game? This action cannot be undone."
        confirmText="Delete"
        isLoading={deleteTeamGameMutation.isPending}
      />
    </Modal>
  )
}