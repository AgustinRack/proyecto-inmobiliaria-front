import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./CalendarStyles/styles.css";
import * as settings from "../../settings/index";
import axios from "axios";

export default function AppointmentCalendar() {
  const today = new Date();
  const [dateState, setDateState] = useState(today);

  const [hours, setHours] = useState([9, 10, 11, 12, 13, 14, 15, 16]);
  const [selectedHour, setSelectedHour] = useState(hours[0]);

  const handleSaveHour = (index) => {
    console.log("holis soy index che,,,,", index);
    setSelectedHour(hours[index]);
  };

  const handleConfirm = () => {
    setHours(hours.filter((hour) => hour !== selectedHour));
    // saveData(selectedHour, dateState);
    alert(`Nos vemos el ${dateState} a las  ${selectedHour}:00`);
  };

  const saveData = async (date, hour) => {
    try {
      await axios.post(`${settings.axiosURL}/visits`, {
        date: date,
        schedule: hour,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeDate = (e) => {
    setDateState(e);
  };

  const disableDays = ({ date }) => {
    return (
      new Date() > date ||
      moment(date).isoWeekday() === 6 ||
      moment(date).isoWeekday() === 7
    );
  };

  return (
    <>
      <Calendar
        value={dateState}
        onChange={changeDate}
        tileDisabled={disableDays}
      />
      {dateState !== today ? (
        <>
          {hours.map((hour, index) => {
            return (
              <button
                className="hora"
                key={index}
                onClick={() => handleSaveHour(index)}
              >
                {hour}:00
              </button>
            );
          })}
          <button onClick={handleConfirm}>Confirmar</button>
        </>
      ) : (
        <p>Elija una fecha para su visita</p>
      )}
    </>
  );
}
