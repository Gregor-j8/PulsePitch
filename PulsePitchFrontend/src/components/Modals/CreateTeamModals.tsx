import { useState } from "react"
import { useCreateTeam } from "../../hooks/useTeams"
import { useNavigate } from "react-router-dom"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { UserProfileDTO } from "../../types"

interface CreateTeamModalProps {
    loggedInUser: UserProfileDTO;
    onClose: () => void;
}

interface TeamErrors {
    name?: string;
    code?: string;
}

export const CreateTeamModal = ({ loggedInUser, onClose }: CreateTeamModalProps) => {
    const Navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [errors, setErrors] = useState<TeamErrors>({})
    const createTeam = useCreateTeam()

    const validate = (): TeamErrors => {
        const newErrors: TeamErrors = {}
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
            { name, joinCode: code, loggedInUserId: loggedInUser.id } as any,
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


