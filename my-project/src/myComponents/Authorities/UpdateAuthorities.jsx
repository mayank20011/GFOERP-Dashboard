import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterComponent from "../filterComponent/FilterComponent.jsx";

function UpdateAuthorities() {
  const [authorities, setAuthorities] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const rights = [
    "sale",
    "purchase",
    "stock",
    "inventory",
    "labTesting",
    "batchCoding",
    "dashBoard",
  ];

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    roles: [],
  });

  // Update state when a client is selected
  useEffect(() => {
    if (selectedClient) {
      setFormData({
        name: selectedClient.name,
        password: selectedClient.password,
        roles: selectedClient.roles,
      });
    }
  }, [selectedClient]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    setFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          roles: [...prevData.roles, name],
        };
      } else {
        return {
          ...prevData,
          roles: prevData.roles.filter((role) => role !== name),
        };
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // const data = new FormData(e.target);
    const dataToSend = {
      name: formData.name,
      password: formData.password,
      roles: formData.roles,
    };
    
    console.log(dataToSend);
    axios
      .post("your-endpoint-url", dataToSend)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">Update New Authority</h1>

      <div>
        <h1>Select Name :</h1>
        <FilterComponent
          clients={authorities}
          setSelectedVendor={setSelectedClient}
        />
      </div>

      {/* for form */}
      {selectedClient ? (
        <form
          action=""
          className="space-y-3 rounded-md w-full border border-red-600 p-3"
          onSubmit={handleSubmit}
        >
          {/* for AuthorityName div */}
          <div>
            <h1>Name :</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* for Password  */}
          <div>
            <h1>Password :</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* for giving Rights div */}
          <div className="space-y-2">
            <h1>Select What They Can Access ?</h1>
            <div className="grid space-y-2">
              {rights.map((right) => (
                <div key={right} className="flex gap-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    name={right}
                    checked={formData.roles.includes(right)}
                    onChange={handleCheckboxChange}
                  />
                  <p>{right.charAt(0).toUpperCase() + right.slice(1)}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 p-3 px-5 rounded-md hover:scale-95 transition"
          >
            Update Authority
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default UpdateAuthorities;
