/**
 * Filters events/games that occur within the next 7 days
 * @param events - Array of events or games with start dates
 * @returns Filtered and sorted array containing only upcoming events
 */
export const filterNextWeekEvents = <T extends { start: string }>(
  events: T[]
): T[] => {
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return events
    .filter(event => {
      const eventStart = new Date(event.start);
      return eventStart >= now && eventStart <= nextWeek;
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
};
