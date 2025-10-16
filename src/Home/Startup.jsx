import React, { useEffect, useState } from "react";
import AllStartup from "./AllStartup";
import axios from "axios";

function Startup() {
  const [thisMonthStartups, setThisMonthStartups] = useState([]);

  

useEffect(() => {
  const fetchStartups = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Startup");
      const data = res.data;

      const currentMonth = new Date().toISOString().slice(0, 7);
      const startupsThisMonth = data.filter(
        (startup) => startup.month === currentMonth
      );

      setThisMonthStartups(startupsThisMonth);
    } catch (error) {
      console.error("Erreur lors du fetch des startups :", error);
    }
  };  
  fetchStartups();
  const interval = setInterval(fetchStartups, 1000);
  return () => clearInterval(interval);
}, []);



  return (
    <div>
      <div className="px-6 py-10">
        <h1 className="text-[#788BFF] text-3xl font-bold text-center mb-8">
          Startup du mois
        </h1>

       {thisMonthStartups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-6">
            {thisMonthStartups.slice(0,3).map((startup, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md w-80 overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
              >
                <img
                  src={startup.img}
                  alt={startup.name}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-[#5465FF]">
                    {startup.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{startup.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            Aucune startup ajoutée ce mois-ci.
          </p>
        )}
      </div>

      <AllStartup />
    </div>
  );
}

export default Startup;
