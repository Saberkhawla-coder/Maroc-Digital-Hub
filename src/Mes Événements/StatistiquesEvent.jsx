import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { unregisterEvent } from '../redux/registeredEventsSlice';
import Footer from '../Footer';

function StatistiquesEvent() {
  const registeredEvents = useSelector((state) => state.registeredEvents.events);
  const user = useSelector((state) => state.user.userData); 
  const dispatch = useDispatch();

  const userEvents = registeredEvents.filter(event => event.userId === user?.id);

  if (!user) {
  return <p className="text-center text-gray-500">Veuillez vous connecter pour voir vos statistiques.</p>;
}

  return (
    <div>
      <div className="p-10  min-h-screen">
     
        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-3xl font-bold text-[#5465FF]">{userEvents.length}</h3>
            <p className="text-gray-500">Total événements</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-3xl font-bold text-[#5465FF]">{userEvents.filter((item)=>new Date(item.date.split("/").reverse().join("-"))>new Date()).length}</h3>
            <p className="text-gray-500">À venir</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-3xl font-bold text-[#5465FF]">{userEvents.filter((item)=>new Date(item.date.split("/").reverse().join("-"))<new Date()).length}</h3>
            <p className="text-gray-500">Passés</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-3xl font-bold text-[#5465FF]">120</h3>
            <p className="text-gray-500">Participants totaux</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Événements à venir
        </h2>
        {
          userEvents.length>0?(
             
           
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {userEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src="/imgToday.jpg"
                alt="event"
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#5465FF]">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <FaCalendarAlt className="mr-2" /> {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FaMapMarkerAlt className="mr-2" /> {event.lieu}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FaUsers className="mr-2" /> 12 participants
                </div>
                <button
                  onClick={() => dispatch(unregisterEvent(event.id))}
                  className="mt-4 w-full bg-white text-[#5465FF] border border-[#5465FF] py-2 rounded-lg hover:bg-[#5465FF] hover:text-white transition"
                >
                  Se désinscrire
                </button>
              </div>
            </div>
          ))}
        </div>
            
          ):(
        
           <p className="text-center text-gray-500 mt-4 l">Aucun événement à venir.</p>
       
         
           
          )

        }
       

      
      </div>  
      <Footer/>
    </div>
  );
}

export default StatistiquesEvent;
