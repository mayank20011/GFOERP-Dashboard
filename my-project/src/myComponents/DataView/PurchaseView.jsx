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
        .get("https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseVendors/names")
        .then((response) => {
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
      setSpecificClientData(null);
      setClientDataLoading(true);
      axios
        .get(`https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseData/${selectedVendor.name}`)
        .then((response) => {
          if (response.data.data.length>0) {
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
              let createdData = { productsSold: [], time: {}, vendorName: "" };
              createdData.vendorName = obj.vendorName;
              createdData.time = obj.purchaseRecord.dateAndTime;

              for (const [key, value] of Object.entries(obj.purchaseRecord)) {
                if (key === "PurchasingRates") {
                  for (const [k, v] of Object.entries(value)) {
                    createdData.productsSold.push({
                      name: `${k}`,
                      quantity: `${v}`,
                    });
                  }
                } else if(key == "dateAndTime"){

                }
                else {
                  createdData.productsSold.push({
                    name: `${key}`,
                    quantity: `${value}`,
                  });
                }
              }

              createdData.vendorName = selectedVendor.name;
              dataArray.push(createdData);
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
