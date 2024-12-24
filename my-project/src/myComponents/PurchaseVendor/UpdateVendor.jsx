import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import FilterComponent from "../filterComponent/FilterComponent.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateVendor() {

  const form=useRef(null);
  const [buttonLoading, setButtonLoading]=useState(null);
  const [vendorNames, setVendorNames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // State for form fields
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  const [fatRate, setFatRate] = useState("");
  const [snfRate, setSnfRate] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(e) {

    e.preventDefault();
    const formData = new FormData(e.target);

    let dataToBeSend = {
      name: "",
      phoneNumber: [],
      vechileNumber: [],
    };
    
    function resetForm()
    {
      setSelectedVendor(null);
    }

    // Iterate through FormData entries
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("phoneNumber")) {
        if (value != "") {
          dataToBeSend["phoneNumber"].push(value);
        }
      } else if (key.startsWith("vechileNumber")) {
        if (value != "") {
          dataToBeSend["vechileNumber"].push(value);
        }
      } else {
        dataToBeSend[key] = value;
      }
    }

    dataToBeSend._id=selectedVendor._id;

    dataToBeSend.fatRate = +dataToBeSend.fatRate;
    dataToBeSend.snfRate = +dataToBeSend.snfRate;
    dataToBeSend.balanceAmount = +dataToBeSend.balanceAmount;
    console.log(dataToBeSend);

    if (dataToBeSend.name === "") {
      toast.error("Enter Vendor Name");
    } else if (dataToBeSend.phoneNumber.length === 0) {
      toast.error("Enter Atleast 1 Phone Number");
    } else if (dataToBeSend.vechileNumber.length === 0) {
      toast.error("Enter Atleast 1 Vechile Number");
    } else if (dataToBeSend.fatRate === 0) {
      toast.error("Enter Fat Rate");
    } else if (dataToBeSend.snfRate === 0) {
      toast.error("Enter Snf Rate");
    } else {
      setButtonLoading(true);
      // End point for the container
      axios
        .put("http://localhost:5000/GFOERP/PurchaseVendors", dataToBeSend)
        .then((response) => {
          if(response.data.success)
            {
              toast.success("Updated Succeffully");
              resetForm();
              setButtonLoading(false);
            }
        })
        .catch((err) => {
          console.log(err);
          setButtonLoading(false);
        });
    }
  }

  // Update state when a vendor is selected
  useEffect(() => {
    if (selectedVendor) {
      setPhoneNumbers(selectedVendor.phoneNumber);
      setVehicleNumbers(selectedVendor.vechileNumber);
      setFatRate(selectedVendor.fatRate);
      setSnfRate(selectedVendor.snfRate);
      setBalanceAmount(selectedVendor.balanceAmount);
      setName(selectedVendor.name);
    }
  }, [selectedVendor]);

  // Fetch vendor names
  useEffect(() => {
    axios
      .get("http://localhost:5000/GFOERP/PurchaseVendors")
      .then((response) => {
        setVendorNames(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <p className="animate pulse text-center my-12">Loading ... </p>;
  }

  return (
    <div className="text-white my-6 w-full md:w-3/5 mx-auto p-3 flex flex-col gap-6 sabp:w-4/5">
      {/* for heading */}
      <h1 className="text-3xl font-bold text-center">Update Vendor :</h1>

      {/* for vendorName div */}
      <div className="">
        <h1>Select Vendor Name From The List:</h1>
        <FilterComponent
          clients={vendorNames}
          setSelectedVendor={setSelectedVendor}
        />
      </div>

      {/* for form */}
      <form
        action=""
        className={`space-y-2 rounded-md p-4 ${
          selectedVendor ? "border border-red-600" : ""
        }`}
        onSubmit={handleSubmit}
        ref={form}
      >
        {selectedVendor === null ? null : (
          <div className="space-y-2">
            {/* For Client Name */}
            <div className="">
              <h1>Update Client Name :</h1>
              <input
                type="text"
                className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            </div>

            {/* For Phone Number */}
            <div>
              <h1>Update Phone Number</h1>
              <div className="grid grid-cols-3 gap-3">
                {phoneNumbers.map((no, index) => (
                  <input
                    key={index}
                    className="border-2 rounded-md p-2 rounded-2 text-white bg-neutral-900 outline-none"
                    value={no}
                    onChange={(e) => {
                      const updatedNumbers = [...phoneNumbers];
                      updatedNumbers[index] = e.target.value;
                      setPhoneNumbers(updatedNumbers);
                    }}
                    name={`phoneNumber-${index}`}
                  />
                ))}
              </div>
            </div>

            {/* For Vehicle Number */}
            <div>
              <h1>Update Vehicle Number</h1>
              <div className="grid grid-cols-3 gap-3">
                {vehicleNumbers.map((no, index) => (
                  <input
                    key={index}
                    className="border-2 rounded-md p-2 rounded-2 text-white bg-neutral-900 outline-none"
                    value={no}
                    onChange={(e) => {
                      const updatedNumbers = [...vehicleNumbers];
                      updatedNumbers[index] = e.target.value;
                      setVehicleNumbers(updatedNumbers);
                    }}
                    name={`vechileNumber-${index}`}
                  />
                ))}
              </div>
            </div>

            {/* For Fat Rate */}
            <div className="">
              <h1>Update Fat Rate :</h1>
              <input
                type="text"
                className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                value={fatRate}
                onChange={(e) => setFatRate(e.target.value)}
                name="fatRate"
              />
            </div>

            {/* For SNF Rate */}
            <div className="">
              <h1>Update SNF Rate :</h1>
              <input
                type="text"
                className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                value={snfRate}
                onChange={(e) => setSnfRate(e.target.value)}
                name="snfRate"
              />
            </div>

            {/* For Balance Amount */}
            <div className="">
              <h1>Update Balance Amount :</h1>
              <input
                type="text"
                className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                name="balanceAmount"
              />
            </div>
          </div>
        )}

        {selectedVendor ? (
          <button
            type="submit"
            className="bg-green-600 p-3 px-5 rounded-md hover:scale-95 transition"
          >
            {buttonLoading ? <p className="animate-pulse">Updating ...</p>:<p>Update Vendor</p>}
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default UpdateVendor;
