import { useDeleteTeamEvent, useTeamEvent } from "../../hooks/useEvents"
import { CalendarDays } from 'lucide-react'

export const EventDetailsModal = ({ loggedInUser, choosenEventId, setchoosenEventId, onClose, setEditModel, SetStarterFormData }) => {
    const {data: eventData } = useTeamEvent(choosenEventId, {enabled: !!choosenEventId})
    const {mutate: deleteTeamEvent} = useDeleteTeamEvent()
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex text-2xl font-bold mb-6 text-gray-800"><CalendarDays/>Event Details</div>
            <div className="space-y-4 text-gray-700">
            <div className="block text-sm font-semibold text-gray-500">Title<p>{eventData.title}</p></div>
            <div className="block text-sm font-semibold text-gray-500">Description<p>{eventData.description}</p></div>
            <div className="block text-sm font-semibold text-gray-500">Start<p>{eventData.start}</p></div>
            <div className="block text-sm font-semibold text-gray-500">End<p>{eventData.end}</p></div>
            <div className="block text-sm font-semibold text-gray-500">Event<p>{eventData?.event.name}</p></div>
            <div className="block text-sm font-semibold text-gray-500">Team<p>{eventData?.team.name}</p></div>
        </div>
        <div className="flex justify-between mt-6">
            <div>
            {loggedInUser.roles.includes("Coach") && (
                <div className="flex gap-2">
                <button className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded" onClick={() => {
                    setEditModel(true)
                    SetStarterFormData(eventData)
                    onClose()
                }}>
                    Edit
                </button>
                <button className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded" onClick={() => {
                    deleteTeamEvent(eventData.id)
                    setchoosenEventId(null)
                    onClose()
                }}>Delete
                </button>
                </div>
            )}
            </div>
            <button onClick={onClose} className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded">Close</button>
        </div>
    </div>
    </div>
  )
}
