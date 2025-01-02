import React from "react";
import styles from "./LedgerTableBigView.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function LedgerTableBigView({ selectedName, setShowLedger }) {
  
  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState(null);

  function fetchData() {
    axios
      .get(`/${selectedName}`)
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`Error while Fetching ${selectedName} Data`);
        console.log(err);
        setLoading(false);
      });
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
    <div className="w-full flex flex-col">
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

      <div
        className={`bg-white w-[calc(100%-38px)] mx-auto ${styles.whiteBgAnimation}`}
      ></div>

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
  );
}

export default LedgerTableBigView;
