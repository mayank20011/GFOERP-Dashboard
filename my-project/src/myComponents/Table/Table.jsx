import React from 'react';

function Table({headings, data}) {
  // Add the 'Date of Order' to the beginning of the headings array
  headings.unshift({ productName: 'Date of Order' });

  return (
    <div className='w-full overflow-x-scroll'>
      <h1 className="text-xl">Sales Table Data</h1>

      <table className="overflow-x-auto border-collapse">
        
        {/* table heading */}
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index} className="text-white text-xs py-2 px-2 border" style={{minWidth:"150px", maxWidth:"150px", width:"150px"}}>{heading.productName}</th>
            ))}
          </tr>
        </thead>

        {/* table body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={`text-center ${rowIndex % 2 === 0 ? 'bg-white text-black border border-black' : 'bg-black text-white border'}`}>
              {/* Date of Order */}
              <td className="text-xs py-2 border">{`${row.time.date}/${row.time.month}/${row.time.year}`}</td>
              {/* Product Quantities */}
              {headings.slice(1).map((heading, colIndex) => {
                const product = row.productsSold.find(p => p.name === heading.productName);
                return (
                  <td key={colIndex} className="text-xs py-2 border">{product ? product.quantity : '0'}</td>
                );
              })}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Table;
