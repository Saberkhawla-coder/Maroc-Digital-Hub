import React, { useState, useEffect } from 'react'
import Discussion from './Discussion'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RiLoginCircleFill } from 'react-icons/ri'

function Forum() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState([])
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [alertMessage, setAlertMessage] = useState(null)
  const role = useSelector((state) => state.user.role)
  const user=useSelector((state)=>state.user.userData)
  
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

  const getForum = async () => {
    try {
      const res = await axios.get('http://localhost:4000/Forum')
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getForum()
  }, [])

  const AddForum = async (e) => {
    e.preventDefault()
    const infos = { title, desc,img:"", name:user.username  }
    try {
      const res = await axios.post('http://localhost:4000/Forum', infos)
      setData(prev => [...prev, res.data])
      setTitle("")
      setDesc("")
      setShowForm(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {/* --- Hero Section --- */}
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src="/imgToday.jpg"
          alt="not found"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          backgroundColor: 'rgba(43, 44, 47, 0.9)',
        }}></div>

        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white", textAlign: "center",
        }}>
          <h1 className='text-4xl leading-[5rem]' style={{ color: "#9BB1FF" }}>
            Forum de Discussion
          </h1>
          <p className='text-xl font-light leading-[2rem]'>
            Échangez avec la communauté, partagez vos expériences et posez vos questions
          </p>
          <div className='flex gap-10 justify-center items-center'>
            <button
              className='bg-[#5465FF] px-6 py-3 rounded-2xl mt-6 cursor-pointer'
              onClick={handleAddClick}
              
            >
              Nouveau message
            </button>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl cursor-pointer"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

            <h1 className="text-2xl font-bold mb-4 text-center text-[#5465FF]">Ajouter un forum</h1>
            <form className="flex flex-col gap-4" onSubmit={AddForum}>
              <input
                type="text"
                placeholder="Titre"
                className="border p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Votre commentaire"
                className="border p-2 rounded"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
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

      
      <Discussion forum={data} />
    </div>
  )
}

export default Forum
