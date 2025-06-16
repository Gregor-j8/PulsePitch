import { useState, useRef } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useCreateTeamEvent, useTeamEvents } from "../../hooks/useEvents"
import CreateEventModal from "./CreateEventModal"
import { EventDetailsModal } from "./EventDetailsModal"
import EditEventModal from "./EditModal"

export default function MyCalendar({loggedInUser}) {

  const { data: calendarEvents } = useTeamEvents(1)
  console.log("calendarEvents", calendarEvents)
  const createEvent = useCreateTeamEvent()
  const calendarRef = useRef(null)
  const [createEvents, setCreateEvents] = useState({ title: '', description: '', start: '', end: '', eventId: '' })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [DetailsModal, setDetailsModal] = useState(false)
  const [EditModel, setEditModel] = useState(false)
  const [choosenEventId, setchoosenEventId] = useState(null)
  const [StarterFormData, SetStarterFormData] = useState({})

  const handleAddEvent = () => {
    const event = { title: createEvents.title, description: createEvents.description, 
      start: createEvents.start, end: createEvents.end, eventId: createEvents.eventId, teamId: 1}
    createEvent.mutate(event)
    setShowCreateModal(false)
    setCreateEvents({ title: '', description: '', start: '', end: '', eventId: '' })
  }
  const handleEventClick = (info) => {
      setDetailsModal(true)
      setchoosenEventId(info)
  }
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <button onClick={() => setShowCreateModal(true)} className="bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600">
          Create Event
        </button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        customButtons={{
          createEvent: {
            text: 'Create Event',
            click: () => setShowCreateModal(true),
          },
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'createEvent',
        }}
        events={calendarEvents}
        eventClick={(e) => handleEventClick(e.event._def.publicId)}
        selectable={true}
        editable={true}
        height="auto"
      />

      {showCreateModal  && (
        <CreateEventModal
          formData={createEvents}
          setFormData={setCreateEvents}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleAddEvent}
        />
      )}
      {DetailsModal && (
        <EventDetailsModal 
          loggedInUser={loggedInUser}
          choosenEventId={choosenEventId}
          setchoosenEventId={setchoosenEventId}
          onClose={() => setDetailsModal(false)}
          setEditModel={setEditModel}
          SetStarterFormData={SetStarterFormData}
        />
      )}
      {EditModel && (
        <EditEventModal
          StarterFormData={StarterFormData}
          choosenEventId={choosenEventId}
          setchoosenEventId={setchoosenEventId}
          onClose={() => setEditModel(false)}
        />
      )}
    </div>
  )
}
