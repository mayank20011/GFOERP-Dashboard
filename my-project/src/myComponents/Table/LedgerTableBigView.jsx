import React from "react";
import styles from "./LedgerTableBigView.module.css";

function LedgerTableBigView() {
  // const [fetchingParticularClientData, setFetchingParticularClientData] = useState(false);
  // const [clientData, setClientData] = useState(null);

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
 
      <div className={`bg-white w-[calc(100%-38px)] mx-auto ${styles.whiteBgAnimation}`}></div>

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
