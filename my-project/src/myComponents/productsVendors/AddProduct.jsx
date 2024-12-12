import React, { useEffect, useState, useRef } from "react";
import FilterComponent from "../filterComponent/FilterComponent.jsx";
import axios from "axios";

function AddProduct() {

  const ProductName=useRef(null);
  const productHsn=useRef(null);
  const [allProductVendor, setProductVendor] = useState(null);

  const [selectedVendor, setSelectedVendor] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/GFOERP/ProductsVendors")
      .then((response) => {
        setProductVendor(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-white animate-pulse mt-5 text-center">Loading ...</p>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedVendor._id);
    const dataToBeSend=
    {
      vendorId:selectedVendor._id,
      productName:ProductName.current.value,
      HSN:productHsn.current.value
    }
    console.log(dataToBeSend);
  }

  return (
    <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">Add New Authority</h1>

      <div className="">
        <h1>Select Product Vendor From The List :</h1>
        <FilterComponent
          clients={allProductVendor}
          setSelectedVendor={setSelectedVendor}
        />
      </div>

      {/* form */}
      {selectedVendor === null ? null : (
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* for ProductName */}
          <div>
            <h1 className="text-green-600">Product Name :</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
              placeholder="eg :- Full Cream (6 ltr)"
              ref={ProductName}
            />
          </div>
          {/* for Products HSN Code */}
          <div>
            <h1 className="text-green-600">HSN Code:</h1>
            <input
              type="text"
              className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
              placeholder=""
              ref={productHsn}
            />
          </div>
          <button type="submit" className="curosr-pointer px-4 py-2 bg-green-600 rounded-md hover:scale-95 transition">Add Product</button>
        </form>
      )}
    </div>
  );
}

export default AddProduct;
