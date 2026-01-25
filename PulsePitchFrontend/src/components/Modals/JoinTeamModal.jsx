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
  const [errors, setErrors] = useState({})
  const JoinTeam = useJoinTeam()

  const validate = () => {
    const newErrors = {}
    if (!name.trim()) {
      newErrors.name = 'Team name is required'
    }
    if (!code.trim()) {
      newErrors.code = 'Team code is required'
    }
    return newErrors
  }

  const handleCreate = () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          className="mb-4"
        />
        <Input
          label="Team Code"
          type="text"
          name="teamCode"
          placeholder="Enter team code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={errors.code}
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