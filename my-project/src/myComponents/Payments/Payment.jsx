import React from "react";
import { useState } from "react";
import PaymentPaid from "./PaymentPaid.jsx";
import PaymentReceived from "./PaymentRecieved.jsx";

function payment() {
  const [select, setSelect] = useState("Pay");

  return (
    <div className="pt-6 flex flex-col min-h-screen gap-4 items-center">
      {/* heading */}
      <p className="text-center text-2xl">
        <span className="text-green-600">Payment Received? </span>or
        <span className="text-red-600"> Paying?</span>
      </p>

      {/* buttons */}
      <div className="flex gap-3">
        <button
          className={`border p-3 rounded-md hover:scale-95 transition ${
            select == "Pay" ? "bg-white text-black shadow-md shadow-white" : ""
          }`}
          onClick={() => {
            setSelect("Pay");
          }}
        >
          Paying ?
        </button>
        <button
          className={`border p-3 rounded-md hover:scale-95 transition ${
            select == "Receive"
              ? "bg-white text-black shadow-md shadow-white"
              : ""
          }`}
          onClick={() => {
            setSelect("Receive");
          }}
        >
          Received ?
        </button>
      </div>

      {/* For Paying and receiving */}
      <div className="w-full">
        {select == "Pay" ? <PaymentPaid /> : <PaymentReceived />}</div>
    </div>
  );
}

export default payment;
