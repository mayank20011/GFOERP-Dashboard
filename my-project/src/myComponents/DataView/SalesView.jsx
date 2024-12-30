import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterComponent from "../filterComponent/FilterComponent";
import { toast } from "react-toastify";
import Table from "../Table/Table.jsx";

function SalesView() {
  const [vendorsName, setVendorsName] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // for clients Loading and clients Fetching
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clients, setClients] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  // for salesData loading and fetching
  const [salesDataLoading, setSalesDataLoading] = useState(false);
  const [salesData, setSalesData] = useState(null);

  // for getting vendorName
  useEffect(() => {
    axios
      .get("https://gfo-erp-backend-api.vercel.app/GFOERP/ProductsVendors/")
      .then((response) => {
        setVendorsName(response.data.data);
      })
      .catch(() => {
        toast.error("Server Problem, While Fetching Data");
      });
  }, []);

  // for getting clientsName
  useEffect(() => {
    if (selectedVendor) {
      setSelectedClient(null);
      setSalesData(null);
      setClientsLoading(true);
      axios
        .get(
          `https://gfo-erp-backend-api.vercel.app/GFOERP/RouteClient/${selectedVendor.name}`
        )
        .then((response) => {
          setClients(response.data.data);
          setClientsLoading(false);
        })
        .catch((err) => {
          toast.error("Server problem");
          setClientsLoading(false);
        });
    }
  }, [selectedVendor]);

  // for getting salesdata
  useEffect(() => {
    if (selectedClient) {
      setSalesDataLoading(true);
      axios
        .get(
          `https://gfo-erp-backend-api.vercel.app/GFOERP/SalesData/${selectedVendor.name}/${selectedClient.name}`
        )
        .then((response) => {
          if (response.status == 201) {
            setSalesData(response.data.data);
            setSalesDataLoading(false);
          } else {
            toast.error(response.data.message);
            setSalesDataLoading(false);
          }
        })
        .catch((err) => {
          toast.error(`Server Problem, While Loading Client Data`);
          console.log(err);
          setSalesDataLoading(false);
        });
    }
  }, [selectedClient]);

  if (!vendorsName) {
    return (
      <p className="text-center mt-4">
        Loading <span className="animate-pulse"> . . .</span>
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col justify-center py-4 md:py-0 space-y-4">
      {/* for Heading */}
      <h1 className="text-2xl text-center">Sales Data</h1>

      {/* for selecting vendor */}
      {vendorsName ? (
        <div className="">
          <h1>Select vendor :</h1>
          <FilterComponent
            clients={vendorsName}
            setSelectedVendor={setSelectedVendor}
          />
        </div>
      ) : null}

      {/* for selecting clients */}
      {selectedVendor == null ? null : clientsLoading ? (
        <p className="text-center">
          Loading Client Names <span className="animate-pulse">. . .</span>
        </p>
      ) : clients == null ? null : (
        <div className="">
          <h1>Select Client Name : </h1>
          <FilterComponent
            clients={clients}
            setSelectedVendor={setSelectedClient}
          />
        </div>
      )}

      {/* For Data View */}
      {selectedClient ? (
        salesDataLoading ? (
          <p>
            Loading data <span className="animate-pulse">. . .</span>
          </p>
        ) : salesData ? (
          <Table 
          headings={selectedVendor.products} 
          data={salesData}
          pos="Sale" />
        ) : (
          <p>Vendor Has No Data Till Date</p>
        )
      ) : null}
    </div>
  );
}
export default SalesView;
