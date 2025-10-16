import React from 'react'
import Footer from '../Footer.jsx'

function Discussion({ forum }) {
 

  return (
    <div>
      <div className="max-w-5xl mx-auto p-4 space-y-4">
        {forum.map((f) => (
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
                  <h3 className="text-blue-600 font-semibold text-sm mb-1">
                    {f.name}
                  </h3>
                  <h4 className="text-gray-900 font-medium text-base mb-3">
                    {f.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
              <button className="text-blue-400 hover:text-blue-600 transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Discussion
