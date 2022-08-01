import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getEvents } from "../../controller/CardController";
import { useState } from "react";
import { useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
const CalendarView = (boardId) => {
    const [myEvents, setmyEvents] = useState([]);
    useEffect(() => {
        fetch_events();
    }, []);
    const fetch_events = async () => {
        let events = await getEvents(boardId);
        setmyEvents(events);
    };
    console.log(myEvents);
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={myEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default CalendarView;
