import React from "react";
import Authority from "../Authorities/Authority.jsx";
import ProductVendor from "../productsVendors/ProductVendor.jsx";
import AddPurchaseVendor from "../PurchaseVendor/AddPurchaseVendor.jsx";
import { useState, useRef } from "react";
import Clients from "../Clients/clients.jsx";
import DataView from "../DataView/DataView.jsx";
import Ledger from "../Ledger/Ledger.jsx";
import Payment from "../Payments/payment.jsx";

function Dashboard() {
  const nav = useRef(null);

  const [showComponent, setShowComponent] = useState("Purchase");

  function navInOut(e) {
    nav.current.classList.remove("mv:-translate-x-full");
  }

  function closeNav() {
    nav.current.classList.add("mv:-translate-x-full");
  }

  function createStringifyObj(text) {
    const obj = {
      handler: `${JSON.parse(sessionStorage.getItem("login")).handler}`,
      authorization: true,
      showComponent: `${text}`,
    };
    return JSON.stringify(obj);
  }

  return (
    <div className="flex text-white w-full min-h-screen bg-neutral-700 mv:flex-col">
      {/* for left Nav */}
      <div
        className="px-4 pr-6 py-12 bg-neutral-700  flex flex-col gap-6 w-[300px] mv:absolute mv:min-h-screen mv:w-full mv:z-50 mv:-translate-x-full transition duration-300"
        ref={nav}
      >
        {/* for Heading and logo */}

        <div
          className="text-right right-0 absolute pr-12 font-bold text-xl cursor-pointer hover:scale-95 transition hidden mv:block"
          onClick={closeNav}
        >
          X
        </div>

        <div>
          <h1 className="text-center text-xl font-bold text-green-600 mv:text-start px-4">
            Vardan Farms
          </h1>
        </div>

        {/* for clicks */}
        <div className="flex flex-col gap-2 p-2 space-y-2">
          <div
            className={`flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none ${
              JSON.parse(sessionStorage.getItem("login")).showComponent == "Purchase"
                ? "bg-white shadow-md shadow-white text-black"
                : ""
            }`}
            onClick={() => {
              closeNav();
              setShowComponent("Purchase");
              sessionStorage.setItem("login", createStringifyObj("Purchase"));
            }}
          >
            <i
              className={`fa-solid fa-truck w-5 h-5 flex-shrink-0 ${
                JSON.parse(sessionStorage.getItem("login")).showComponent == "Purchase" ? "text-neural-700" : "text-white"
              } `}
            ></i>
            <p>Purchase Vendor</p>
          </div>

          <div
            className={`flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none ${
              JSON.parse(sessionStorage.getItem("login")).showComponent == "Product"
                ? "bg-white shadow-md shadow-white text-black"
                : ""
            }`}
            onClick={() => {
              closeNav();
              setShowComponent("Product");
              sessionStorage.setItem("login", createStringifyObj("Product"));
            }}
          >
            <i
              className={`fa-regular fa-user text-neutral-700 w-5 h-5 flex-shrink-0 ${
                JSON.parse(sessionStorage.getItem("login")).showComponent == "Product" ? "text-neural-700" : "text-white"
              }`}
            ></i>
            <p>Sales Vendor</p>
          </div>

          <div
            className={`flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none ${
              JSON.parse(sessionStorage.getItem("login")).showComponent == "Authority"
                ? "bg-white shadow-md shadow-white text-black"
                : ""
            }`}
            onClick={() => {
              closeNav();
              setShowComponent("Authority");
              sessionStorage.setItem("login", createStringifyObj("Authority"));
            }}
          >
            <i
              className={`fa-solid fa-user-plus text-neutral-700 w-5 h-5 flex-shrink-0 ${
                JSON.parse(sessionStorage.getItem("login")).showComponent == "Authority" ? "text-neural-700" : "text-white"
              }`}
            ></i>
            <p>Add Authority</p>
          </div>

          <div
            className={`flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none ${
              JSON.parse(sessionStorage.getItem("login")).showComponent == "Client"
                ? "bg-white shadow-md shadow-white text-black"
                : ""
            }`}
            onClick={() => {
              closeNav();
              setShowComponent("Client");
              sessionStorage.setItem("login", createStringifyObj("Client"));
            }}
          >
            <i
              className={`fa-regular fa-user text-neutral-7 w-5 h-5 flex-shrink-0 ${
                JSON.parse(sessionStorage.getItem("login")).showComponent == "Client" ? "text-neural-700" : "text-white"
              }`}
            ></i>
            <p>Clients</p>
          </div>
          
          {/* see Data */}
          <div
            className={`flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none ${
              JSON.parse(sessionStorage.getItem("login")).showComponent == "viewData"
                ? "bg-white shadow-md shadow-white text-black"
                : ""
            }`}
            onClick={() => {
              closeNav();
              setShowComponent("viewData");
              sessionStorage.setItem("login", createStringifyObj("viewData"));
            }}
          >
            <i
              className={`fa-solid fa-database text-neutral-700 w-5 h-5 flex-shrink-0 ${
                JSON.parse(sessionStorage.getItem("login")).showComponent == "viewData" ? "text-neural-700" : "text-white"
              }`}
            ></i>
            <p>See Data</p>
          </div>

          <div
            className={`flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none ${
              JSON.parse(sessionStorage.getItem("login")).showComponent == "Ledger"
                ? "bg-white shadow-md shadow-white text-black"
                : ""
            }`}
            onClick={() => {
              closeNav();
              setShowComponent("Ledger");
              sessionStorage.setItem("login", createStringifyObj("Ledger"));
            }}
          >
            <i
              className={`fa-solid fa-money-check-dollar text-neutral-700 w-5 h- flex-shrink-0 ${
                JSON.parse(sessionStorage.getItem("login")).showComponent == "Ledger" ? "text-neural-700" : "text-white"
              }`}
            ></i>
            <p>Ledger</p>
          </div>

          <div
            className={`flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none ${
              JSON.parse(sessionStorage.getItem("login")).showComponent == "Payment"
                ? "bg-white shadow-md shadow-white text-black"
                : ""
            }`}
            onClick={() => {
              closeNav();
              setShowComponent("Payment");
              sessionStorage.setItem("login", createStringifyObj("Payment"));
            }}
          >
            <i
              className={`fa-solid fa-dollar text-neutral-700 w-5 h- flex-shrink-0 ${
                JSON.parse(sessionStorage.getItem("login")).showComponent == "Payment" ? "text-neural-700" : "text-white"
              }`}
            ></i>
            <p>Payments</p>
          </div>
        </div>
      </div>

      {/* For mobile nav */}
      <div
        className="w-full justify-end px-2 hidden mv:flex"
        onClick={navInOut}
      >
        <i className="fa-solid fa-bars p-2 cursor-pointer text-xl"></i>
      </div>

      <div className="rounded-tl-xl bg-neutral-900 grow md:py-6 px-6 h-screen overflow-y-auto ">
        {/* For Content */}
        {JSON.parse(sessionStorage.getItem("login")).showComponent ===
        "Purchase" ? (
          <AddPurchaseVendor />
        ) : JSON.parse(sessionStorage.getItem("login")).showComponent ===
          "Authority" ? (
          <Authority />
        ) : JSON.parse(sessionStorage.getItem("login")).showComponent ===
          "Product" ? (
          <ProductVendor />
        ) : JSON.parse(sessionStorage.getItem("login")).showComponent ===
          "Client" ? (
          <Clients />
        ) : JSON.parse(sessionStorage.getItem("login")).showComponent ===
          "viewData" ? (
          <DataView />
        ) : JSON.parse(sessionStorage.getItem("login")).showComponent ===
          "Ledger" ? (
          <Ledger />
        ) : JSON.parse(sessionStorage.getItem("login")).showComponent ===
          "Payment" ? (
          <Payment />
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
