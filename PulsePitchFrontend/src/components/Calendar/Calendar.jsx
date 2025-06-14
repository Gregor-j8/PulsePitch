import { useState, useRef } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useCreateTeamEvent, useGetEventsForDropdown, useTeamEvents } from "../../hooks/useEvents"
import CreateEventModal from "./CreateEventModal"

export default function MyCalendar() {
  const { data: events, isLoading, isError } = useGetEventsForDropdown()
  const { data: calendarEvents } = useTeamEvents()
  const createEvent = useCreateTeamEvent()
  const calendarRef = useRef(null)
  const [createEvents, setCreateEvents] = useState({ title: '', description: '', start: '', end: '', eventId: '' })
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleAddEvent = () => {
    const event = {
      title: createEvents.title,
      description: createEvents.description,
      start: createEvents.start,
      end: createEvents.end,
      eventId: createEvents.eventId,
      teamId: 1
    }
    createEvent.mutate(event)
    setShowCreateModal(false)
    setCreateEvents({ title: '', description: '', start: '', end: '', eventId: '' })
  }

  const handleEventClick = (info) => {
    const event = info.event
    alert(`Clicked on event: ${event.title}`)
  }

  if (isLoading || isError) return null

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
        eventClick={handleEventClick}
        selectable={true}
        editable={true}
        height="auto"
      />

      {showCreateModal && (
        <CreateEventModal
          formData={createEvents}
          setFormData={setCreateEvents}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  )
}
