import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function MyCalendar() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Initial Event",
      start: "2025-06-12T10:00:00",
      end: "2025-06-12T11:00:00",
    },
  ]);


  return (
    <div className="w-full max-w-5xl mx-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          selectable={true}
          editable={true}
          height="auto"
        />
      </div>
  );
}
