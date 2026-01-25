import { useDeleteTeamEvent, useTeamEvent } from "../../hooks/useEvents"
import { CalendarDays } from 'lucide-react'
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"

export const EventDetailsModal = ({ loggedInUser, chosenEventId, setChosenEventId, onClose, setEditModel, SetStarterFormData }) => {
    const {data: eventData } = useTeamEvent(chosenEventId, {enabled: !!chosenEventId})
    const {mutate: deleteTeamEvent} = useDeleteTeamEvent()
  return (
    <Modal isOpen={true} onClose={onClose} title={<div className="flex items-center gap-2"><CalendarDays/>Event Details</div>} size="md">
      <ModalBody>
        <div className="space-y-4 text-neutral-700">
          <div className="block text-sm font-semibold text-neutral-500">Title<p>{eventData.title}</p></div>
          <div className="block text-sm font-semibold text-neutral-500">Description<p>{eventData.description}</p></div>
          <div className="block text-sm font-semibold text-neutral-500">Start<p>{eventData.start}</p></div>
          <div className="block text-sm font-semibold text-neutral-500">End<p>{eventData.end}</p></div>
          <div className="block text-sm font-semibold text-neutral-500">Event<p>{eventData?.event.name}</p></div>
          <div className="block text-sm font-semibold text-neutral-500">Team<p>{eventData?.team.name}</p></div>
        </div>
      </ModalBody>
      <ModalFooter className="justify-between">
        <div>
          {loggedInUser.roles.includes("Coach") && (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => {
                setEditModel(true)
                SetStarterFormData(eventData)
                onClose()
              }}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => {
                deleteTeamEvent(eventData.id)
                setChosenEventId(null)
                onClose()
              }}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}
