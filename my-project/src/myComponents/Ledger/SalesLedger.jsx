import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LedgerTable from "../Table/LedgerTable.jsx";
import FilterComponent from "../filterComponent/FilterComponent.jsx";

function SalesLedger() {
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [specificVendorClients, setSpecificVendorClients] = useState(null);
  const [clientsLoading, setClientsLoading] = useState(null);

  function fetchData() {
    axios
      .get("https://gfo-erp-backend-api.vercel.app/GFOERP/ProductsVendors/")
      .then((res) => {
        if (res.data) {
          setFetchedData(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Fetching Data");
        setLoading(false);
      });
  }

  useEffect(() => {
    if (fetchedData == null) {
      fetchData();
    }
    if (fetchedData != null && selectedVendor) {
      setClientsLoading(true);
      axios
        .get(
          `https://gfo-erp-backend-api.vercel.app/GFOERP/RouteClient/${selectedVendor.name}`
        )
        .then((res) => {
          setSpecificVendorClients(res.data.data);
          setClientsLoading(false);
        })
        .catch((err) => {
          setClientsLoading(false);
          toast.error("Server Problem");
          console.log(err);
        });
    }
  }, [selectedVendor]);

  if (loading) {
    return (
      <p className="text-center">
        Loading <span className="animate-pulse">. . .</span>
      </p>
    );
  }

  return (
    <>
      {fetchData ? (
        <div className="w-full space-y-4 grid">
          {/* For Selecting Product Vendor*/}
          <div>
            <p>Select product Vendor</p>
            <FilterComponent
              clients={fetchedData}
              setSelectedVendor={setSelectedVendor}
            />
          </div>

          {/* For Table*/}
          <div className="w-full  overflow-x-auto">
            {clientsLoading ? (
              <p className="text-center">
                Loading Clients Data
                <span className="animate-pulse">. . .</span>
              </p>
            ) : specificVendorClients ? (
              <div className="w-full space-y-2">
                <LedgerTable
                  headings={["name", "balanceAmount"]}
                  fetchedData={specificVendorClients}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SalesLedger;
