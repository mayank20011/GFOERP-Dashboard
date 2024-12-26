import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FilterComponent from "../filterComponent/FilterComponent";

function DeleteClient() {
  // for vendor selection
  const form = useRef(null);
  const [vendors, setVendors] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [loading, setLoading] = useState(false);

  // to fetch clients of a specifiv vendor
  const [clients, setClients] = useState(null);
  const [clientLoading, setClientLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

  // for input changes
  const [nameValue, setNameValue] = useState("");

  // for getting vendorNames and their _id from the server when component render
  useEffect(() => {
    if (vendors === null) {
      axios
        .get("https://gfo-erp-backend-api.vercel.app/GFOERP/ProductsVendors/vendorNames")
        .then((response) => {
          if (response.data.success) {
            setVendors(response.data.data);
          } else {
            toast.error("Something Went Wrong !!!");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Server Problem");
        });
    }
  }, []);

  // for handling submit
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .delete(`https://gfo-erp-backend-api.vercel.app/GFOERP/RouteClient/${selectedClient._id}`)
      .then((response) => {
        if (response.data.success) {
          toast.success(`Deleted SuccessFully`);
          setSelectedVendor(null);
          setSelectedClient(null);
        } else {
          toast.error("Something Went Wrong");
        }
      })
      .catch((error) => {
        console.log("Server Error");
        console.log(error);
      });
  }

  function loadClients() {
    const reqURL = `https://gfo-erp-backend-api.vercel.app/GFOERP/RouteClient/${selectedVendor.name}`;
    axios
      .get(reqURL)
      .then((response) => {
        if (response.data.success) {
          setClients(response.data.data);
        } else {
          toast.error(`${response.data.message}`);
        }
      })
      .catch((err) => {
        console.log(`err is :${err}`);
        toast.error("Server Problem");
      });
  }

  useEffect(() => {
    if (selectedVendor != null) {
      setClients(null);
      setSelectedClient(null);
    }
  }, [selectedVendor]);

  useEffect(() => {
    if (selectedClient) {
      setNameValue(selectedClient.name);
    }
  }, [selectedClient]);

  return (
    <div className="text-white my-6 w-full md:w-3/5 mx-auto p-3 flex flex-col gap-6 sabp:w-4/5">
      {/* for heading */}
      <h1 className={`text-3xl font-bold text-center `}>Delete Client ? </h1>

      {/* for form */}
      <form action="" className="space-y-2" onSubmit={handleSubmit} ref={form}>
        {/* for vendorName div */}
        {vendors ? (
          <div className="">
            <h1>Select Client's Vendor Name :</h1>
            <FilterComponent
              clients={vendors}
              setSelectedVendor={setSelectedVendor}
            />
          </div>
        ) : (
          <p className="animate-pulse">Loading Vendor Names ...</p>
        )}

        {/* for client name */}
        {selectedVendor == null ? null : clients ? (
          <div className="">
            <h1>Select Client Name :</h1>
            <FilterComponent
              clients={clients}
              setSelectedVendor={setSelectedClient}
            />
          </div>
        ) : (
          loadClients()
        )}

        {selectedClient ? (
          <div className="w-full border-2 border-red-600 rounded-md p-3 select-none cursor-not-allowed">
            <h1>Edit Client Name :</h1>
            <input
              type="text"
              placeholder="Edit Name ..."
              value={nameValue}
              name="clientName"
              className="w-full rounded-md p-2 bg-transparent border-2 cursor-not-allowed outline-none"
              readOnly
            />
          </div>
        ) : null}

        {selectedClient ? (
          <button
            type="submit"
            className="bg-green-600 p-3 px-5 rounded-md hover:scale-95 transition"
          >
            {loading ? (
              <p className="animate-pulse">Deleting Client ...</p>
            ) : (
              <p>Delete Client</p>
            )}
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default DeleteClient;
