import { useState, useRef, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useCreateTeamEvent, useTeamEvents } from "../../hooks/useEvents"
import CreateEventModal from "./CreateEventModal"
import { EventDetailsModal } from "./EventDetailsModal"
import EditEventModal from "./EditModal"
import { CreateGameModal } from "./CreateGameModal"
import { GameDetailsModals } from "./GameDetailsModal"
import { useTeamGames } from "../../hooks/UseGames"
import { GameEditModal } from "./GameEditModal"

export default function MyCalendar({loggedInUser, refreshLoggedInUser}) {
  const { data: calendarEvents } = useTeamEvents(loggedInUser.id, {enabled: !!loggedInUser.id})
  const { data: calenderGames } = useTeamGames('', loggedInUser.teams.map(team => team.teamId))
  const createEvent = useCreateTeamEvent()
  const calendarRef = useRef(null)
  const [createEvents, setCreateEvents] = useState({ title: '', description: '', start: '', end: '', eventId: '' })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showCreateGameModal, setshowCreateGameModal] = useState(false)
  const [DetailsModal, setDetailsModal] = useState(false)
  const [GameDetailsModal, setGameDetailsModal] = useState(false)
  const [EditModel, setEditModel] = useState(false)
  const [EditGameModel, setEditGameModel] = useState(false)
  const [choosenEventId, setchoosenEventId] = useState(null)
  const [choosenGameId, setchoosenGameId] = useState(null)
  const [StarterFormData, SetStarterFormData] = useState({})
  const handleAddEvent = () => {
    const event = { title: createEvents.title, description: createEvents.description, 
      start: createEvents.start, end: createEvents.end, eventId: createEvents.eventId, teamId: calendarEvents.teamId}
    createEvent.mutate(event)
    setShowCreateModal(false)
    setCreateEvents({ title: '', description: '', start: '', end: '', eventId: '' })
  }
  const handleEventClick = (info) => {
      setDetailsModal(true)
      setchoosenEventId(info)
  }
  const handleGameClick = (info) => {
      setGameDetailsModal(true)
      setchoosenGameId(info)
  }

  useEffect(() => {
    const refreshUser = async () => {
    await refreshLoggedInUser();
    }
    refreshUser()
  },[])
console.log(calenderGames)
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
          createGame: {
            text: 'Create Game',
            click: () => setshowCreateGameModal(true),
          }
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'createEvent createGame', 
        }}
        events={[  
            ...(calenderGames ?? []).map(game => ({
            id: game.id,
            title: `${game.homeTeam?.name} vs ${game.awayTeam?.name}`,
            start: game.start,
            end: game.end,
            color: 'green',
            type: 'game'
          })),
          ...(calendarEvents ?? []).map(event => ({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            color: 'blue',
            type: 'calendarEvent'
          })),
        ]}
        eventDisplay="block"
        eventClick={(e) => {
          const event = e.event;
          const type = event.extendedProps.type;
          if (type === 'game') {
            handleGameClick(event._def.publicId);
          } else {
            handleEventClick(event._def.publicId);
          }
        }}
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
      {GameDetailsModal && (
        <GameDetailsModals
          loggedInUser={loggedInUser}
          choosenGameId={choosenGameId}
          setchoosenGameId={setchoosenGameId}
          onClose={() => setGameDetailsModal(false)}
          setEditGameModel={setEditGameModel}
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
      {EditGameModel && (
        <GameEditModal
          StarterFormData={StarterFormData}
          choosenGameId={choosenGameId}
          setchoosenGameId={setchoosenGameId}
          onClose={() => setEditGameModel(false)}
        />
      )}
      {showCreateGameModal  && (
        <CreateGameModal
          loggedInUser={loggedInUser}
          onClose={() => setshowCreateGameModal(false)}
        />
      )}
    </div>
  )
}
