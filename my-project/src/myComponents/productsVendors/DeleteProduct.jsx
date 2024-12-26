import React, { useEffect, useState } from "react";
import FilterComponent from "../filterComponent/FilterComponent.jsx";
import axios from "axios";
import ProductFilterComponent from "../filterComponent/ProductFilterComponent.jsx";
import { toast } from "react-toastify";
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
      .get("https://gfo-erp-backend-api.vercel.app/GFOERP/ProductsVendors")
      .then((response) => {
        setProductVendor(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setSelectedProduct(null);
  }, [selectedVendor]);

  if (loading) {
    return (
      <p className="text-white animate-pulse mt-5 text-center">Loading ...</p>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const dataToSend = {};
    const formData = new FormData(e.target);

    for (const [key, value] of formData.entries()) {
      dataToSend[key] = value;
    }
    console.log(dataToSend);

    axios
      .delete(`https://gfo-erp-backend-api.vercel.app/GFOERP/ProductsVendors/${selectedVendor._id}/${dataToSend.HSN}`)
      .then((response) => {
        if (response.data.success) {
          toast.success("Product Deleted Successfully");
          setSelectedVendor(null);
        } else {
          toast.error("Something Went Wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Issue");
      });
  }
  return (
    <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6 sabp:w-4/5">
      <h1 className="text-3xl font-bold text-center">Delete Product :</h1>
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
                  name="productName"
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
                  name="HSN"
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
