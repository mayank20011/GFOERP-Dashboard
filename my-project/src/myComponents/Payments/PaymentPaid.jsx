import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FilterComponent from "../filterComponent/FilterComponent";

function PaymentPaid() {
  const [loading, setLoading] = useState(true);
  const [purchaseVendorsData, setPurchaseVendorsDate] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  function fetchData() {
    axios
      .get("https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseVendors/")
      .then((res) => {
        if (res.data) {
          setPurchaseVendorsDate(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Error While Fetching Data");
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-white">
        Loading vendors Data <span className="animate-ping">. . .</span>
      </p>
    );
  }

  return (
    <div className="text-white w-full">
      {purchaseVendorsData ? (
        <div className="space-y-4">
          {/* For dropdown */}
          <div>
            <p>Select Vendor :</p>
            <FilterComponent
              clients={purchaseVendorsData}
              setSelectedVendor={setSelectedVendor}
            />
          </div>

          {/* if selectedVendor */}
          {selectedVendor ? (
            <div className="space-y-4">
              
              {/* For payment that we are giving */}
              <div className="">
                <p>Ammount That You are paying :</p>
                <input
                  type="number"
                  className="bg-transparent outline-none border-2 rounded-md p-2 w-full"
                />
              </div>

              {/* for balance*/}
              <div>
                <p>Balance Amount :</p>
                <input
                  type="text"
                  className="bg-transparent outline-none border-2 rounded-md p-2 w-full"
                  value={selectedVendor.balanceAmount}
                />
              </div>
              
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default PaymentPaid;
