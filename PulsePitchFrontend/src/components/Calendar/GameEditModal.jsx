import { useState } from "react"
import { useTeamGame, useEditTeamGame } from "../../hooks/UseGames"
import { useTeams } from "../../hooks/useTeams"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input, Select } from "../ui/Input"

export const GameEditModal = ({ choosenGameId, setChosenGameId, onClose, StarterFormData }) => {
  const [formData, setFormData] = useState(StarterFormData)
  const { data: gameData } = useTeamGame(choosenGameId, { enabled: !!choosenGameId })
  const { mutate: updateTeamGame } = useEditTeamGame()
  const { data: teams, isLoading, isError } = useTeams()
  if (!gameData || isLoading || isError) return null

  const handleUpdate = () => {
    const payload = { start: formData.start, end: formData.end, homeTeamId: formData.homeTeamId,
        awayTeamId: formData.awayTeamId, result: formData.result,}
        updateTeamGame({ id: choosenGameId, data: payload },
        { onSuccess: () => {onClose(); setChosenGameId(null)}})}

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Game" size="md">
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
          onChange={(e) => setFormData({ ...formData, homeTeamId: parseInt(e.target.value) })}
          options={[
            { value: "", label: "Select Home Team" },
            ...teams.map((team) => ({ value: team.id, label: team.name }))
          ]}
          className="mb-2"
        />
        <Select
          value={formData.awayTeamId}
          onChange={(e) => setFormData({ ...formData, awayTeamId: parseInt(e.target.value) })}
          options={[
            { value: "", label: "Select Away Team" },
            ...teams.map((team) => ({ value: team.id, label: team.name }))
          ]}
          className="mb-2"
        />
        <Input
          placeholder="Result"
          value={formData.result}
          onChange={(e) => setFormData({ ...formData, result: e.target.value })}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleUpdate}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  )
}
