import React from "react";

function RecordTable({ headings, data }) {
  return (
    <div className="w-full text-black">
      {/* Table */}
      <table className="w-full">
        <thead className="sticky top-0 bg-white">
          {/* heading rows */}
          <tr className="">
            {headings.map((heading) => (
              <th className="font-bold text-sm">{heading}</th>
            ))}
          </tr>
        </thead>

        <tbody className="text-black text-center">
          {data.map((row, index) => (
            <tr key={index} className="">
              <td className="text-xs">{`${row.Time.date}/${row.Time.month}/${row.Time.year}`}</td>
              <td className="text-center text-green-600">
                {row.lastPendingAmount}
              </td>
              <td className="">
                {row.paymentDetails.cash.amount == ""
                  ? 0
                  : row.paymentDetails.cash.amount}
              </td>
              <td>
                {row.paymentDetails.upi.amount == ""
                  ? 0
                  : row.paymentDetails.upi.amount}
              </td>
              <td>
                {row.paymentDetails.others.amount == ""
                  ? 0
                  : row.paymentDetails.others.amount}
              </td>
              <td>{row.amount}</td>
              <td>{row.pendingAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordTable;
