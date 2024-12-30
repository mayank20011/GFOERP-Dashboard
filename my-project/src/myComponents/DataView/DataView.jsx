import React from "react";
import { useState } from "react";
import SalesView from "./SalesView.jsx";
import PurchaseView from "./PurchaseView.jsx";

function DataView() {
  const [view, setView] = useState(null);

  return (
    <div className="flex gap-4 justify-center flex-col py-6">
      <h1 className="text-xl text-center">
        Choose Which data You Want to see ?
      </h1>

      <div className="flex gap-4 self-center">
        <button
          className={`px-4 py-2 border rounded-md shadow-md shadow-slate-100 hover:scale-95 transition ${
            view === "Sale" ? "text-black bg-white" : "text-white"
          }`}
          onClick={() => {
            setView("Sale");
          }}
        >
          Sales Data
        </button>
        <button
          className={`px-4 py-2 border rounded-md shadow-md shadow-slate-100 hover:scale-95 transition ${
            view === "Purchase" ? "text-black bg-white" : "text-white"
          }`}
          onClick={() => {
            setView("Purchase");
          }}
        >
          Purchase Data
        </button>
      </div>

      {view == null ? null : view == "Sale" ? <SalesView /> : <PurchaseView />}
    </div>
  );
}

export default DataView;
