import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram,FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";
function Footer() {
  const role=useSelector((state)=>state.user.role)

  return (
   
      role!=="admin"? (
 <footer className="bg-gray-100 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* Section 1 */}
        <div>
          <h2 className="text-[#5465FF] font-semibold mb-3">Maroc Digital Hub</h2>
          <p className="text-gray-500 text-[15px]">
            La plateforme qui connecte startups, investisseurs et talents pour
            accélérer l'innovation au Maroc et dynamiser notre écosystème digital.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="text-[#5465FF] cursor-pointer" size={20} />
            <FaLinkedinIn className="text-[#5465FF] cursor-pointer" size={20} />
            <FaInstagram className="text-[#5465FF] cursor-pointer" size={20} />
            <FaTwitter className="text-[#5465FF] cursor-pointer" size={20} />
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-[#5465FF] font-semibold mb-3">Contact</h2>
          <p className="text-gray-500 text-[15px]">contact@marocdigitalhub.ma</p>
          <p className="text-gray-500 text-[15px]">+212 5 22 XX XX XX</p>
          <p className="text-gray-500 text-[15px]">Technopark Casablanca<br/>Route de Nouaceur</p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-[#5465FF] font-semibold mb-3">Newsletter</h2>
          <p className="text-gray-500 text-[15px] mb-3">
            Restez informé des dernières actualités de l’écosystème digital marocain.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-[15px] focus:outline-none"
            />
            <button className="bg-[#5465FF] text-white px-4 rounded-r-md hover:bg-[#788BFF] transition">
              OK
            </button>
          </div>
        </div>
      </div>
    </footer>
      ):(
        <div className="pt-10"></div>
      )
    
   
  );
}

export default Footer;
