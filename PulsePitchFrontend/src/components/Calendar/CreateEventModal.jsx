import { useGetEventsForDropdown } from "../../hooks/useEvents"
import { useTeams } from "../../hooks/useTeams"

export default function CreateEventModal({ formData, setFormData, onClose, onSubmit, loggedInUser }) {
      const { data: events, isLoading, isError } = useGetEventsForDropdown()
      const { data: team } = useTeams()
      console.log(formData)
    if (isError || isLoading ){
        return null
    }
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>
        <input placeholder="Title" value={formData.title} className="w-full border px-3 py-2 rounded" onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
        <textarea placeholder="Description" value={formData.description} className="w-full border px-3 py-2 rounded mt-2"
         onChange={(e) => setFormData({ ...formData, description: e.target.value })}/>
        <span className="block mt-1 text-sm font-semibold text-gray-700">start time</span>
        <input type="datetime-local" value={formData.start} className="w-full border px-3 py-2 rounded mt-2"
         onChange={(e) => setFormData({ ...formData, start: e.target.value })}/>
         <span className="block mt-1 text-sm font-semibold text-gray-700">end time</span>
        <input type="datetime-local" value={formData.end} className="w-full border px-3 py-2 rounded mt-2"
          onChange={(e) => setFormData({ ...formData, end: e.target.value })}/>
        <select value={formData.eventId} onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
             className="w-full border px-3 py-2 rounded mt-2">
          <option value="" disabled>Select event</option>
          {events.map(e => (
            <option key={e.id} value={e.id} className="text-black">
              {e.name}
            </option>
          ))}
        </select>
        <select value={formData.teamId} onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
             className="w-full border px-3 py-2 rounded mt-2">
          <option value="" disabled>Select Team</option>
          {loggedInUser.teams.map(e => (
            <option key={e.id} value={e.id} className="text-black">
              {team?.find(t => t.id == e.id)?.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button type="button" onClick={onSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Add Event
          </button>
        </div>
      </div>
    </div>
  )
}
