import React from "react";
import { useState } from "react";
import LedgerTableBigView from "./LedgerTableBigView.jsx";

function LedgerTable({ headings, fetchedData }) {
  const [showLedger, setShowLedger] = useState(false);
  const [selectedName, setSelectedName] = useState(null);

  function clickedRow(obj) {
    setShowLedger(true);
    setSelectedName(obj.name);
  }

  // For Pagination
  const [dataPerPage, setDataPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const noOfpages = Math.ceil(fetchedData.length / dataPerPage);
  const dataToShow = fetchedData.slice(firstIndex, lastIndex);

  function prevPage() {
    if (currentPage == 1) {
      setCurrentPage(noOfpages);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage == noOfpages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      {showLedger == true ? (
        selectedName ? (
          <LedgerTableBigView
            selectedName={selectedName}
            setShowLedger={setShowLedger}
          />
        ) : null
      ) : (
        <div className="space-y-2 w-full">
          {/* table heading */}
          <p className="sticky left-0 text-2xl">Ledger Table</p>

          {/* Table */}
          <div className="w-full overflow-x-scroll">
            <table className="w-full overflow-x-scroll">
              {/* table heading */}
              <thead>
                <tr className="">
                  {headings.map((heading, index) => (
                    <th
                      className={`capitalize border min-w-[150px] ${
                        index === 0
                          ? "bg-green-600 sticky left-0"
                          : "bg-red-600"
                      }`}
                      key={index}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                {dataToShow.map((objTr, index) => (
                  <tr className="cursor-pointer" key={index}>
                    {headings.map((heading, index) => (
                      <th
                        className={`capitalize text-white border min-w-[150px] ${
                          index == 0 ? "bg-green-600 sticky left-0" : ""
                        }`}
                        key={heading}
                        onClick={() => {
                          clickedRow(objTr);
                        }}
                      >
                        {objTr[heading]}
                      </th>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* for button */}
          <div className="flex items-center gap-2 justify-center">
            <i
              className="fa-solid fa-arrow-left p-2 border rounded-full cursor-pointer hover:bg-white hover:text-black"
              onClick={prevPage}
            ></i>
            {
              <p className="select-none">
                Page <span className="text-green-600">{currentPage}</span> of{" "}
                <span className="text-red-600">{noOfpages}</span>
              </p>
            }
            <i
              className="fa-solid fa-arrow-right border p-2 rounded-full cursor-pointer hover:bg-white hover:text-black"
              onClick={nextPage}
            ></i>
          </div>
        </div>
      )}
    </>
  );
}

export default LedgerTable;
