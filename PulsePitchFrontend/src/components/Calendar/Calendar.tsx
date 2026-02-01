import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useCreateTeamEvent, useTeamEvents } from "../../hooks/useEvents"
import { useTeams } from "../../hooks/useTeams"
import CreateEventModal from "./CreateEventModal"
import { EventDetailsModal } from "./EventDetailsModal"
import EditEventModal from "./EditModal"
import { CreateGameModal } from "./CreateGameModal"
import { GameDetailsModals } from "./GameDetailsModal"
import { useTeamGames } from "../../hooks/UseGames"
import { GameEditModal } from "./GameEditModal"
import { Button } from "../ui/Button"
import { EmptyState } from "../ui"
import { Calendar as CalendarIcon, Filter } from "lucide-react"
import { UserProfileDTO } from "../../types"

interface MyCalendarProps {
  loggedInUser: UserProfileDTO;
  refreshLoggedInUser: () => Promise<void>;
}

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
  const { data: allTeams } = useTeams()
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
  const [currentView, setCurrentView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth')
  const [selectedTeams, setSelectedTeams] = useState<Set<number>>(new Set())
  const [showEventTypes, setShowEventTypes] = useState<{events: boolean, games: boolean}>({events: true, games: true})
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false)

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

  const userTeams = useMemo(() => {
    return (loggedInUser as any).teams?.map((team: any) => {
      const teamData = allTeams?.find((t: any) => t.id === parseInt(team.teamId));
      return {
        id: parseInt(team.teamId),
        name: teamData?.name || 'Unknown Team'
      };
    }) ?? [];
  }, [loggedInUser, allTeams]);

  const formattedEvents = useMemo(() => {
    const gameEvents = (calenderGames ?? [])
      .filter(game => {
        if (!showEventTypes.games) return false;
        if (selectedTeams.size === 0) return true;
        const homeId = game.homeTeamId;
        const awayId = game.awayTeamId;
        return (homeId !== undefined && selectedTeams.has(homeId)) || (awayId !== undefined && selectedTeams.has(awayId));
      })
      .map(game => ({
        id: game.id.toString(),
        title: `${game.homeTeam?.name} vs ${game.awayTeam?.name}`,
        start: game.start,
        end: game.end,
        color: '#10b981',
        extendedProps: { type: 'game' }
      }));

    const calEvents = (calendarEvents ?? [])
      .filter(event => {
        if (!showEventTypes.events) return false;
        if (selectedTeams.size === 0) return true;
        return event.teamId !== undefined && selectedTeams.has(event.teamId);
      })
      .map(event => ({
        id: event.id.toString(),
        title: event.title,
        start: event.start,
        end: event.end,
        color: '#3b82f6',
        extendedProps: { type: 'calendarEvent' }
      }));

    return [...gameEvents, ...calEvents];
  }, [calenderGames, calendarEvents, selectedTeams, showEventTypes]);

  const toggleTeamFilter = (teamId: number) => {
    setSelectedTeams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(teamId)) {
        newSet.delete(teamId);
      } else {
        newSet.add(teamId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 overflow-x-hidden">
      <div className="mb-4 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-neutral-900">Calendar</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden px-3 py-2 rounded-md border border-neutral-300 hover:bg-neutral-50 transition-colors"
            >
              <Filter className="w-4 h-4 text-neutral-600" />
            </button>
            <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
              Create Event
            </Button>
            <Button variant="success" size="sm" onClick={() => setshowCreateGameModal(true)}>
              Create Game
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex gap-1 bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => {
                setCurrentView('dayGridMonth');
                calendarRef.current?.getApi().changeView('dayGridMonth');
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'dayGridMonth'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => {
                setCurrentView('timeGridWeek');
                calendarRef.current?.getApi().changeView('timeGridWeek');
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'timeGridWeek'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => {
                setCurrentView('timeGridDay');
                calendarRef.current?.getApi().changeView('timeGridDay');
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'timeGridDay'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Day
            </button>
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#10b981]" />
              <span className="text-neutral-600">Games</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#3b82f6]" />
              <span className="text-neutral-600">Events</span>
            </div>
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <div className="lg:hidden mb-4 bg-white rounded-lg border border-neutral-200 p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Filter by Type</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEventTypes.events}
                  onChange={(e) => setShowEventTypes(prev => ({...prev, events: e.target.checked}))}
                  className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-neutral-700">Events</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEventTypes.games}
                  onChange={(e) => setShowEventTypes(prev => ({...prev, games: e.target.checked}))}
                  className="rounded border-neutral-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-neutral-700">Games</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Filter by Team</h3>
            <div className="space-y-2">
              {userTeams.map((team: any) => (
                <label key={team.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTeams.has(team.id)}
                    onChange={() => toggleTeamFilter(team.id)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-neutral-700">{team.name}</span>
                </label>
              ))}
              {userTeams.length === 0 && (
                <p className="text-sm text-neutral-500">No teams available</p>
              )}
            </div>
          </div>
        </div>
      )}

      {!hasEvents ? (
        <EmptyState
          icon={CalendarIcon}
          title="No Events or Games Scheduled"
          description="Get started by creating your first event or scheduling a game with another team."
          actionLabel="Create Event"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block w-64 space-y-4 flex-shrink-0">
            <div className="bg-white rounded-lg border border-neutral-200 p-4">
              <h3 className="font-semibold text-neutral-900 mb-3">Filter by Type</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showEventTypes.events}
                    onChange={(e) => setShowEventTypes(prev => ({...prev, events: e.target.checked}))}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-neutral-700">Events</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showEventTypes.games}
                    onChange={(e) => setShowEventTypes(prev => ({...prev, games: e.target.checked}))}
                    className="rounded border-neutral-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-neutral-700">Games</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-4">
              <h3 className="font-semibold text-neutral-900 mb-3">Filter by Team</h3>
              <div className="space-y-2">
                {userTeams.map((team: any) => (
                  <label key={team.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTeams.has(team.id)}
                      onChange={() => toggleTeamFilter(team.id)}
                      className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-neutral-700">{team.name}</span>
                  </label>
                ))}
                {userTeams.length === 0 && (
                  <p className="text-sm text-neutral-500">No teams available</p>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1 bg-white rounded-lg border border-neutral-200 p-4 overflow-hidden">
            <style>{`
              .fc {
                font-family: inherit;
              }
              .fc .fc-button-primary {
                background-color: #3b82f6;
                border-color: #3b82f6;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-weight: 500;
              }
              .fc .fc-button-primary:hover {
                background-color: #2563eb;
                border-color: #2563eb;
              }
              .fc .fc-button-primary:disabled {
                background-color: #93c5fd;
                border-color: #93c5fd;
              }
              .fc .fc-toolbar-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: #171717;
              }
              .fc .fc-col-header-cell {
                background-color: #f5f5f5;
                font-weight: 600;
                text-transform: uppercase;
                font-size: 0.75rem;
                padding: 0.75rem 0.5rem;
                color: #525252;
              }
              .fc .fc-daygrid-day-number {
                padding: 0.5rem;
                font-weight: 500;
                color: #171717;
              }
              .fc .fc-daygrid-day.fc-day-today {
                background-color: #eff6ff !important;
              }
              .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
                color: #2563eb;
                font-weight: 700;
              }
              .fc-event {
                border-radius: 0.375rem;
                border: none;
                padding: 0.25rem 0.5rem;
                font-size: 0.875rem;
                cursor: pointer;
                transition: opacity 0.2s;
              }
              .fc-event:hover {
                opacity: 0.8;
              }
              .fc-event-title {
                font-weight: 500;
              }
              .fc-daygrid-event-dot {
                display: none;
              }
              .fc .fc-timegrid-slot {
                height: 3rem;
              }
              .fc .fc-timegrid-event {
                border-radius: 0.375rem;
                border-left-width: 3px;
              }
            `}</style>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={currentView}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: '',
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
              select={(info) => {
                formik.setValues({
                  ...formik.values,
                  start: info.startStr,
                  end: info.endStr,
                });
                setShowCreateModal(true);
              }}
              selectable={true}
              editable={false}
              height="auto"
              dayMaxEvents={3}
              moreLinkText="more"
            />
          </div>
        </div>
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
