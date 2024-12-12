import React from "react";
import { useState } from "react";
import AddVendor from "./AddVendor.jsx";
import UpdateVendor from "./UpdateVendor.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPurchaseVendor() {
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
          Add New Vendor
        </button>
        <button
          className={`px-4 py-2 border rounded-md shadow-md shadow-slate-100 hover:scale-95 transition ${
            select === "Update" ? "text-black bg-white" : "text-white"
          }`}
          onClick={() => {
            setSelect("Update");
          }}
        >
          Update a Vendor
        </button>
      </div>

      {/* div to update or show */}
      {select === "Add" ? <AddVendor /> : <UpdateVendor />}
    </div>
  );
}

export default AddPurchaseVendor;
