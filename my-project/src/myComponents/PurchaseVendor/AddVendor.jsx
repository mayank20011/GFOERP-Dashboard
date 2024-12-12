import React from "react";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddVendor() {
  const nameE = useRef(null);
  const phoneNoE = useRef(null);
  const vechileNoE = useRef(null);
  const fatE = useRef(null);
  const snfE = useRef(null);

  // To handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    if (nameE.current.value === "") {
      toast.error("Name Can Not be Empty");
    } else if (phoneNoE.current.value === "") {
      toast.error("Enter Atleast 1 Phone Number");
    } else if (vechileNoE.current.value === "") {
      toast.error("Enter Atleast 1 Vechile NUmber");
    } else if (fatE.current.value === "") {
      toast.error("Enter Fat Value");
    } else if (snfE.current.value === "") {
      toast.error("Enter Snf Value");
    } else {
      const formData = new FormData(e.target);
      let dataToBeSend = {
        name: "",
        phoneNumber: [],
        vechileNumber: [],
      };
      for (const [key, value] of formData.entries()) {
        if (key.startsWith("phoneNumber")) {
          dataToBeSend["phoneNumber"].push(value);
        } else if (key.startsWith("vechileNumber")) {
          dataToBeSend["vechileNumber"].push(value);
        } else {
          dataToBeSend[`${key}`] = value;
        }
      }
      console.log(dataToBeSend);

      if (dataToBeSend.balanceAmount === "") {
        dataToBeSend.balanceAmount = 0;
      }

      dataToBeSend.fatRate= + dataToBeSend.fatRate;
      dataToBeSend.snfRate= + dataToBeSend.snfRate;
      dataToBeSend.balanceAmount= + dataToBeSend.balanceAmount;


      //  lets make endpoint here
      axios
        .post("", dataToBeSend)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6">
      {/* for heading */}
      <h1 className={`text-3xl font-bold text-center `}>Add New Vendor</h1>

      {/* for form */}
      <form action="" className="space-y-2" onSubmit={handleSubmit}>
        {/* for vendorName div */}
        <div className="">
          <h1>Enter Vendor Name :</h1>
          <input
            type="text"
            className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
            name="name"
            ref={nameE}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* for phone Number1 div */}
          <div className="">
            <h1>Phone Number 1:</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
              name="phoneNumber-1"
              ref={phoneNoE}
            />
          </div>

          {/* for phone Number2 div */}
          <div className="">
            <h1>Phone Number 2:</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
              name="phoneNumber-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* for Vechile no-1 div */}
          <div className="">
            <h1>Vechile No-1:</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
              name="vechileNumber-1"
              ref={vechileNoE}
            />
          </div>

          {/* for vechile no-2 div */}
          <div className="">
            <h1>Vechile No-2 :</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
              name="vechileNumber-2"
            />
          </div>

          {/* for vechile no-3 div */}
          <div className="">
            <h1>Vechile No-3 :</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
              name="vechileNumber-3"
            />
          </div>
        </div>

        {/* for fatRate div */}
        <div className="">
          <h1>Enter Fat Rate :</h1>
          <input
            type="text"
            className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
            name="fatRate"
            ref={fatE}
          />
        </div>

        {/* for snfRate  div */}
        <div className="">
          <h1>Enter Snf Rate :</h1>
          <input
            type="text"
            className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
            name="snfRate"
            ref={snfE}
          />
        </div>

        {/* Enter Balance Amount */}
        <div className="">
          <h1>Enter Balance Amount :</h1>
          <input
            type="text"
            className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
            name="balanceAmount"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 p-3 px-5 rounded-md hover:scale-95 transition"
        >
          Create Venvor
        </button>
      </form>
    </div>
  );
}

export default AddVendor;

