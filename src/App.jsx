import './App.css'
import { Routes,Route} from 'react-router-dom'
import Home from './Home/Home'
import Navbar from './Home/Navbar'
import MesÉvénements from './Mes Événements/MesÉvénements'
import Evénements from './Événements/Evénements'
import Forum from './Forum/Forum'
import Signup from './Auth/Signup'
import Signin from './Auth/Signin'
import MainLayout from './MainLayout'
import AdminLayout from './AdminLayout'
import Dashboard from './Dashboard/Dashboard'

function App() {
  

  return (
    <>
      
      <Routes>
        <Route element={<MainLayout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/MesÉvénements' element={<MesÉvénements/>}/>
            <Route path='/Événements' element={<Evénements/>}/>
            <Route path='/Forum' element={<Forum/>}/>
            <Route path='/Signup' element={<Signup/>}/>
            <Route path='/Signin' element={<Signin/>}/>
        </Route>
       <Route element={<AdminLayout/>}>
       <Route path='/Dashboard' element={<Dashboard/>}/>
       <Route path='/admin/accueil' element={<Home/>}/>
            <Route path='/admin/mes-evenements' element={<MesÉvénements/>}/>
            <Route path='/admin/evenements' element={<Evénements/>}/>
            <Route path='//admin/forum' element={<Forum/>}/>
       </Route>
      </Routes>
    </>
   
  )
}

export default App
