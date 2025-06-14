import { useAuth } from "../../Context/LoggedInUserContext"
import { useTeamEvent } from "../../hooks/useEvents"
import { CalendarDays } from 'lucide-react'

export const EventDetailsModal = ({ choosenEventId, onClose }) => {
    const {data: eventData } = useTeamEvent(choosenEventId)
    const { loggedInUser } = useAuth();

    console.log(eventData)
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex text-2xl font-bold mb-6 text-gray-800"><CalendarDays/>Event Details</div>
            <div className="space-y-4 text-gray-700">
            <div className="block text-sm font-semibold text-gray-500">Title<p>{eventData.title}</p></div>
            <div className="block text-sm font-semibold text-gray-500">Description<p>{eventData.description}</p></div>
            <div className="block text-sm font-semibold text-gray-500">Start<p>{eventData.start}</p></div>
            <div className="block text-sm font-semibold text-gray-500">End<p>{eventData.end}</p></div>
            <div className="block text-sm font-semibold text-gray-500">Tvent<p>{eventData?.event.name}</p></div>
            <div className="block text-sm font-semibold text-gray-500">Team<p>{eventData?.team.name}</p></div>
        </div>
        <div className="flex justify-end mt-6">
            {/* {loggedInUser === eventData.team.coachId} */}
            <button onClick={onClose} className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded">
                Close
            </button>
        </div>
    </div>
    </div>
  )
}
