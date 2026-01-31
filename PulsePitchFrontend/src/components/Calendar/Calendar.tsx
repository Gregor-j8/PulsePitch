import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useFormik } from "formik"
import * as Yup from "yup"
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

// Yup validation schema
const eventValidationSchema = Yup.object({
  title: Yup.string().trim().required('Title is required'),
  description: Yup.string(),
  start: Yup.string().required('Start time is required'),
  end: Yup.string()
    .required('End time is required')
    .test('end-after-start', 'End time must be after start time', function(value) {
      const { start } = this.parent;
      if (!start || !value) return true;
      return new Date(value) > new Date(start);
    }),
  eventId: Yup.string().required('Event type is required'),
  teamId: Yup.string().required('Team is required'),
});

export default function MyCalendar({loggedInUser, refreshLoggedInUser}: MyCalendarProps) {
  const { data: calendarEvents } = useTeamEvents(loggedInUser.id)
  const { data: calenderGames } = useTeamGames(false, (loggedInUser as any).teams?.map((team: any) => team.teamId) ?? [])
  const createEvent = useCreateTeamEvent()
  const calendarRef = useRef<FullCalendar>(null)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [showCreateGameModal, setshowCreateGameModal] = useState<boolean>(false)
  const [DetailsModal, setDetailsModal] = useState<boolean>(false)
  const [GameDetailsModal, setGameDetailsModal] = useState<boolean>(false)
  const [EditModel, setEditModel] = useState<boolean>(false)
  const [EditGameModel, setEditGameModel] = useState<boolean>(false)
  const [chosenEventId, setChosenEventId] = useState<number | null>(null)
  const [choosenGameId, setchoosenGameId] = useState<number | null>(null)
  const [StarterFormData, SetStarterFormData] = useState<any>({})

  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      start: '',
      end: '',
      eventId: '',
      teamId: '',
    },
    validationSchema: eventValidationSchema,
    onSubmit: (values, { resetForm }) => {
      const event = {
        title: values.title,
        description: values.description,
        start: values.start,
        end: values.end,
        eventId: parseInt(values.eventId),
        teamId: parseInt(values.teamId),
      }
      createEvent.mutate(event)
      setShowCreateModal(false)
      resetForm()
    },
  })

  const handleEventClick = useCallback((info: string) => {
      setDetailsModal(true)
      setChosenEventId(parseInt(info))
  }, [])

  const handleGameClick = useCallback((info: string) => {
      setGameDetailsModal(true)
      setchoosenGameId(parseInt(info))
  }, [])

  useEffect(() => {
    console.log("Refreshing user data in Calendar component")
    const refreshUser = async () => {
    await refreshLoggedInUser();
    }
    refreshUser()
  },[])

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
        // need to fix error in the db so that I can add events to see the map
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
          formik={formik}
          onClose={() => {
            setShowCreateModal(false)
            formik.resetForm()
          }}
          loggedInUser={loggedInUser}
          isLoading={createEvent.isPending}
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
