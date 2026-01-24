import { useState } from "react";
import { useTeamEvent, useEditTeamEvent, useGetEventsForDropdown } from "../../hooks/useEvents";
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea, Select } from "../ui/Input"

export default function EditEventModal({ choosenEventId, setchoosenEventId, onClose, StarterFormData }) {
  const [formData, setFormData] = useState(StarterFormData)
  const { data: eventData } = useTeamEvent(choosenEventId, { enabled: !!choosenEventId });
  const { mutate: updateTeamEvent } = useEditTeamEvent();
  const { data: events, isLoading, isError } = useGetEventsForDropdown();

  if (!eventData || isLoading || isError) return null

  const handleUpdate = () => {
    const form = {
        title: formData.title,
        description: formData.description,
        start: formData.start,
        end: formData.end,
        eventId: formData.eventId,
        teamId: formData.teamId,
    }
    updateTeamEvent({ id: choosenEventId, data: form },
        {onSuccess: () => {
          setchoosenEventId(null)}}
    )
  }

  return (
    <Modal isOpen={true} onClose={() => {setchoosenEventId(null); onClose()}} title="Edit Event" size="md">
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
            { value: "", label: "Select Event" },
            ...events.map((event) => ({ value: event.id, label: event.name }))
          ]}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={() => {setchoosenEventId(null); onClose()}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {handleUpdate(); onClose()}}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  )
}
