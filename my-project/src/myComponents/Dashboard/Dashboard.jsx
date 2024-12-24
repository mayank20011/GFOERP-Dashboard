import React from "react";
import Authority from "../Authorities/Authority.jsx";
import ProductVendor from "../productsVendors/ProductVendor.jsx";
import AddPurchaseVendor from "../PurchaseVendor/AddPurchaseVendor.jsx";
import { useState, useRef } from "react";
import Clients from "../Clients/clients.jsx";

function Dashboard() {
  const nav = useRef(null);
  const [showComponent, setShowComponent] = useState("Purchase");

  function navInOut(e) {
    nav.current.classList.remove("mv:-translate-x-full");
  }

  function closeNav() {
    nav.current.classList.add("mv:-translate-x-full");
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
            className="flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none"
            onClick={() => {
              closeNav();
              setShowComponent("Purchase");
            }}
          >
            <i className="fa-solid fa-truck text-neutral-700 dark:text-neutral-200 w-5 h-5 flex-shrink-0"></i>
            <p>Purchase Vendor</p>
          </div>

          <div
            className="flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none"
            onClick={() => {
              closeNav();
              setShowComponent("Product");
            }}
          >
            <i className="fa-regular fa-user text-neutral-700 w-5 h-5 dark:text-neutral-200 flex-shrink-0"></i>
            <p>Sales Vendor</p>
          </div>

          <div
            className="flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none"
            onClick={() => {
              closeNav();
              setShowComponent("Authority");
            }}
          >
            <i className="fa-solid fa-user-plus text-neutral-700 dark:text-neutral-200 w-5 h-5 flex-shrink-0"></i>
            <p>Add Authority</p>
          </div>

          <div
            className="flex gap-4 items-center p-3 border cursor-pointer hover:scale-95 transition mv:border-none"
            onClick={() => {
              closeNav();
              setShowComponent("Client");
            }}
          >
            <i className="fa-regular fa-user text-neutral-700 w-5 h-5 dark:text-neutral-200 flex-shrink-0"></i>
            <p>Clients</p>
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
      <div className="rounded-tl-xl bg-neutral-900 grow md:py-6 px-6 h-screen overflow-y-auto">
        {/* For Content */}
        {showComponent === "Purchase" ? (
          <AddPurchaseVendor />
        ) : showComponent === "Authority" ? (
          <Authority />
        ) : showComponent === "Product" ? (
          <ProductVendor />
        ) : showComponent === "Client" ? (
          <Clients />
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
