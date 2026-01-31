import { useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTeamEvents, useCreateTeamEvent } from "../../hooks/useEvents";
import { useTeamGames } from "../../hooks/UseGames";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { UserProfileDTO } from "../../types";
import CreateEventModal from "../Calendar/CreateEventModal";
import { EventDetailsModal } from "../Calendar/EventDetailsModal";
import { GameDetailsModals } from "../Calendar/GameDetailsModal";
import EditEventModal from "../Calendar/EditModal";
import { GameEditModal } from "../Calendar/GameEditModal";

interface UpcomingEventsWidgetProps {
  loggedInUser: UserProfileDTO;
  refreshLoggedInUser: () => Promise<void>;
}

interface UpcomingEvent {
  id: number;
  start: string;
  type: 'event' | 'game';
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

const getNext7Days = () => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
};

const isSameDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

export const UpcomingEventsWidget = ({ loggedInUser }: UpcomingEventsWidgetProps) => {
  const { data: events, isLoading: eventsLoading } = useTeamEvents(loggedInUser.id);
  const teamIds = (loggedInUser as any).teams?.map((team: any) => team.teamId) ?? [];
  const { data: games, isLoading: gamesLoading } = useTeamGames(false, teamIds);
  const createEvent = useCreateTeamEvent();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [editEventModel, setEditEventModel] = useState(false);
  const [editGameModel, setEditGameModel] = useState(false);
  const [starterFormData, setStarterFormData] = useState<any>({});

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
      };
      createEvent.mutate(event);
      setShowCreateModal(false);
      resetForm();
    },
  });

  const allEvents = useMemo(() => [
    ...(events ?? []).map(event => ({ ...event, type: 'event' as const })),
    ...(games ?? []).map(game => ({ ...game, type: 'game' as const }))
  ], [events, games]);

  const next7Days = useMemo(() => getNext7Days(), []);

  const eventsByDay = useMemo(() => {
    return next7Days.map(day => {
      const dayEvents = allEvents.filter(event => {
        const eventDate = new Date(event.start);
        return isSameDay(eventDate, day);
      });
      return { day, events: dayEvents };
    });
  }, [next7Days, allEvents]);

  const handleEventClick = (event: UpcomingEvent) => {
    if (event.type === 'event') {
      setSelectedEventId(event.id);
    } else {
      setSelectedGameId(event.id);
    }
  };

  const isLoading = eventsLoading || gamesLoading;

  if (isLoading) {
    return (
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-center py-8">
          <div className="text-neutral-500 text-sm">Loading...</div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-6 bg-white">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-neutral-900">This Week</h2>
          {loggedInUser.roles.includes("Coach") && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowCreateModal(true)}
            >
              New Event
            </Button>
          )}
        </div>

        {/* 7-Day Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          {eventsByDay.map(({ day, events: dayEvents }, index) => {
            const isToday = isSameDay(day, new Date());
            const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNumber = day.getDate();

            return (
              <div
                key={index}
                className={`rounded-lg border p-3 min-h-[100px] transition-colors ${
                  isToday
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div className="mb-2 text-center">
                  <div className={`text-xs font-medium uppercase tracking-wide ${
                    isToday ? 'text-blue-600' : 'text-neutral-500'
                  }`}>
                    {dayName}
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${
                    isToday ? 'text-blue-700' : 'text-neutral-900'
                  }`}>
                    {dayNumber}
                  </div>
                </div>

                <div className="space-y-1">
                  {dayEvents.length > 0 ? (
                    dayEvents.map((event: UpcomingEvent) => (
                      <button
                        key={`${event.type}-${event.id}`}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs font-medium transition-opacity hover:opacity-70 ${
                          event.type === 'game'
                            ? 'bg-green-500 text-white'
                            : 'bg-blue-500 text-white'
                        }`}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="truncate">
                          {new Date(event.start).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="flex items-center justify-center py-2">
                      <div className="w-1 h-1 rounded-full bg-neutral-300"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {showCreateModal && (
        <CreateEventModal
          formik={formik}
          onClose={() => setShowCreateModal(false)}
          loggedInUser={loggedInUser}
          isLoading={createEvent.isPending}
        />
      )}

      {selectedEventId && (
        <EventDetailsModal
          loggedInUser={loggedInUser}
          chosenEventId={selectedEventId}
          setChosenEventId={setSelectedEventId}
          onClose={() => setSelectedEventId(null)}
          setEditModel={setEditEventModel}
          SetStarterFormData={setStarterFormData}
        />
      )}

      {selectedGameId && (
        <GameDetailsModals
          loggedInUser={loggedInUser}
          choosenGameId={selectedGameId}
          setchoosenGameId={setSelectedGameId}
          onClose={() => setSelectedGameId(null)}
          setEditGameModel={setEditGameModel}
          SetStarterFormData={setStarterFormData}
        />
      )}

      {editEventModel && (
        <EditEventModal
          chosenEventId={selectedEventId}
          setChosenEventId={setSelectedEventId}
          onClose={() => setEditEventModel(false)}
          StarterFormData={starterFormData}
        />
      )}

      {editGameModel && (
        <GameEditModal
          choosenGameId={selectedGameId}
          setChosenGameId={setSelectedGameId}
          onClose={() => setEditGameModel(false)}
          StarterFormData={starterFormData}
        />
      )}
    </>
  );
};
