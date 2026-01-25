import { useState } from "react"
import { useJoinTeam } from "../../hooks/useTeams"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"

export const JoinTeamModal = ({ onClose, loggedInUser }) => {
  const Navigate = useNavigate()
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const JoinTeam = useJoinTeam()

  const handleCreate = () => {
  JoinTeam.mutate(
    { TeamName: name, JoinCode: code, PlayerId: loggedInUser?.id },
    {
      onSuccess: () => {
        Navigate("/")
      },
      onError: () => {
        toast.error("Your team code or team name is incorrect please try again")
      }
    }
  )}

  return (
    <Modal isOpen={true} onClose={onClose} title="Join Team" size="md">
      <ModalBody>
        <Input
          label="Team Name"
          type="text"
          name="teamName"
          placeholder="Enter your team name"
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />
        <Input
          label="Team Code"
          type="text"
          name="teamCode"
          placeholder="Enter team code"
          onChange={(e) => setCode(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose} disabled={JoinTeam.isPending}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleCreate} loading={JoinTeam.isPending}>
          Join
        </Button>
      </ModalFooter>
    </Modal>
  )
}