import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendar, FaRocket } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { LuChartLine } from "react-icons/lu";
import { fetchStartups, fetchEvents, fetchUsers } from '../redux/dashboardSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { startups, events, users, loading } = useSelector(state => state.dashboard);
 
 

  useEffect(() => {
    dispatch(fetchStartups());
    dispatch(fetchEvents());
    dispatch(fetchUsers());
  }, [dispatch]);

  const stats = [
    {
      id: 1,
      title: 'Total Startups',
      value: startups.length,
      icon: <FaRocket style={{ color: "#8B5CF6" }} />
    },
    {
      id: 2,
      title: 'Événements',
      value: events.length,
      icon: <FaCalendar style={{ color: "#FFC7C2" }} />
    },
    {
      id: 3,
      title: 'Participants',
      value: users.length,
      icon: <IoPeople style={{ color: "#0D99FF" }} />
    },
    {
      id: 4,
      title: 'Investissements',
      value:users.filter((i)=>i.role==="investor").length,
      icon: <LuChartLine style={{ color: "#37F2FB"}} />
    }
  ];

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Administrateur</h2>
        <p className="text-gray-500">Vue d'ensemble de l'écosystème Maroc Digital Hub</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
            <span  className="text-3xl">{stat.icon}</span>
            <h3 className="text-gray-500 font-medium mt-2">{stat.title}</h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
