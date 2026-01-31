// @ts-nocheck
import { useCreateTeamGame } from "../../hooks/UseGames"
import { useTeams } from "../../hooks/useTeams"
import { useState } from "react"
import {LoadingSpinner} from "../Loading/LoadingPage"
import { useCreateMatchRequest } from "../../hooks/useMatchRequest"
import { toast } from "react-toastify"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea, Select } from "../ui/Input"

export const CreateGameModal = ({ onClose, loggedInUser }) => {
  const { data: teams, isLoading, isError } = useTeams()
  const createTeamEvent = useCreateTeamGame()
  const CreateMatchRequest = useCreateMatchRequest()
    const [formData, setFormData] = useState({start: "", end: "", homeTeamId: "", awayTeamId: "", message: ""})
  if (isLoading || isError) return <LoadingSpinner/>
  const handleSubmit = () => {
    const data = {
      Start: formData.start,
      End: formData.end,
      HomeTeamId: formData.homeTeamId,
      awayTeamId: formData.awayTeamId,
      result: ""
    }
    const oppteamChoach = teams.find(t => t.id == formData.awayTeamId)
    CreateMatchRequest.mutate({
      proposedDate: formData.start,
      message: formData.message,
      homeTeamId: formData.homeTeamId,
      awayTeamId: formData.awayTeamId,
      senderId: loggedInUser.id,
      RecieverId: oppteamChoach.coachId,
      Status: undefined
    })
    createTeamEvent.mutate(data, {
      onSuccess: () => {
        toast.success(`A Game request has been send to ${formData.awayTeamId} the match will appear when accepted`)
        onClose()
      },
    })
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Create Game" size="md">
      <ModalBody>
        <Input
          label="Start Time"
          type="datetime-local"
          value={formData.start}
          onChange={(e) => setFormData({ ...formData, start: e.target.value })}
          className="mb-2"
        />
        <Input
          label="End Time"
          type="datetime-local"
          value={formData.end}
          onChange={(e) => setFormData({ ...formData, end: e.target.value })}
          className="mb-2"
        />
        <Select
          value={formData.homeTeamId}
          onChange={(e) => setFormData({ ...formData, homeTeamId: e.target.value })}
          options={[
            { value: "", label: "Select Home Team" },
            ...loggedInUser.teams.map(team => ({
              value: team.teamId,
              label: teams.find(m => m.id === team.teamId)?.name
            }))
          ]}
          className="mb-2"
        />
        <Select
          value={formData.awayTeamId}
          onChange={(e) => setFormData({ ...formData, awayTeamId: e.target.value })}
          options={[
            { value: "", label: "Select Opponent" },
            ...teams
              .filter(team => team.id != formData.homeTeamId)
              .map(team => ({ value: team.id, label: team.name }))
          ]}
          className="mb-2"
        />
        <Textarea
          placeholder="Message to opponent"
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Add Game
        </Button>
      </ModalFooter>
    </Modal>
  );
}