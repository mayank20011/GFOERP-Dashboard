import React from "react";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddVendor() {
  const [loading, setLoading] = useState(false);

  // for clearing form
  const form = useRef(null);

  // To handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let dataToBeSend = {
      name: "",
      phoneNumber: [],
      vechileNumber: [],
    };

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
        dataToBeSend[`${key}`] = value;
      }
    }

    if (dataToBeSend.balanceAmount === "") {
      dataToBeSend.balanceAmount = 0;
    }

    dataToBeSend.fatRate = +dataToBeSend.fatRate;
    dataToBeSend.snfRate = +dataToBeSend.snfRate;
    dataToBeSend.balanceAmount = +dataToBeSend.balanceAmount;

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
      // to make vendor in purchaseData;
      const vendorPurchaseDataSkeleton = {
        vendorName: `${dataToBeSend.name}`,
        purchaseRecord: [],
      };
      //  lets make endpoint here
      setLoading(true);
      console.log({ dataToBeSend, vendorPurchaseDataSkeleton });
      axios
        .post(
          "https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseVendors/",
          {
            data: dataToBeSend,
            record: vendorPurchaseDataSkeleton,
          }
        )
        .then((response) => {
          if (response.data.success) {
            toast.success("Created Successfully");
            form.current.reset();
            setLoading(false);
          } else {
            setLoading(false);
            toast.error("Something Went Wrong, Try again");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something Went Wrong, Try Again");
          setLoading(false);
        });
    }
  }

  return (
    <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6 sabp:w-4/5">
      {/* for heading */}
      <h1 className={`text-3xl font-bold text-center `}>Add New Vendor</h1>

      {/* for form */}
      <form action="" className="space-y-2" onSubmit={handleSubmit} ref={form}>
        {/* for vendorName div */}
        <div className="">
          <h1>Enter Vendor Name :</h1>
          <input
            type="text"
            className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
            name="name"
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
          />
        </div>

        {/* for snfRate  div */}
        <div className="">
          <h1>Enter Snf Rate :</h1>
          <input
            type="text"
            className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
            name="snfRate"
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
          {loading ? (
            <p className="animate-pulse">Creating Vendor ...</p>
          ) : (
            <p>Create Vendor</p>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddVendor;
