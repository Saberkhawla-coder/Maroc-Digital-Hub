import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/"); 
  };

  const links = [
    { path: '/admin/accueil', label: 'Accueil' },
    { path: '/admin/evenements', label: 'Événements' },
    { path: '/admin/forum', label: 'Forum' },
    { path: '/admin/mes-evenements', label: 'Mes Événements' }
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 bg-indigo-600 min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <Link to='/Dashboard'>
          <h1 className="text-white text-3xl font-bold hover:text-indigo-200 transition-colors">
            Dashboard
          </h1>
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-3 rounded-lg text-white transition-all duration-200 ${
              location.pathname === link.path
                ? 'bg-indigo-700 font-semibold'
                : 'hover:bg-indigo-700/50'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-white px-4 py-3 rounded-lg hover:bg-indigo-700/50 transition-all duration-200 mt-auto cursor-pointer"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Déconnexion
      </button>
    </aside>
  );
}

export default Sidebar;
