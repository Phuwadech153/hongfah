import React, { useState, useEffect } from "react";
import axios from "axios";
// import format from "date-fns/format";
// import getDay from "date-fns/getDay";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment/locale/th";

// const events = [
//   {
//       title: "ประชุมงาน",
//       start: new Date(2023, 0, 2),
//       end: new Date(2023, 0, 4),
//   },
//   {
//       title: "Vacation",
//       start: new Date(2023, 4, 7),
//       end: new Date(2023, 4, 10),
//   },
//   {
//       title: "Conference",
//       start: new Date(2023, 4, 20),
//       end: new Date(2023, 4, 23),
//   },
// ];


function CalendarItem(props) {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);
  const [newsInfo, setNewsInfo] = useState({});

  const fetchNew = async () => {
    try {
      const { data } = await axios.get(`/announce/news`);
      console.log(data);
    //   if(data.lenght > 0 ){
    //     data.map(e=>{
    //       const date  = e.DateCalendar.split(",")
    //       e.DateCalendar = `${date[0]}, ${Number(date[1])-1}, ${date[2]}`
    //   })
    // }
    setEvents(data);
      // console.log(data);
      // console.log(events)
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchNew();
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        titleAccessor="Title"
        startAccessor="Date"
        endAccessor="DateEnd"
        style={{ height: "600px", margin: "50px" }}
      />
    </div>
    // <div>
    //   <Calendar
    //     localizer={localizer}
    //     events={events}
    //     startAccessor="start"
    //     endAccessor="end"
    //     style={{ height: "600px", margin: "50px" }}
    //   />
    // </div>
  );
}

export default CalendarItem;
