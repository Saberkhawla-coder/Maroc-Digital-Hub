import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { registerEvent } from "../redux/registeredEventsSlice";
import { GrValidate } from "react-icons/gr";
import { RiLoginCircleFill } from 'react-icons/ri'

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null)
  const user = useSelector((state) => state.user.userData); 
  const role = useSelector((state) => state.user.role)
  const dispatch = useDispatch();

  const getEvents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Events");
      setEvents(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getEvents();
    const interval = setInterval(getEvents, 1000);
    return () => clearInterval(interval);
  }, []);
  const showAlert=(content)=>{
      setAlertMessage(content)
    setTimeout(() => setAlertMessage(null), 3000)
  }

  const handleRegister = (event) => {
    
    if (role==="visiteur"){
       showAlert(
              <span className="flex items-center gap-2">
                Vous devez être connecté <RiLoginCircleFill className="text-xl" />
              </span>
            )
            return
    } 
    dispatch(registerEvent({ ...event, userId: user.id }));
     showAlert(
             <span className="flex items-center gap-2">
                Votre inscription a réussi <GrValidate />
              </span>
          )
          
  
  };

  return (
    <div>
      <div className="mt-15 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 shadow-md rounded-lg text-center"
            >
              <img
                src="/imgToday.jpg"
                alt=""
                className="w-full mb-5 h-60 object-cover rounded-lg"
              />
              <h2 className="text-[#5465FF] font-medium mb-2">{event.title}</h2>
              <p className="text-gray-600 text-sm mb-1">
                {event.date} &nbsp; | &nbsp; 12 participants
              </p>
              <p className="text-gray-500 text-sm mb-4">{event.lieu}</p>
              <button
                onClick={() => handleRegister(event)}
                className="w-50 mb-5 cursor-pointer bg-[#5465FF] text-white rounded-md py-2 hover:bg-[#788BFF] transition"
              >
                S'inscrire
              </button>
            </div>
          ))}
        </div>
        {alertMessage && (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          {alertMessage}
        </div>
      )}
      </div>

      <Footer />
    </div>
  );
}

export default AllEvents;
