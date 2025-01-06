import React from "react";
import { useState } from "react";
import SalesLedger from "./SalesLedger.jsx";
import PurchaseLedger from "./PurchaseLedger.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Ledger() {
  const [select, setSelect] = useState("Sales");

  return (
   <div className="pt-6 flex flex-col gap-6 w-full min-h-screen items-center sm:w-3/4 mx-auto max-w-[800px]">
      
      {/* heading */}
      <h1 className="">Sales Ledger or Purchase Ledger ?</h1>

      {/* button */}
      <div className="flex gap-3">
       <button className={`border p-3 rounded-md hover:scale-95 transition ${select =="Sales" ? 'bg-white text-black shadow-md shadow-white' :''}`}onClick={()=>{setSelect("Sales")}}>Sales Ledger</button>
       <button className={`border p-3 rounded-md hover:scale-95 transition ${select == "Purchase" ? 'bg-white text-black shadow-md shadow-white':''}`}onClick={()=>{setSelect("Purchase")}}>Purchase Ledger</button>
      </div>
      
      {/*  */}
      <div className="w-full">
        {select == "Sales"? <SalesLedger/>:<PurchaseLedger/>}
      </div>

   </div>
  );
}

export default Ledger;