// @ts-nocheck
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
    const [errors, setErrors] = useState({})
    const createTeam = useCreateTeam()

    const validate = () => {
        const newErrors = {}
        if (!name.trim()) {
            newErrors.name = 'Team name is required'
        } else if (name.trim().length < 3) {
            newErrors.name = 'Team name must be at least 3 characters'
        }
        if (!code.trim()) {
            newErrors.code = 'Team code is required'
        } else if (code.trim().length < 4) {
            newErrors.code = 'Team code must be at least 4 characters'
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    className="mb-4"
                />
                <Input
                    label="Team Code"
                    type="text"
                    name="teamCode"
                    placeholder="Create a unique team code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    error={errors.code}
                />
            </ModalBody>
            <ModalFooter>
                <Button variant="ghost" onClick={onClose} disabled={createTeam.isPending}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleCreate} loading={createTeam.isPending}>
                    Create
                </Button>
            </ModalFooter>
        </Modal>
    )
}


