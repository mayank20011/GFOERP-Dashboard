import React, { useState } from "react";
import AddProduct from "./AddProduct.jsx";
import UpdateProduct from "./UpdateProduct.jsx";
import DeleteProduct from "./DeleteProduct.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductVendor() {
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
        {/* button-1 */}
        <button
          className={`px-4 py-2 border rounded-md shadow-md shadow-slate-100 hover:scale-95 transition ${
            select === "Add" ? "text-black bg-white" : "text-white"
          }`}
          onClick={() => {
            setSelect("Add");
          }}
        >
          Add products
        </button>

        {/* button-2 */}
        <button
          className={`px-4 py-2 border rounded-md shadow-md shadow-slate-100 hover:scale-95 transition ${
            select === "Update" ? "text-black bg-white" : "text-white"
          }`}
          onClick={() => {
            setSelect("Update");
          }}
        >
          Update Products
        </button>

        {/* button-3 */}
        <button
          className={`px-4 py-2 border rounded-md shadow-md shadow-slate-100 hover:scale-95 transition ${
            select === "Delete" ? "text-black bg-white" : "text-white"
          }`}
          onClick={() => {
            setSelect("Delete");
          }}
        >
          Delete Products
        </button>
      </div>

      {/* div to update or show */}

      <div>
        {select === "Add" ? (
          <AddProduct />
        ) : select === "Update" ? (
          <UpdateProduct />
        ) : (
          <DeleteProduct />
        )}
      </div>
    </div>
  );
}

export default ProductVendor;
