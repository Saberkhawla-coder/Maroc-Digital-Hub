import React from 'react'
import { Link, useLocation ,useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'

function Navbar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { role } = useSelector(state => state.user)

  if (location.pathname === '/signup' || location.pathname === '/signin') return null
   const handleLogout = () => {
    dispatch(logout())  
    navigate("/")        
  }

  const links = []

  if (role === 'visiteur') {
    links.push(
      { to: '/', label: 'Accueil' },
      { to: '/Événements', label: 'Événements' },
      { to: '/Forum', label: 'Discussions' },
      { to: '/signin', label: 'Connexion' }
    )
  } else if (role === 'startup' || role === 'investor') {
    links.push(
      { to: '/', label: 'Accueil' },
      { to: '/Événements', label: 'Événements' },
      { to: '/MesÉvénements', label: 'Mes Événements' },
      { to: '/Forum', label: 'Discussions' },
      { to: '#', label: 'Déconnexion', onClick:handleLogout }
    )
  } else if (role === 'admin') {
    links.push(
      { to: '/', label: 'Accueil' },
      { to: '/Événements', label: 'Événements' },
      { to: '/Dashboard', label: 'Dashboard' },
      { to: '/Forum', label: 'Discussions' },
      { to: '#', label: 'Déconnexion', onClick:  handleLogout }
    )
  }

  return (
    <nav className='flex justify-between p-5 nav'>
      <h1>Maroc Digital Club</h1>
      <div className='flex gap-4 font-extralight'>
        {links.map((link, index) =>
          link.onClick ? (
            <button key={index} onClick={link.onClick}>{link.label}</button>
          ) : (
            <Link key={index} to={link.to}>{link.label}</Link>
          )
        )}
      </div>
    </nav>
  )
}

export default Navbar
