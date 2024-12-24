import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FilterComponent from "../filterComponent/FilterComponent";
import { toast } from "react-toastify";

function DeleteAuthorities() {
  
  const [authorities, setAuthorities] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleSubmit(e){
    e.preventDefault();
    // api end point
    axios.delete(`http://localhost:5000/GFOERP/UserLogin/${selectedClient._id}`)
    .then((response)=>
      {
        if(response.data.success){
           toast.success("Deleted Successfully");
           setSelectedClient(null);
        }
        else{
          toast.error("Something Went Wrong, Try Again");
        }
      })
    .catch((err)=>{
      toast.error("Server Problem");
      console.log(err);
    });
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/GFOERP/UserLogin")
      .then((response) => {
        setAuthorities(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-2">Loading Authorities Name ....</p>;
  }

  return (
    <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6 sabp:w-4/5">
      <h1 className="text-3xl font-bold text-center">Delete Authority</h1>

      <FilterComponent
        clients={authorities}
        setSelectedVendor={setSelectedClient}
      />
      {/* for form */}

      {selectedClient === null ? null : (
        <form
          action=""
          className="space-y-3 w-full border rounded-md border-red-600 p-3"
          onSubmit={handleSubmit}
        >
          {/* for AuthorityName div */}
          <div>
            <h1>Name :</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md cursor-not-allowed"
              name="name"
              value={`${selectedClient.name}`}
              readOnly
            />
          </div>

          {/* for Password  */}
          <div>
            <h1>Password :</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md cursor-not-allowed"
              name="password"
              value={`${selectedClient.password}`}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 p-3 px-5 rounded-md hover:scale-95 transition"
          >
            Delete Authority
          </button>
        </form>
      )}
    </div>
  );
}

export default DeleteAuthorities;
