import { useState } from "react"
import { useCreateTeam } from "../../hooks/useTeams"
import { useNavigate } from "react-router-dom"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"

export const CreateTeamModal = ({ loggedInUser, onClose }) => {
    const Navigate = useNavigate()
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const createTeam = useCreateTeam()

    const handleCreate = () => {
  createTeam.mutate(
    { name, joincode: code, loggedInUserId: loggedInUser.id },
    {
      onSuccess: () => {
        Navigate("/")
    },
    })}

    return (
        <Modal isOpen={true} onClose={onClose} title="Create Team" size="md">
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
                    placeholder="Create a unique team code"
                    onChange={(e) => setCode(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleCreate}>
                    Create
                </Button>
            </ModalFooter>
        </Modal>
    )
}


