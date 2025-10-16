import React, { useEffect, useState } from "react";
import {
  FaHeartbeat,
  FaMoneyBillWave,
  FaGraduationCap,
  FaSeedling,
  FaShoppingCart,
  FaBrain,
  FaLeaf,
  FaTruck,
} from "react-icons/fa";
import Startup from "./Startup";
import axios from "axios";

function Secteurs() {
  const [secteurs, setSecteurs] = useState([]);

  const icons = {
    FaHeartbeat,
    FaMoneyBillWave,
    FaGraduationCap,
    FaSeedling,
    FaShoppingCart,
    FaBrain,
    FaLeaf,
    FaTruck,
  };

  const getSecteurs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/sectors");
      setSecteurs(res.data);
    } catch (error) {
      console.error("Erreur lors du fetch des secteurs :", error);
    }
  };

  useEffect(() => {
    getSecteurs();
    window.scrollTo(0,0)
  }, []);

  return (
    <div>
      <div className="px-6 py-10">
        <h1 className="text-[#788BFF] text-3xl font-bold text-center mb-8">
          Secteurs en tendance
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
          {secteurs.map((secteur) => {
            const Icon = icons[secteur.icon]; // récupération de l'icône
            return (
              <div
                key={secteur.id}
                className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6 gap-3 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
              >
                {Icon && <Icon className="text-[#5465FF] text-3xl" />}
                <h2 className="text-[#999393] text-xl font-semibold">
                  {secteur.title}
                </h2>
                <p className="text-[#5465FF]">{secteur.startups} startups</p>
              </div>
            );
          })}
        </div>
      </div>
      <Startup />
    </div>
  );
}

export default Secteurs;
