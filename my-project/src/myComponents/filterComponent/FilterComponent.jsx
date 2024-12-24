import React from "react";
import { useState, useRef } from "react";

// This component will take a array of obj as input and then create a list from the names from the objects

function FilterComponent({ clients, setSelectedVendor }) {

  // to create a copy of clients for applying filter
  const [copyClients, setCopyClients] = useState(clients);

  // refrence for the input 
  const nameInput = useRef(null);

  // to open and close list
  const [openList, setOpenList] = useState(false);

  // to handle onChange event of input field
  function handlKeyStrokes(e) {
    const filteredClients = clients.filter((client) =>
      client.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setCopyClients(filteredClients);
  }

  // to handle name clicked from name list
  function nameClicked(e, client) {
    nameInput.current.value = e.target.textContent;
    setSelectedVendor(client);
    setOpenList(false);
  }

  return (
    <div className="w-full relative">
      {/* for input */}
      <input
        type="text"
        placeholder="Enter Vendor Name ..."
        className="w-full outline-none h-12 border-2 rounded-md cursor-pointer px-4 bg-neutral-900"
        name="vendorName"
        onClick={() => {
          setOpenList(true);
        }}
        onChange={handlKeyStrokes}
        ref={nameInput}
      />

      {/* for List */}
      {openList ? (
        <div className="absolute border-2 border-slate-200 w-full mt-[10px] p-3 z-50 flex flex-col gap-1 min-h-fit max-h-80 overflow-y-auto rounded-md bg-neutral-900">
          {copyClients.map((client) => (
            <div
              className="text-bold text-green-600 bg-slate-100 p-2 rounded-sm cursor-pointer hover:scale-95 transition font-bold"
              // onClick={nameClicked}
              onClick={(e) => {
                nameClicked(e, client);
              }}
              key={client.name}
            >
              {client.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FilterComponent;
