import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FilterComponent from "../filterComponent/FilterComponent";
import Table from "../Table/Table.jsx";

function PurchaseView() {
  const [vendorsName, setVendorsName] = useState(null);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // for getting specific client's data
  const [specificClientDataHeadings, setSpecificClientDataHeadings] =
    useState(null);
  const [specificClientData, setSpecificClientData] = useState(null);
  const [clientDataLoading, setClientDataLoading] = useState(false);

  useEffect(() => {
    setClientsLoading(true);
    if (vendorsName == null) {
      axios
        .get("https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseData/")
        .then((response) => {
          response.data.data.forEach((obj) => {
            obj["name"] = obj.vendorName;
            delete obj.vendorName;
          });
          setVendorsName(response.data.data);
          setClientsLoading(false);
        })
        .catch((err) => {
          toast.error("Server Problem");
          setClientsLoading(false);
        });
    }
  }, []);

  // for getting a specific vendor's data
  useEffect(() => {
    if (selectedVendor) {
      setClientDataLoading(true);
      axios
        .get(`https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseData/${selectedVendor._id}`)
        .then((response) => {
          if (response.data.success) {
            const headings = [
              { productName: "amount" },
              { productName: "fat" },
              { productName: "clr" },
              { productName: "snfValue" },
              { productName: "vechileNumber" },
              { productName: "money" },
            ];

            let dataArray = [];

            response.data.data.forEach((obj) => {
              let createdData = { productsSold: [], time: {},vendorName:"" };

              for (const [key, value] of Object.entries(obj)) {
                if (key === "dateAndTime") {
                  createdData.time = value;
                } else {
                  if (key === "purchasingRates") {
                    for (const [k, v] of Object.entries(value)) {
                      createdData.productsSold.push({
                        name: `${k}`,
                        quantity: `${v}`,
                      });
                    }
                  } else {
                    createdData.productsSold.push({
                      name: `${key}`,
                      quantity: `${value}`,
                    });
                  }
                }
              }
              createdData.vendorName=selectedVendor.name;
              console.log(createdData);
            });
            
            setSpecificClientDataHeadings(headings);
            setSpecificClientData(dataArray);
          }
          setClientDataLoading(false);
        })
        .catch((err) => {
          toast.error("Server Problem");
          setClientDataLoading(false);
        });
    }
  }, [selectedVendor]);

  if (clientsLoading) {
    return (
      <p className="text-center">
        Loading <span className="animate-ping"> . . .</span>
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col justify-center py-4 md:py-0 space-y-4">
      <h1 className="text-center text-2xl">Purchase Data</h1>

      <div>
        <h1>Select Vendor :</h1>
        <FilterComponent
          clients={vendorsName}
          setSelectedVendor={setSelectedVendor}
        />
      </div>

      {selectedVendor ? (
        specificClientDataHeadings && specificClientData ? (
          <Table
            headings={specificClientDataHeadings}
            data={specificClientData}
            pos="Purchase"
          />
        ) : null
      ) : clientDataLoading ? (
        <p className="text-center">
          Loading Clients Data <span className="animate-pulse">. . .</span>
        </p>
      ) : null}
    </div>
  );
}

export default PurchaseView;
