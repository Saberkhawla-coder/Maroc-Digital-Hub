import React, { useEffect } from 'react';
import Footer from '../Footer.jsx';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchForum } from "../redux/Forums.jsx";

function Discussion() {
  const { role } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { forums, loading, error } = useSelector(state => state.forums);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchForum());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/Forum/${id}`);
      dispatch(fetchForum());
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p className="text-center mt-10 h-80 bg-amber-500">...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div>
      <div className="max-w-5xl mx-auto p-4 space-y-4">
        {forums.map((f) => (
          <div
            key={f.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <img
                  src={f.img || "https://i.pinimg.com/1200x/74/ac/4a/74ac4a7d3c28934d1618131f331fb521.jpg"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-blue-600 font-semibold text-sm mb-1">{f.name}</h3>
                  <h4 className="text-gray-900 font-medium text-base mb-3">{f.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
              {role === "admin" && (
                <button
                  className="text-blue-400 hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={() => handleDelete(f.id)}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Discussion;
