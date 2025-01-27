import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FilterComponent from "../filterComponent/FilterComponent";

function UpdateClients() {
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
 const [balanceValue, setBalanceValue]=useState("");

  // for getting vendorNames and their _id from the server when component render
  useEffect(() => {
    if (vendors === null) {
      axios
        .get(
          "https://gfo-erp-backend-api.vercel.app/GFOERP/ProductsVendors/vendorNames"
        )
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
    const dataToSend = {};
    dataToSend[`_id`] = selectedClient._id;
    dataToSend[`clientName`] = nameValue;
    dataToSend[`balanceAmount`]= balanceValue;
    if (dataToSend.clientName != "") {
      axios
        .put(
          "https://gfo-erp-backend-api.vercel.app/GFOERP/RouteClient/",
          dataToSend
        )
        .then((response) => {
          if (response.data.success) {
            toast.success(`Updated SuccessFully`);
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
    } else {
      toast.error("Enter Client Name");
    }
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
      setBalanceValue(selectedClient.balanceAmount);
    }
  }, [selectedClient]);

  function changeClientName(e) {
    setNameValue(e.target.value);
  }

  function changeBalanceAmount(e){
    setBalanceValue(e.target.value);
  }

  return (
    <div className="text-white my-6 w-full md:w-3/5 mx-auto p-3 flex flex-col gap-6 sabp:w-4/5">
      {/* for heading */}
      <h1 className={`text-3xl font-bold text-center `}>Update Client ? </h1>

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
          <div className="w-full border-2 border-red-600 rounded-md p-3 space-y-4">
            
            {/* For Name */}
            <div>
              <h1>Edit Client Name :</h1>
              <input
                type="text"
                placeholder="Edit Name ..."
                value={nameValue}
                name="clientName"
                className="w-full rounded-md p-2 bg-transparent border-2"
                onChange={changeClientName}
              />
            </div>

            {/* For Balance */}
            <div>
              <h1>Edit Balance Amount :</h1>
              <input
                type="number"
                placeholder="Edit Balance Amount ..."
                value={balanceValue}
                name="balanceAmount"
                className="w-full rounded-md p-2 bg-transparent border-2"
                onChange={changeBalanceAmount}
                onWheel={(e)=>{e.target.blur()}}
              />
            </div>

          </div>
        ) : null}

        {selectedClient ? (
          <button
            type="submit"
            className="bg-green-600 p-3 px-5 rounded-md hover:scale-95 transition"
          >
            {loading ? (
              <p className="animate-pulse">Updating Client ...</p>
            ) : (
              <p>Update Client</p>
            )}
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default UpdateClients;
