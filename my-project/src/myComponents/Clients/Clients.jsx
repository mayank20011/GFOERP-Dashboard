import React from "react";
import { useState } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddClients from "./AddClients.jsx";
import UpdateClients from "./UpdateClients.jsx";
import DeleteClients from "./DeleteClients.jsx";

function Clients() {
  const [select, setSelect] = useState("Add");

  return (
    <div className="flex w-full flex-col justify-center py-12 md:py-0">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {/* button */}
      <div className="flex gap-4 justify-center">
        <button
          className={`px-4 py-2 border rounded-md shadow-md shadow-slate-100 hover:scale-95 transition ${
            select === "Add" ? "text-black bg-white" : "text-white"
          }`}
          onClick={() => {
            setSelect("Add");
          }}
        >
          Add New Client
        </button>
        <button
          className={`px-4 py-2 border rounded-md shadow-md shadow-slate-100 hover:scale-95 transition ${
            select === "Update" ? "text-black bg-white" : "text-white"
          }`}
          onClick={() => {
            setSelect("Update");
          }}
        >
          Update a Client
        </button>
        <button
          className={`px-4 py-2 border rounded-md shadow-md shadow-slate-100 hover:scale-95 transition ${
            select === "Delete" ? "text-black bg-white" : "text-white"
          }`}
          onClick={() => {
            setSelect("Delete");
          }}
        >
          Delete a Client
        </button>
      </div>

      {/* div to update or show */}
      {select === "Add" ? (
        <AddClients />
      ) : select === "Update" ? (
        <UpdateClients />
      ) : (
        <DeleteClients />
      )}
    </div>
  );
}

export default Clients;
