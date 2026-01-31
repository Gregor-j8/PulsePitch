import { useState, useRef, useEffect, useMemo, useCallback } from "react"
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
import { Button } from "../ui/Button"
import { EmptyState } from "../ui"
import { Calendar as CalendarIcon } from "lucide-react"
import { UserProfileDTO } from "../../types"

interface MyCalendarProps {
  loggedInUser: UserProfileDTO;
  refreshLoggedInUser: () => Promise<void>;
}

interface CreateEventData {
  title: string;
  description: string;
  start: string;
  end: string;
  eventId: string;
  teamId: string;
}

interface EventErrors {
  title?: string;
  description?: string;
  start?: string;
  end?: string;
  eventId?: string;
  teamId?: string;
}

export default function MyCalendar({loggedInUser, refreshLoggedInUser}: MyCalendarProps) {
  const { data: calendarEvents } = useTeamEvents(loggedInUser.id)
  const { data: calenderGames } = useTeamGames(false, (loggedInUser as any).teams?.map((team: any) => team.teamId) ?? [])
  const createEvent = useCreateTeamEvent()
  const calendarRef = useRef<FullCalendar>(null)
  const [createEvents, setCreateEvents] = useState<CreateEventData>({ title: '', description: '', start: '', end: '', eventId: '', teamId: '' })
  const [eventErrors, setEventErrors] = useState<EventErrors>({})
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [showCreateGameModal, setshowCreateGameModal] = useState<boolean>(false)
  const [DetailsModal, setDetailsModal] = useState<boolean>(false)
  const [GameDetailsModal, setGameDetailsModal] = useState<boolean>(false)
  const [EditModel, setEditModel] = useState<boolean>(false)
  const [EditGameModel, setEditGameModel] = useState<boolean>(false)
  const [chosenEventId, setChosenEventId] = useState<number | null>(null)
  const [choosenGameId, setchoosenGameId] = useState<number | null>(null)
  const [StarterFormData, SetStarterFormData] = useState<any>({})

  const validateEvent = (): EventErrors => {
    const errors: EventErrors = {}
    if (!createEvents.title.trim()) {
      errors.title = 'Title is required'
    }
    if (!createEvents.start) {
      errors.start = 'Start time is required'
    }
    if (!createEvents.end) {
      errors.end = 'End time is required'
    } else if (createEvents.start && new Date(createEvents.end) <= new Date(createEvents.start)) {
      errors.end = 'End time must be after start time'
    }
    if (!createEvents.eventId) {
      errors.eventId = 'Event type is required'
    }
    if (!createEvents.teamId) {
      errors.teamId = 'Team is required'
    }
    return errors
  }

  const handleAddEvent = useCallback(() => {
    const errors = validateEvent()
    if (Object.keys(errors).length > 0) {
      setEventErrors(errors)
      return
    }
    setEventErrors({})
    const event = { title: createEvents.title, description: createEvents.description,
      start: createEvents.start, end: createEvents.end, eventId: parseInt(createEvents.eventId), teamId: parseInt(createEvents.teamId)}
    createEvent.mutate(event)
    setShowCreateModal(false)
    setCreateEvents({ title: '', description: '', start: '', end: '', eventId: '', teamId: '' })
  }, [createEvents, createEvent, validateEvent])

  const handleEventClick = useCallback((info: string) => {
      setDetailsModal(true)
      setChosenEventId(parseInt(info))
  }, [])

  const handleGameClick = useCallback((info: string) => {
      setGameDetailsModal(true)
      setchoosenGameId(parseInt(info))
  }, [])

  useEffect(() => {
    const refreshUser = async () => {
    await refreshLoggedInUser();
    }
    refreshUser()
  },[refreshLoggedInUser])

  const hasEvents = (calendarEvents && calendarEvents.length > 0) || (calenderGames && calenderGames.length > 0);

  const formattedEvents = useMemo(() => [
    ...(calenderGames ?? []).map(game => ({
      id: game.id.toString(),
      title: `${game.homeTeam?.name} vs ${game.awayTeam?.name}`,
      start: game.start,
      end: game.end,
      color: 'green',
      extendedProps: { type: 'game' }
    })),
    ...(calendarEvents ?? []).map(event => ({
      id: event.id.toString(),
      title: event.title,
      start: event.start,
      end: event.end,
      color: 'blue',
      extendedProps: { type: 'calendarEvent' }
    })),
  ], [calenderGames, calendarEvents]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <Button variant="success" size="sm" onClick={() => setShowCreateModal(true)}>
          Create Event
        </Button>
      </div>
      {!hasEvents ? (
        <EmptyState
          icon={CalendarIcon}
          title="No Events or Games Scheduled"
          description="Get started by creating your first event or scheduling a game with another team."
          actionLabel="Create Event"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
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
        events={formattedEvents}
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
      )}
      {showCreateModal  && (
        <CreateEventModal
          formData={createEvents}
          setFormData={setCreateEvents}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleAddEvent}
          loggedInUser={loggedInUser}
          isLoading={createEvent.isPending}
          errors={eventErrors}
        />
      )}
      {DetailsModal && (
        <EventDetailsModal
          loggedInUser={loggedInUser}
          chosenEventId={chosenEventId}
          setChosenEventId={setChosenEventId}
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
          chosenEventId={chosenEventId}
          setChosenEventId={setChosenEventId}
          onClose={() => setEditModel(false)}
        />
      )}
      {EditGameModel && (
        <GameEditModal
          StarterFormData={StarterFormData}
          choosenGameId={choosenGameId}
          setChosenGameId={setchoosenGameId}
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
