import React, { useState } from 'react'
import AllEvents from './AllEvents'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RiLoginCircleFill } from 'react-icons/ri'

function Evénements() {
  const [showForm, setShowForm] = useState(false)
  const [alertMessage, setAlertMessage] = useState(null)
  const role = useSelector((state) => state.user.role)

  const showAlert = (content) => {
    setAlertMessage(content)
    setTimeout(() => setAlertMessage(null), 3000)
  }

  const handleAddClick = () => {
    if (role === 'visiteur') {
      showAlert(
        <span className="flex items-center gap-2">
          Vous devez être connecté <RiLoginCircleFill className="text-xl" />
        </span>
      )
      return
    }
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newEvent = {
      title: e.target[0].value,
      img: e.target[1].value,
      date: e.target[2].value,
      lieu: e.target[3].value,
    }

    try {
      await axios.post('http://localhost:4000/Events', newEvent)
      setShowForm(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
        {role !== "admin" &&(
        <div style={{ position: 'relative', width: '100%' }}> 
          
     
          <div>
            <img
          src="/imgToday.jpg"
          alt="not found"
          style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(43, 44, 47, 0.9)',
          }}
        ></div>

          </div>
        
     
     

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <h1 className="text-4xl leading-[5rem]" style={{ color: '#9BB1FF' }}>
            Événements Tech & Networking
          </h1>
          <p className="text-xl font-light leading-[2.5rem]">
            Découvrez les événements incontournables de l'écosystème digital marocain et connectez-vous avec la communauté
          </p>
          <div className="flex gap-10 justify-center items-center">
            <button
              className="bg-[#5465FF] px-6 py-3 rounded-2xl mt-6 cursor-pointer hover:bg-[#4651e8] transition"
              onClick={handleAddClick}
            >
              Créer un événement
            </button>
          </div>
        </div>
      </div>
 )}
      {/* Formulaire */}
     
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-1000 ">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl cursor-pointer"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

            <h1 className="text-2xl font-bold mb-4 text-center text-[#5465FF]">
              Ajouter un événement
            </h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input type="text" placeholder="Titre" className="border p-2 rounded" />
              <input type="file" className="border p-2 rounded" />
              <input type="date" className="border p-2 rounded" />
              <input type="text" placeholder="Lieu" className="border p-2 rounded" />
              <button className="bg-[#5465FF] text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}

     
      {alertMessage && (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          {alertMessage}
        </div>
      )}
      {
        role==="admin" &&(
           <div className="flex gap-10 justify-center items-center">
            <button
              className="bg-[#5465FF] px-6 py-3 rounded-2xl mt-6 cursor-pointer hover:bg-[#4651e8] transition"
              onClick={handleAddClick}
            >
              Créer un événement
            </button>
          </div>
        )
      }

      <AllEvents />
    </div>
  )
}

export default Evénements
