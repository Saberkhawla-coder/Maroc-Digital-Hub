import React from 'react'
import StatistiquesEvent from './StatistiquesEvent'
  
function MesÉvénements() {
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
        <h1 className='text-4xl leading-[5rem]' style={{color:"#9BB1FF"}}>Mes Événements</h1>
        <p className='text-xl font-light leading-[2rem] '>Gérez vos inscriptions aux événements de l'écosystème digital marocain</p>
       

      </div>
      
     
    </div>
    <StatistiquesEvent/>
    </div>
  )
}

export default MesÉvénements