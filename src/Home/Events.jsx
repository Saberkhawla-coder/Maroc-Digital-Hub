import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { registerEvent } from "../redux/registeredEventsSlice";
import { GrValidate } from "react-icons/gr";
import { RiLoginCircleFill } from "react-icons/ri";


function Events() {
  const [events, setEvents] = useState([]);
  const [alertMessage,setAlertMessage]=useState(null)
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);
  
  const showAlert=(content)=>{
    setAlertMessage(content)
    setTimeout(() => setAlertMessage(null), 3000);
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

  const parseDate = (str) => {
    const [day, month, year] = str.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

 

  useEffect(() => {
    
    window.scrollTo(0, 0);
     const getEvents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Events");
      const data = res.data;

      const today = new Date();

      const futureEvents = data.filter((e) => parseDate(e.date) > today);

      setEvents(futureEvents);
    } catch (e) {
      console.log(e);
    }
  };
  getEvents()
   const Inverval= setInterval(getEvents, 1000)
   return ()=>clearInterval(Inverval)
  }, []);

  return (
    <div>
      <div className="bg-white">
        <h1 className="text-[#788BFF] text-3xl font-bold text-center mb-8">
          Événements à venir
        </h1>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 shadow-md rounded-lg p-4 text-center">
                <h2 className="text-[#5465FF] font-medium mb-2">{event.title}</h2>
                <p className="text-gray-600 text-sm mb-1">{event.date} &nbsp; | &nbsp; 12 participants</p>
                <p className="text-gray-500 text-sm mb-4">{event.lieu}</p>
                <button onClick={() => handleRegister(event)} className="w-full bg-[#5465FF] text-white rounded-md py-2 hover:bg-[#788BFF] transition" >
                  S'inscrire
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">Aucun événement à venir.</p>
        )}
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

export default Events;
