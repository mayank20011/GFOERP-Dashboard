import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FilterComponent from "../filterComponent/FilterComponent";

function AddClients() {
  // for vendor selection
  const form = useRef(null);
  const [vendors, setVendors] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [loading, setLoading] = useState(false);

  // for getting data from the server
  useEffect(() => {
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
  }, []);

  // for handling submit
  function handleSubmit(e) {
    e.preventDefault();
    const dataToSend = {};
    const formData = new FormData(e.target);
    for (const [key, value] of formData.entries()) {
      dataToSend[`${key}`] = value;
    }
    if (dataToSend.clientName === "") {
      toast.error("Enter Client Name First");
    } else {
      console.log(dataToSend);
      setLoading(true);
      axios
        .post(
          "https://gfo-erp-backend-api.vercel.app/GFOERP/RouteClient/",
          dataToSend
        )
        .then((response) => {
          setLoading(false);
          if (response.data.success) {
            toast.success("Client Saved Successfully");
            form.current.reset();
            setSelectedVendor(null);
          } else {
            toast.error(`${response.data.message}`);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(`Server Problem`);
        });
    }
  }

  return (
    <div className="text-white my-6 w-full md:w-3/5 mx-auto p-3 flex flex-col gap-6 sabp:w-4/5">
      {/* for heading */}
      <h1 className={`text-3xl font-bold text-center `}>Add New Client</h1>

      {/* for form */}
      <form action="" className="space-y-2" onSubmit={handleSubmit} ref={form}>
        {/* for vendorName div */}
        {vendors ? (
          <div className="">
            <h1>Select Vendor Name :</h1>
            <FilterComponent
              clients={vendors}
              setSelectedVendor={setSelectedVendor}
            />
          </div>
        ) : (
          <p className="animate-pulse">Loading Vendor Names ...</p>
        )}

        {/* for fatRate div */}
        {selectedVendor ? (
          <div className="space-y-4 border p-4 rounded-md border-red-600">
            <div>
              <h1>Enter Client Name :</h1>
              <input
                type="text"
                className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                name="clientName"
              />
            </div>
            <div>
              <h1>Enter Balance Amount :</h1>
              <input
                type="number"
                className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                name="balanceAmount"
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </div>
        ) : null}

        {selectedVendor ? (
          <button
            type="submit"
            className="bg-green-600 p-3 px-5 rounded-md hover:scale-95 transition"
          >
            {loading ? (
              <p className="animate-pulse">Creating Client ...</p>
            ) : (
              <p>Create Client</p>
            )}
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default AddClients;
