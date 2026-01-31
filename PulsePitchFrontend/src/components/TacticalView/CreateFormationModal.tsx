import { useState } from "react";
import { useCreateFormations } from "../../hooks/useFormation"
import { useTeams } from "../../hooks/useTeams";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input, Select } from "../ui/Input"
import { UserProfileDTO } from "../../types/dtos"

interface CreateFormationModalProps {
  loggedInUser: UserProfileDTO;
  setCreateFormationModal: (value: boolean) => void;
  setFormationModal: (value: boolean) => void;
  setFormationId: (value: number | null) => void;
}

export const CreateFormationModal = ({ loggedInUser, setCreateFormationModal, setFormationModal, setFormationId}: CreateFormationModalProps) => {
  const {mutate} = useCreateFormations()
  const { data: teamNames } = useTeams()
  const [formation, setFormation] = useState<{ description: string; name: string; teamId: string }>({ description: "", name: "", teamId: "" });
  const handleSubmit = () => {
    if (!formation.description && !formation.name && formation.teamId !== "0") return toast.error("no valid entries")
    const teamsId = teamNames?.find(team => team.id == parseInt(formation.teamId))
    if (teamsId?.coachId !== loggedInUser.identityUserId) return toast.error("You are not the coach of this team")
    mutate({ ...formation, teamId: parseInt(formation.teamId) } as any, {
        onSuccess: (newFormation: any) => {
        setFormationId(newFormation.id)
        setFormation({ description: "", name: "", teamId: "" })
        setCreateFormationModal(false)
    }})
  }
  return (
    <Modal isOpen={true} onClose={() => {setCreateFormationModal(false); setFormationModal(true)}} title="Create New Formation" size="md">
      <ModalBody>
        <Input
          label="Description"
          value={formation.description}
          onChange={(e) => setFormation({ ...formation, description: e.target.value })}
          className="mb-2"
        />
        <Input
          label="Formation Name"
          value={formation.name}
          onChange={(e) => setFormation({ ...formation, name: e.target.value })}
          className="mb-2"
        />
        <Select
          value={formation.teamId}
          onChange={(e) => setFormation({ ...formation, teamId: e.target.value })}
          options={[
            { value: "", label: "Choose a team" },
            ...(loggedInUser as any).teams?.map((team: any) => ({
              value: team.teamId,
              label: teamNames?.find(t => t.id === team.teamId)?.name ?? "Unknown Team"
            })) ?? []
          ]}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={() => {setCreateFormationModal(false); setFormationModal(true)}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}