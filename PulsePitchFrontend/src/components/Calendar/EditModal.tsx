import { useState } from "react";
import { useTeamEvent, useEditTeamEvent, useGetEventsForDropdown } from "../../hooks/useEvents";
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea, Select } from "../ui/Input"

interface EditEventModalProps {
  chosenEventId: number | null;
  setChosenEventId: (id: number | null) => void;
  onClose: () => void;
  StarterFormData: any;
}

export default function EditEventModal({ chosenEventId, setChosenEventId, onClose, StarterFormData }: EditEventModalProps) {
  const [formData, setFormData] = useState(StarterFormData)
  const { data: eventData } = useTeamEvent(chosenEventId ?? undefined);
  const updateTeamEventMutation = useEditTeamEvent();
  const { mutate: updateTeamEvent } = updateTeamEventMutation;
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
    updateTeamEvent({ id: chosenEventId!, data: form },
        {onSuccess: () => {
          setChosenEventId(null)}}
    )
  }

  return (
    <Modal isOpen={true} onClose={() => {setChosenEventId(null); onClose()}} title="Edit Event" size="md">
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
            ...(events ?? []).map((event) => ({ value: event.id, label: event.name }))
          ]}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={() => {setChosenEventId(null); onClose()}} disabled={updateTeamEventMutation.isPending}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {handleUpdate(); onClose()}} loading={updateTeamEventMutation.isPending}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  )
}
