import { useState } from "react"
import { useDeletePlayersInFormations } from "../../hooks/usePlayersInFormation"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { PlayersInFormationDTO } from "../../types/dtos"

interface EditPlayerModalProps {
  player: PlayersInFormationDTO;
  onClose: () => void;
  onSave: (player: PlayersInFormationDTO) => void;
}

export const EditPlayerModal = ({ player, onClose, onSave }: EditPlayerModalProps) => {
    const mutation = useDeletePlayersInFormations()
    const [name, setName] = useState<string>(player.name)
    const [role, setRole] = useState<string>(player.role ?? "")

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Player" size="md">
      <ModalBody>
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          className="mb-4"
        />
        <Input
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter player role"
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSave({ ...player, name, role })}>
          Save
        </Button>
        <Button variant="danger" onClick={() => mutation.mutate(player.id)}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
}
