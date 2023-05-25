import React from "react";
import { Link } from "react-router-dom";
import school from "../image/school.png";
import announcement from "../image/announcement.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CalendarItem from "../components/CalendarItem"

function CalendarPage() {
  return (
    <div>
      <div className="col-span-9 bg-[#fff] mt-[3%]">
        <label className="text-2xl font-semibold m-[7%]">ปฏิทินการศึกษา</label>
        <CalendarItem />
      </div>
    </div>
  );
}

export default CalendarPage;
