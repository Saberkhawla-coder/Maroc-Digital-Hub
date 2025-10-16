import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "startup", 
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/users", {
        ...formData,
        role: formData.role.toLowerCase()
      });
      alert("Account created successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Erreur lors de la création du compte.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 flex items-center justify-center px-4">
      <div className="w-full shadow-2xl rounded-2xl max-w-4xl flex flex-col md:flex-row items-center gap-12">
        <div className="hidden md:flex flex-1 items-center justify-center">
          <img src="/login.jpg" alt="Signup Illustration" className="max-w-md w-full object-contain rounded-2xl" />
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="  rounded-3xl p-8">
            <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
              Create Account
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input name="username" type="text" placeholder="Username" onChange={handleChange} className="w-full px-5 py-3 border border-white/40 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition backdrop-blur-sm" />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full px-5 py-3 border border-white/40 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition backdrop-blur-sm" />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full px-5 py-3 border border-white/40 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition backdrop-blur-sm" />
              <select name="role" onChange={handleChange} className="w-full px-5 py-3 border border-white/40 rounded-xl bg-white/10 text-purple-900 placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition backdrop-blur-sm ">
                <option value="startup">Startup</option>
                <option value="investor">Investor</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="w-full bg-indigo-600/90 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl">
                Sign up
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/80">
                Already have an account? <Link to="/signin" className="text-white font-medium ">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
