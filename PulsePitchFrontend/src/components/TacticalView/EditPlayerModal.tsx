import { useState } from "react"
import { useDeletePlayersInFormations } from "../../hooks/usePlayersInFormation"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { PlayersInFormationDTO } from "../../types/dtos"
import { HexColorPicker } from "react-colorful"

interface EditPlayerModalProps {
  player: PlayersInFormationDTO;
  onClose: () => void;
  onSave: (player: PlayersInFormationDTO) => void;
}

export const EditPlayerModal = ({ player, onClose, onSave }: EditPlayerModalProps) => {
    const mutation = useDeletePlayersInFormations()
    const [name, setName] = useState<string>(player.name)
    const [role, setRole] = useState<string>(player.role ?? "")
    const [color, setColor] = useState<string>(player.color || "#3B82F6")
    const [note, setNote] = useState<string>(player.note || "")

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
          placeholder="Enter player role (e.g., GK, Defender, Midfielder)"
          className="mb-4"
        />
        <Input
          label="Notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional notes about the player"
          className="mb-4"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Jersey Color
          </label>
          <div className="flex items-center gap-4">
            <HexColorPicker color={color} onChange={setColor} style={{ width: '200px', height: '150px' }} />
            <div className="flex-1">
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#3B82F6"
                className="mb-2"
              />
              <div
                className="w-full h-12 rounded border-2 border-neutral-200"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs text-neutral-500 mt-1">Preview</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <button
            onClick={() => setColor("#3B82F6")}
            className="h-10 rounded border-2 hover:border-neutral-400"
            style={{ backgroundColor: "#3B82F6" }}
            title="Blue"
          />
          <button
            onClick={() => setColor("#EF4444")}
            className="h-10 rounded border-2 hover:border-neutral-400"
            style={{ backgroundColor: "#EF4444" }}
            title="Red"
          />
          <button
            onClick={() => setColor("#10B981")}
            className="h-10 rounded border-2 hover:border-neutral-400"
            style={{ backgroundColor: "#10B981" }}
            title="Green"
          />
          <button
            onClick={() => setColor("#F59E0B")}
            className="h-10 rounded border-2 hover:border-neutral-400"
            style={{ backgroundColor: "#F59E0B" }}
            title="Orange"
          />
          <button
            onClick={() => setColor("#8B5CF6")}
            className="h-10 rounded border-2 hover:border-neutral-400"
            style={{ backgroundColor: "#8B5CF6" }}
            title="Purple"
          />
          <button
            onClick={() => setColor("#FCD34D")}
            className="h-10 rounded border-2 hover:border-neutral-400"
            style={{ backgroundColor: "#FCD34D" }}
            title="Yellow"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSave({ ...player, name, role, color, note })}>
          Save
        </Button>
        <Button variant="danger" onClick={() => mutation.mutate(player.id)}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
}
