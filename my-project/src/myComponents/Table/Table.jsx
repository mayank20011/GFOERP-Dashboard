import React from "react";
import { useRef, useState } from "react";

function Table({ headings, data, pos }) {

  const [id, setId] = useState(null);
  // Add the 'Date of Order' to the beginning of the headings array

  if (headings[0].productName !== "Date of Order") {
    headings.unshift({ productName: "Date of Order" });
  }

  // to manage and show a specific row entry
  function rowClick(e) {
    setId(e.target.parentElement.id);
    sideView.current.classList.remove("translate-x-full");
  }
  function closeSideView() {
    sideView.current.classList.add("translate-x-full");
  }
  const sideView = useRef(null);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const thisPageItems = data.slice(firstItemIndex, lastItemIndex);
  const noOfPages = Math.ceil(data.length / itemsPerPage);
  function prevPage() {
    if (currentPage == 1) {
      setCurrentPage(noOfPages);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage == noOfPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  }


  return (
    <div className="w-full flex flex-col  gap-3">

      <div className="w-full overflow-x-scroll">
        {/* for side in and out */}
        <div
          className="min-h-screen h-full max-w-[350px] bg-white top-0 right-0 w-3/4 p-2 flex flex-col fixed translate-x-full transition duration-300 z-50"
          ref={sideView}
        >
          <p
            className="text-black text-2xl cursor-pointer px-3 self-end"
            onClick={closeSideView}
          >
            X
          </p>

          {/* for collecting Data */}
          {id ? (
            <div className="text-black px-4 flex flex-col space-y-4">
              {/* for VendorName */}
              <h1 className="text-3xl font-bold border-b-4 pb-2">{`${thisPageItems[id].vendorName}`}</h1>

              {/* for clientName */}
              {pos === "Sale" ? (
                <h1 className="text-2xl font-bold text-slate-700 border-b-4 pb-2">
                  Client :
                  <span className="text-sm text-green-600">{` ${thisPageItems[id].client}`}</span>
                </h1>
              ) : null}

              {/* for Date*/}
              <h1 className="text-2xl font-bold text-slate-700 border-b-4 pb-2">
                Date :{" "}
                <span className="text-sm text-green-600 font-bold">{`${thisPageItems[id].time.date}/${thisPageItems[id].time.month}/${thisPageItems[id].time.year}`}</span>
              </h1>

              {/* for order Time */}
              <h1 className="text-2xl font-bold text-slate-700 border-b-4 pb-2">
                Order Time :{" "}
                <span className="text-sm text-green-600 font-bold">{`${thisPageItems[id].time.time}`}</span>
              </h1>

              {/* for products sold */}
              <h1 className="text-2xl font-bold text-slate-700">
                Products Sold :
              </h1>
              <div className="h-80 space-y-2 overflow-y-auto w-full ">
                <div className="space-y-2">
                  {thisPageItems[id].productsSold.map((product) => (
                    <div
                      className="flex justify-between border-2 p-2 hover:border-black cursor-pointer"
                      key={product.name}
                    >
                      <p className="capitalize">{product.name}</p>
                      <p>{product.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* for headding */}
        <h1 className="text-xl mb-3">
          {pos === "Purchase" ? "Purchase" : "Sales"} Data Table
        </h1>

        {/* for table */}
        <table className="overflow-x-auto border-collapse">
          {/* table heading */}
          <thead>
            <tr>
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className={`text-white text-xs py-2 px-2 border ${
                    index == 0 ? "sticky left-0 bg-green-600" : ""
                  }`}
                  style={{
                    minWidth: "150px",
                    maxWidth: "150px",
                    width: "150px",
                  }}
                >
                  {heading.productName}
                </th>
              ))}
            </tr>
          </thead>

          {/* table body */}
          <tbody>
            {thisPageItems.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={` text-center cursor-pointer ${
                  rowIndex % 2 === 0
                    ? "bg-white text-black border border-black"
                    : "bg-neutral-900 text-white border"
                }`}
                onClick={rowClick}
                id={rowIndex}
              >
                {/* Date of Order */}
                <td
                  className={`text-xs py-2 border sticky left-0 bg-green-600 text-white`}
                >{`${row.time.date}/${row.time.month}/${row.time.year}`}</td>
                {/* Product Quantities */}
                {headings.slice(1).map((heading, colIndex) => {
                  const product = row.productsSold.find(
                    (p) => p.name === heading.productName
                  );
                  return (
                    <td key={colIndex} className={`text-xs py-2 border `}>
                      {product ? product.quantity : "0"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* for pagination */}
      <div className="flex gap-3 items-center mb-3 justify-center">
        {/* for previous page */}
        <i
          className="fa-solid fa-arrow-left p-3 border rounded-full hover:text-black hover:bg-white cursor-pointer"
          onClick={prevPage}
        ></i>

        {/* for text */}
        <div>
          <p className="">{`page ${currentPage} of ${noOfPages}`}</p>
        </div>

        {/* for next page */}
        <i
          className="fa-solid fa-arrow-right p-3 border rounded-full hover:text-black hover:bg-white cursor-pointer"
          onClick={nextPage}
        ></i>
      </div>
      
    </div>
  );
}

export default Table;
