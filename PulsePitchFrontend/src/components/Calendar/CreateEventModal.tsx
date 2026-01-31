import { useGetEventsForDropdown } from "../../hooks/useEvents"
import { useTeams } from "../../hooks/useTeams"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea, Select } from "../ui/Input"
import { UserProfileDTO } from "../../types"

interface CreateEventModalProps {
  formData: {
    title: string;
    description: string;
    start: string;
    end: string;
    eventId: string;
    teamId: string;
  };
  setFormData: (data: any) => void;
  onClose: () => void;
  onSubmit: () => void;
  loggedInUser: UserProfileDTO;
  isLoading?: boolean;
  errors?: {
    title?: string;
    description?: string;
    start?: string;
    end?: string;
    eventId?: string;
    teamId?: string;
  };
}

export default function CreateEventModal({ formData, setFormData, onClose, onSubmit, loggedInUser, isLoading: isSubmitting = false, errors = {} }: CreateEventModalProps) {
      const { data: events, isLoading, isError } = useGetEventsForDropdown()
      const { data: team } = useTeams()
    if (isError || isLoading ){
        return null
    }
  return (
    <Modal isOpen={true} onClose={onClose} title="Create Event" size="md">
      <ModalBody>
        <Input
          label="Title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          className="mb-2"
        />
        <Textarea
          label="Description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mb-2"
        />
        <Input
          label="Start Time"
          type="datetime-local"
          value={formData.start}
          onChange={(e) => setFormData({ ...formData, start: e.target.value })}
          error={errors.start}
          className="mb-2"
        />
        <Input
          label="End Time"
          type="datetime-local"
          value={formData.end}
          onChange={(e) => setFormData({ ...formData, end: e.target.value })}
          error={errors.end}
          className="mb-2"
        />
        <Select
          label="Event Type"
          value={formData.eventId}
          onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
          options={[
            { value: "", label: "Select event" },
            ...(events ?? []).map(e => ({ value: e.id, label: e.name }))
          ]}
          error={errors.eventId}
          className="mb-2"
        />
        <Select
          label="Team"
          value={formData.teamId}
          onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
          options={[
            { value: "", label: "Select Team" },
            ...(loggedInUser as any).teams?.map((e: any) => ({
              value: e.id,
              label: team?.find(t => t.id == e.id)?.name
            })) ?? []
          ]}
          error={errors.teamId}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="success" onClick={onSubmit} loading={isSubmitting}>
          Add Event
        </Button>
      </ModalFooter>
    </Modal>
  )
}
