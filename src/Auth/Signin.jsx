import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:4000/users");
      const users = res.data;
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        dispatch(
          login({
            role: user.role.toLowerCase(),
            userData: user,
          })
        );

        toast.success(`Welcome ${user.username}!`, {
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

       
        setTimeout(() => {
          navigate(user.role.toLowerCase() === "admin" ? "/Dashboard" : "/");
        }, 3000);
      } else {
        toast.error("Invalid email or password", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred while logging in", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl backdrop-blur-sm bg-white/10 shadow-2xl p-10 rounded-3xl flex flex-col md:flex-row items-center justify-center border border-white/20">
        <div className="hidden md:flex flex-1 items-center justify-center">
          <img
            src="/Auth.jpg"
            alt="Signin Illustration"
            className="max-w-md w-full rounded-3xl object-cover "
          />
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="rounded-3xl p-8">
            <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
              Sign In
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-white/40 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition backdrop-blur-sm"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 border border-white/40 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition backdrop-blur-sm"
                required
              />

              <button
                type="submit"
                className="w-full bg-indigo-600/90 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/80">
                Don't have an account?{" "}
                <Link to="/signup" className="text-white font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>


      <ToastContainer />
    </div>
  );
}

export default Signin;
