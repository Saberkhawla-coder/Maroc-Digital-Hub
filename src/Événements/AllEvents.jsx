import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";
import { registerEvent } from "../redux/registeredEventsSlice";
import { fetchEvents } from "../redux/Events";
import { GrValidate } from "react-icons/gr";
import { RiLoginCircleFill } from 'react-icons/ri';
import { HiOutlineX } from "react-icons/hi";
import axios from "axios";

function AllEvents() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const user = useSelector((state) => state.user.userData);
  const role = useSelector((state) => state.user.role);
  const [alertMessage, setAlertMessage] = useState(null);

useEffect(() => {
  window.scrollTo(0, 0);
  dispatch(fetchEvents());
}, [dispatch]);

  const showAlert = (content) => {
    setAlertMessage(content);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleRegister = (event) => {
    if (role === "visiteur") {
      showAlert(
        <span className="flex items-center gap-2">
          Vous devez être connecté <RiLoginCircleFill className="text-xl" />
        </span>
      );
      return;
    }
    dispatch(registerEvent({ ...event, userId: user.id }));
    showAlert(
      <span className="flex items-center gap-2">
        Votre inscription a réussi <GrValidate />
      </span>
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/Events/${id}`);
      dispatch(fetchEvents());
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div>
      <div className="mt-15 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 shadow-md rounded-lg text-center"
            >
              <div className="relative">
                <img
                  src="/imgToday.jpg"
                  alt=""
                  className="w-full mb-5 h-60 object-cover rounded-lg"
                />
                <div>
                  {
                    role==='admin' &&(
                         <button
                    onClick={() => handleDelete(event.id)}
                    className="text-amber-300 absolute top-2 right-2 text-3xl z-50 hover:text-blue-800 cursor-pointer transition"
                  >
                    <HiOutlineX />
                  </button>
                    )
                  }
               
                </div>
              </div>

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
