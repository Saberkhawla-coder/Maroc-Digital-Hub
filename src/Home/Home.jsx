import React, { useEffect, useState } from 'react'
import Secteurs from './Secteurs'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../redux/searchSlice';

function Home() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [secteurs, setSecteurs] = useState([]);
  const [startups, setStartups] = useState([]);
  const [selectedSecteur, setSelectedSecteur] = useState(''); 

  const getSecteurs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/sectors");
      setSecteurs(res.data);
    } catch (error) {
      console.error("Erreur lors du fetch des secteurs :", error);
    }
  };

  const getStartups = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Startup");
      setStartups(res.data);
    } catch (error) {
      console.error("Erreur lors du fetch des startups :", error);
    }
  };

  useEffect(() => {
    getSecteurs();
    getStartups();
    window.scrollTo(0,0);
  }, []);

  const filteredStartups = startups.filter((startup) => {
    const matchName = startup.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSecteur = selectedSecteur ? startup.sectorId === selectedSecteur : true; // si aucun secteur sélectionné, on prend tout
    return matchName && matchSecteur;
  });

  return (
    <div>
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src="/imgToday.jpg"
          alt="not found"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: 'rgba(43, 44, 47, 0.9)',
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 className='text-4xl leading-[5rem]' style={{color:"#9BB1FF"}}>Accélérez l'innovation au Maroc</h1>
          <p className='text-xl font-light leading-[2rem]'>Découvrez les startups les plus prometteuses du royaume et connectez-vous avec l'écosystème digital marocain</p>
          <div className='flex gap-10 justify-center items-center'>
            <input 
              type="text" 
              placeholder='Rechercher une startup...' 
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))} 
              className='bg-white w-130 mt-10 rounded-2xl text-black p-3'
            />
            <select 
              name="secteur" 
              id="secteur" 
              className='bg-white w-35 mt-10 rounded-2xl p-3 text-black'
              value={selectedSecteur}
              onChange={(e) => setSelectedSecteur(e.target.value)}
            >
              <option value="">Secteurs</option>
              {secteurs.map((secteur) => (
                <option key={secteur.id} value={secteur.id}>{secteur.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>


      {(searchTerm || selectedSecteur) && (
        <div className='mt-10 p-5 grid grid-cols-3 gap-5'>
          {filteredStartups.length > 0 ? (
            filteredStartups.map((startup) => (
              <div key={startup.id} className='bg-white p-2 rounded shadow'>
                {startup.img && (
                  <img 
                    src={startup.img} 
                    alt={startup.name} 
                    className='w-full h-48 object-cover mb-3' 
                  />
                )}
                <h2 className='font-bold text-lg'>{startup.name}</h2>
                <p>{startup.desc}</p> 
              </div>
            ))
          ) : (
            <p className='text-center col-span-3'>Aucune startup trouvée pour cette recherche.</p>
          )}
        </div>
      )}

      <Secteurs/>
    </div>
  )
}

export default Home;
