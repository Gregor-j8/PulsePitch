import { useState } from "react";
import { useTeamEvent, useEditTeamEvent, useGetEventsForDropdown } from "../../hooks/useEvents";

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
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
        <input placeholder="Title" value={formData.title} className="w-full border px-3 py-2 rounded"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
        <textarea placeholder="Description" value={formData.description} className="w-full border px-3 py-2 rounded mt-2"
         onChange={(e) => setFormData({ ...formData, description: e.target.value })}/>
        <input type="datetime-local" value={formData.start} className="w-full border px-3 py-2 rounded mt-2"
         onChange={(e) => setFormData({ ...formData, start: e.target.value })}/>
        <input type="datetime-local" value={formData.end} className="w-full border px-3 py-2 rounded mt-2"
         onChange={(e) => setFormData({ ...formData, end: e.target.value })}/>
        <select value={formData.eventId} className="w-full border px-3 py-2 rounded mt-2" 
        onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}>
          <option value="" disabled>Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id} className="text-black">
              {event.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => {setchoosenEventId(null); onClose()}} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={() => {handleUpdate(); onClose()}}className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
