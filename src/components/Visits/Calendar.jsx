import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./CalendarStyles/styles.css";
import * as settings from "../../settings/index";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AppointmentCalendar() {
  const property = useSelector((state) => state.selectedProperty);
  const user = useSelector((state) => state.user.userData);

  const allHours = [9, 10, 11, 12, 13, 14, 15, 16];

  const formatDate = (date) => {
    try {
      return moment(date, "DD/MM/YYYY").toDate();
    } catch (error) {
      console.log(error);
    }
  };

  const today = formatDate(new Date());

  const [dateState, setDateState] = useState(today);
  const [hours, setHours] = useState(allHours);
  const [selectedHour, setSelectedHour] = useState(hours[0]);

  const handleSaveHour = (index) => {
    setSelectedHour(hours[index]);
  };

  const handleConfirm = async () => {
    setHours(hours.filter((hour) => hour !== selectedHour));
    await saveData(dateState, selectedHour);
    alert(
      `Nos vemos el ${moment(dateState).format(
        "DD/MM/YYYY"
      )} a las ${selectedHour}:00`
    );
  };

  const saveData = async (date, hour) => {
    try {
      await axios.post(`${settings.axiosURL}/visits/appointment/save`, {
        userEmail: user.email,
        propertyId: property.id,
        date: moment(date).format("DD/MM/YYYY"),
        schedule: hour,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeDate = (date) => {
    setSelectedHour(null);
    setDateState(date);
    getFilteredHours(date);
  };

  const disableDays = ({ date }) => {
    return (
      new Date() > date ||
      moment(date).isoWeekday() === 6 ||
      moment(date).isoWeekday() === 7
    );
  };

  async function fetchPropertyVisits(id) {
    try {
      const visit = await axios.get(
        `${settings.axiosURL}/visits/appointment/${id}`
      );
      return visit.data;
    } catch (error) {
      console.log("fetchVisit error", error);
    }
  }

  async function getFilteredHours(date) {
    try {
      const visits = await fetchPropertyVisits(property.id);

      let availableHours = allHours.slice();
      let usedHours = [];
      visits?.map((visit) => {
        if (moment(visit.date, "DD/MM/YYYY").isSame(date, "day")) {
          usedHours.push(visit.schedule);
        }
      });

      availableHours = availableHours.filter(
        (hour) => !usedHours.includes(hour)
      );
      setHours(availableHours);
    } catch (error) {
      console.log("fetchVisit error", error);
    }
  }

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
                style={{
                  backgroundColor: selectedHour === hour ? "blue" : "green",
                }}
              >
                {hour}:00
              </button>
            );
          })}
          <button className="confirm" onClick={handleConfirm}>
            Confirmar
          </button>
        </>
      ) : (
        <p>Elija una fecha para su visita</p>
      )}
    </>
  );
}

// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import moment from "moment";
// import "./CalendarStyles/styles.css";
// import * as settings from "../../settings/index";
// import axios from "axios";
// import { useSelector } from "react-redux";

// export default function AppointmentCalendar() {
//   const property = useSelector((state) => state.selectedProperty);
//   const user = useSelector((state) => state.user.userData);

//   const allHours = [9, 10, 11, 12, 13, 14, 15, 16];

//   const formatDate = (date) => {
//     try {
//       return moment(date).format("DD/MM/YYYY");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const today = formatDate(new Date());

//   const [dateState, setDateState] = useState(today);
//   const [hours, setHours] = useState(allHours);
//   const [selectedHour, setSelectedHour] = useState(hours[0]);

//   const handleSaveHour = (index) => {
//     setSelectedHour(hours[index]);
//   };

//   const handleConfirm = async () => {
//     setHours(hours.filter((hour) => hour !== selectedHour));
//     await saveData(dateState, selectedHour);
//     alert(`Nos vemos el ${dateState} a las  ${selectedHour}:00`);
//   };

//   const saveData = async (date, hour) => {
//     try {
//       await axios.post(`${settings.axiosURL}/visits/appointment/save`, {
//         userEmail: user.email,
//         propertyId: property.id,
//         date: formatDate(date),
//         schedule: hour,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const changeDate = (e) => {
//     console.log("SOY E:", e);
//     setDateState(formatDate(e));
//     console.log("SOY EL FORMATEO DE E:", formatDate(e));
//     getFilteredHours();
//   };

//   const disableDays = ({ date }) => {
//     return (
//       new Date() > date ||
//       moment(date).isoWeekday() === 6 ||
//       moment(date).isoWeekday() === 7
//     );
//   };

//   async function fetchPropertyVisits(id) {
//     try {
//       const visit = await axios.get(
//         `${settings.axiosURL}/visits/appointment/${id}`
//       );
//       return visit.data;
//     } catch (error) {
//       console.log("fetchVisit error", error);
//     }
//   }

//   async function getFilteredHours() {
//     try {
//       const visits = await fetchPropertyVisits(property.id);

//       let availableHours = allHours.slice();
//       let usedHours = [];
//       visits?.map((visit) => {
//         console.log("soy la visita date", visit.date);
//         // console.log("Dia seleccionado:", dateState);
//         if (visit.date == dateState) {
//           console.log("soy el if", dateState);
//           usedHours.push(visit.schedule);
//         }
//       });

//       availableHours = availableHours.filter(
//         (hour) => !usedHours.includes(hour)
//       );
//       console.log(usedHours);
//       setHours(availableHours);
//     } catch (error) {
//       console.log("fetchVisit error", error);
//     }
//   }

//   return (
//     <>
//       <Calendar
//         value={dateState}
//         onChange={changeDate}
//         tileDisabled={disableDays}
//       />
//       {dateState !== today ? (
//         <>
//           {hours.map((hour, index) => {
//             return (
//               <button
//                 className="hora"
//                 key={index}
//                 onClick={() => handleSaveHour(index)}
//               >
//                 {hour}:00
//               </button>
//             );
//           })}
//           <button onClick={handleConfirm}>Confirmar</button>
//         </>
//       ) : (
//         <p>Elija una fecha para su visita</p>
//       )}
//     </>
//   );
// }
