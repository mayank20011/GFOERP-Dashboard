import React, { useEffect, useState } from "react";
import FilterComponent from "../filterComponent/FilterComponent.jsx";
import axios from "axios";
import ProductFilterComponent from "../filterComponent/ProductFilterComponent.jsx";
function DeleteProduct() {
  const [allProductVendor, setProductVendor] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleSubmit(e) {
    console.log("form Submit");
  }

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
    console.log(e);
  }
  return (
    <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">Add New Authority</h1>
      <div className="">
        <h1>Select Product Vendor From The List :</h1>{" "}
        <FilterComponent
          clients={allProductVendor}
          setSelectedVendor={setSelectedVendor}
        />
      </div>
      {/* form */}
      {selectedVendor === null ? null : (
        <div className="">
          <h1>Select Product ... </h1>
          <ProductFilterComponent
            productVendor={selectedVendor.products}
            setSelectedVendor={setSelectedProduct}
          />
        </div>
      )}{" "}
      {selectedProduct === null ? null : (
        <div>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="w-full flex gap-2">
              {/* Form Product Name */}
              <div>
                <h1 className="text-red-600">Product Name :</h1>
                <input
                  type="text"
                  value={selectedProduct.productName}
                  className="w-full outline-none bg-transparent p-2 border-2 rounded-md cursor-not-allowed"
                  readOnly
                />
              </div>
              {/* For HSN Code */}
              <div>
                <h1 className="text-red-600">Products HSN Code:</h1>
                <input
                  type="text"
                  value={selectedProduct.HSN}
                  className="w-full outline-none bg-transparent p-2 border-2 rounded-md cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>
            <button
              className="text-white bg-red-600 px-4 py-2 rounded-md hover:scale-95 transition"
              type="submit"
            >
              Delete Product
            </button>
          </form>
        </div>
      )}{" "}
    </div>
  );
}
export default DeleteProduct;
