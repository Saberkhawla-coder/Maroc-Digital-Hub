import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaArrowLeft, FaArrowRight, FaRocket } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { AiOutlineUserDelete } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";
import { HiOutlineX } from "react-icons/hi";
import { GrValidate } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import axios from "axios";
import Events from "./Events";

function AllStartup() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [alert, setAlert] = useState(null);

  const { role, userData } = useSelector((s) => s.user);
  const perPage = 3;

  const say = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(null), 3000);
  };

  const fetchData = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/Startup");
    setData(data);
    return data;
  } catch (err) {
    console.error("Fetch fail:", err);
    return [];
  }
};



  useEffect(() => {
    fetchData(); 
    window.scrollTo(0,0)
  }, []);

  const handleAdd = () => {
    if (role === "visiteur") return say(<span className="flex items-center gap-2">Login first <RiLoginCircleFill /></span>);
    if (role === "investor") return say(<span className="flex items-center gap-2">Nope <AiOutlineUserDelete /></span>);
    setEditItem(null);
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const obj = {
      name: f.name.value,
      desc: f.desc.value,
      img: f.img.value,
      dateCreation: new Date().toISOString(),
      month: new Date().toISOString().slice(0, 7),
      createdBy: userData?.email || "unknown",
    };

    try {
      if (editItem) {
        await axios.put(`http://localhost:4000/Startup/${editItem.id}`, obj);
        say(<span className="flex gap-2 justify-center items-center">Startup updated! <GrValidate/></span>);
      } else {
        await axios.post("http://localhost:4000/Startup", obj);
        say(<span className="flex gap-2 justify-center items-center">Startup added! <GrValidate/></span>);
      }
      fetchData(); // update data immediately
      setFormOpen(false);
    } catch (err) {
      console.error("Submit fail:", err);
    }
  };

 const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/Startup/${id}`);
    say(
      <span className="flex gap-2 justify-center items-center">Deleted! <TiDeleteOutline/></span>
    );
    // Fetch updated data
    const { data } = await axios.get("http://localhost:4000/Startup");
    setData(data);

    // Adjust page if needed
    const maxPage = Math.ceil(data.length / perPage);
    if (page > maxPage) setPage(maxPage || 1);
  } catch (err) {
    console.error("Delete fail:", err);
  }
};


  const canEdit = (s) => role === "admin" || (role === "startup" && s.createdBy === userData?.email);

  const total = Math.ceil(data.length / perPage);
  const slice = data.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div className="px-6 py-5">
      <div className=" flex justify-between items-center mb-8">
        <h1 className="flex justify-center items-center gap-3 text-3xl font-bold text-[#5465FF]"><FaRocket /> Startups</h1>
        <button onClick={handleAdd} className="p-3 bg-[#788BFF] text-white rounded-full hover:bg-[#5465FF]">
          <FaPlus />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {slice.map((s) => (
          <div key={s.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition group">
            <div className="relative">
              <img src={s.img} alt={s.name} className="w-full h-60 object-cover transition-transform duration-300" />
              {canEdit(s) && (
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <button onClick={() => handleDelete(s.id)} className="text-white text-3xl absolute top-3 right-3 hover:text-blue-800 cursor-pointer transition">
                    <HiOutlineX />
                  </button>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-[#5465FF]">{s.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
              {canEdit(s) && (
                <div className="flex justify-end gap-3 mt-3">
                  <button onClick={() => { setEditItem(s); setFormOpen(true); }} className="text-blue-900 text-3xl cursor-pointer">
                    <LiaUserEditSolid />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-3 mt-8 text-[#5465FF]">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-2xl disabled:opacity-30">
          <FaArrowLeft />
        </button>
        {Array.from({ length: total }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} className={`text-lg ${page === i + 1 ? "font-bold border-b-2 border-[#5465FF]" : "text-gray-500"}`}>{i + 1}</button>
        ))}
        <button disabled={page === total} onClick={() => setPage(page + 1)} className="text-2xl disabled:opacity-30">
          <FaArrowRight />
        </button>
      </div>

      {/* Form modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/98 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold text-[#5465FF]">{editItem ? "Edit Startup" : "Add Startup"}</h2>
              <button onClick={() => setFormOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input name="name" defaultValue={editItem?.name || ""} placeholder="Name" className="border p-2 rounded" required />
              <textarea name="desc" defaultValue={editItem?.desc || ""} placeholder="Description" className="border p-2 rounded" required />
              <input type="file" name="img" defaultValue={editItem?.img || ""}  className="border p-2 rounded" />
              <button className="bg-[#5465FF] text-white py-2 rounded hover:bg-[#3a4ae0]">{editItem ? "Save" : "Add"}</button>
            </form>
          </div>
        </div>
      )}

      {/* Alert */}
      {alert && (
        <div className="fixed bottom-6 right-6 bg-[#5465FF] text-white px-4 py-3 rounded-lg shadow-lg">
          {alert}
        </div>
      )}

      
    </div>
    <Events />
    </div>
    
  );
}

export default AllStartup;
