import { useGetEventsForDropdown } from "../../hooks/useEvents"
import { useTeams } from "../../hooks/useTeams"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea, Select } from "../ui/Input"

export default function CreateEventModal({ formData, setFormData, onClose, onSubmit, loggedInUser }) {
      const { data: events, isLoading, isError } = useGetEventsForDropdown()
      const { data: team } = useTeams()
    if (isError || isLoading ){
        return null
    }
  return (
    <Modal isOpen={true} onClose={onClose} title="Create Event" size="md">
      <ModalBody>
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mb-2"
        />
        <Textarea
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
          value={formData.eventId}
          onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
          options={[
            { value: "", label: "Select event" },
            ...events.map(e => ({ value: e.id, label: e.name }))
          ]}
          className="mb-2"
        />
        <Select
          value={formData.teamId}
          onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
          options={[
            { value: "", label: "Select Team" },
            ...loggedInUser.teams.map(e => ({
              value: e.id,
              label: team?.find(t => t.id == e.id)?.name
            }))
          ]}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={onSubmit}>
          Add Event
        </Button>
      </ModalFooter>
    </Modal>
  )
}
