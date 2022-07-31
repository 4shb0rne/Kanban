import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getEvents } from "../../controller/CardController";
const localizer = momentLocalizer(moment);
const CalendarView = async (boardId) => {
  const myEventsList = await getEvents(boardId);
  // const [myEvents, setmyEvents] = useState([]);
  // useEffect(() => {
  //   fetch_events();
  // }, []);
  // const fetch_events = async () => {
  //   let events = await getEvents(boardId);
  //   setmyEvents(events);
  // };
  console.log(myEventsList);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarView;
