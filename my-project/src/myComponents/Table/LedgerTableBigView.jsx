import React from "react";
import styles from "./LedgerTableBigView.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RecordTable from "./RecordTable.jsx";

function LedgerTableBigView({ selectedName, setShowLedger }) {
  const headings = [
    "Date",
    "Pending",
    "Cash",
    "Upi",
    "Other",
    "Total",
    "Remaining",
  ];
  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState(null);

  function fetchData() {
    axios
      .get(`https://gfo-erp-backend-api.vercel.app/GFOERP/PaymentRecords/${selectedName._id}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.data);
          setClientData(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`Error while Fetching ${selectedName} Data`);
        console.log(err);
        setLoading(false);
      });
  }

  function close() {
    setShowLedger(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <p className="text-center">
        Loading <span className="animate-ping">. . .</span>
      </p>
    );
  }

  return (
    <>
      {clientData == null ? null : (
        <div className="sm:w-3/4 mx-auto max-w-[900px] w-full flex flex-col">
          {/* first Pillar */}

          <div className="flex">
            <div className="w-[19px]">
              <span className="bg-yellow-600 text-yellow-600 rounded-full w-10">
                ....
              </span>
              <span className="bg-yellow-600 text-yellow-600 rounded-full w-10">
                ..
              </span>
            </div>

            <div className="grow bg-red-600 text-red-600">.</div>

            <div className="w-[19px]">
              <span className="bg-yellow-600 text-yellow-600 rounded-full w-10">
                ..
              </span>
              <span className="bg-yellow-600 text-yellow-600 rounded-full w-10">
                ....
              </span>
            </div>
          </div>

          {/* in this div our content will show */}

          <div
            className={`bg-white w-[calc(100%-38px)] mx-auto ${styles.whiteBgAnimation} text-black relative`}
          >
            <div className="m-2 h-full flex gap-2">
              <p
                className="font-bold text-xl absolute right-4 cursor-pointer select-none"
                onClick={close}
              >
                X
              </p>

              {/* for viewing data */}
              <div className="w-full h-full flex">
                {clientData.length === 0 ? (
                  <p className="mt-4 font-bold">
                    Currently No Record With This Vendor
                  </p>
                ) : (
                  <div className="w-full h-full flex flex-col gap-4 grow">

                    {/* Pending Balance */}
                    <p className="font-bold">
                      Pending Amount : 
                      <span className="font-normal">
                        {` ${clientData[0].pendingAmount}`}
                      </span>
                      <span className="text-sm font-normal">Rs.</span>
                    </p>

                    <div className="w-full grow overflow-y-scroll">
                      <RecordTable headings={headings} data={clientData.reverse()} />
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Second Pillar */}

          <div className="flex">
            <div className="w-[19px]">
              <span className="bg-yellow-600 text-yellow-600 rounded-full w-10">
                ....
              </span>
              <span className="bg-yellow-600 text-yellow-600 rounded-full w-10">
                ..
              </span>
            </div>

            <div className="grow bg-red-600 text-red-600">.</div>

            <div className="w-[19px]">
              <span className="bg-yellow-600 text-yellow-600 rounded-full w-10">
                ..
              </span>
              <span className="bg-yellow-600 text-yellow-600 rounded-full w-10">
                ....
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LedgerTableBigView;
