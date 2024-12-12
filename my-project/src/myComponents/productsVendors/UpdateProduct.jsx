// import React, { useEffect, useState } from "react";
// import FilterComponent from "../filterComponent/FilterComponent.jsx";
// import axios from "axios";
// import ProductFilterComponent from "../filterComponent/ProductFilterComponent.jsx";

// function UpdateProduct() {
//   const [allProductVendor, setProductVendor] = useState(null);
//   const [selectedVendor, setSelectedVendor] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/GFOERP/ProductsVendors")
//       .then((response) => {
//         setProductVendor(response.data.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedProduct) {
//       setProductFormData({
//         productName: selectedProduct.productName,
//         HSN: selectedProduct.HSN,
//       });
//     }
//   }, [selectedProduct]);

//   const [productFormData, setProductFormData] = useState({
//     productName: "",
//     HSN: "",
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setProductFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log(productFormData);

//     // Add your API call here if needed
//   }

//   if (loading) {
//     return (
//       <p className="text-white animate-pulse mt-5 text-center">Loading ...</p>
//     );
//   }

//   return (
//     <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6">
//       <h1 className="text-3xl font-bold text-center">Update Product</h1>

//       <div>
//         <h1>Select Product Vendor From The List :</h1>
//         <FilterComponent
//           clients={allProductVendor}
//           setSelectedVendor={setSelectedVendor}
//         />
//       </div>

//       {/* form */}
//       {selectedVendor === null ? null : (
//         <div>
//           <h1>Select Product ... </h1>
//           <ProductFilterComponent
//             productVendor={selectedVendor.products}
//             setSelectedVendor={setSelectedProduct}
//           />
//         </div>
//       )}

//       {selectedProduct === null ? null : (
//         <div>
//           <form onSubmit={handleSubmit} className="space-y-4 w-full">
//             <div className="w-full flex gap-2">
//               {/* Form Product Name */}
//               <div>
//                 <h1 className="text-red-600">Product Name :</h1>
//                 <input
//                   type="text"
//                   name="productName"
//                   value={productFormData.productName}
//                   onChange={handleChange}
//                   className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
//                 />
//               </div>

//               {/* For HSN Code */}
//               <div>
//                 <h1 className="text-red-600">Products HSN Code:</h1>
//                 <input
//                   type="text"
//                   name="HSN"
//                   value={productFormData.HSN}
//                   onChange={handleChange}
//                   className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
//                 />
//               </div>
//             </div>
//             <button
//               className="text-white bg-red-600 px-4 py-2 rounded-md hover:scale-95 transition"
//               type="submit"
//             >
//               Change Product
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UpdateProduct;





import React, { useEffect, useState } from "react";
import FilterComponent from "../filterComponent/FilterComponent.jsx";
import axios from "axios";
import ProductFilterComponent from "../filterComponent/ProductFilterComponent.jsx";

function UpdateProduct() {
  const [allProductVendor, setProductVendor] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productFormData, setProductFormData] = useState({
    productName: "",
    HSN: "",
  });

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

  // Function to handle vendor selection
  const handleVendorSelection = (vendor) => {
    setSelectedVendor(vendor);
    setSelectedProduct(null); // Reset the selected product
    setProductFormData({
      productName: "",
      HSN: "",
    }); // Reset the form data
  };

  useEffect(() => {
    if (selectedProduct) {
      setProductFormData({
        productName: selectedProduct.productName,
        HSN: selectedProduct.HSN,
      });
    }
  }, [selectedProduct]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProductFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(productFormData);

    // Add your API call here if needed
  }

  if (loading) {
    return (
      <p className="text-white animate-pulse mt-5 text-center">Loading ...</p>
    );
  }

  return (
    <div className="text-white my-6 w-full md:w-3/5 mx-auto p-3 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">Update Product</h1>

      <div>
        <h1>Select Product Vendor From The List :</h1>
        <FilterComponent
          clients={allProductVendor}
          setSelectedVendor={handleVendorSelection}
        />
      </div>

      {/* form */}
      {selectedVendor === null ? null : (
        <div>
          <h1>Select Product ... </h1>
          <ProductFilterComponent
            productVendor={selectedVendor.products}
            setSelectedVendor={setSelectedProduct}
          />
        </div>
      )}

      {selectedProduct === null ? null : (
        <div>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="w-full flex gap-2">
              {/* Form Product Name */}
              <div>
                <h1 className="text-red-600">Product Name :</h1>
                <input
                  type="text"
                  name="productName"
                  value={productFormData.productName}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                />
              </div>

              {/* For HSN Code */}
              <div>
                <h1 className="text-red-600">Products HSN Code:</h1>
                <input
                  type="text"
                  name="HSN"
                  value={productFormData.HSN}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                />
              </div>
            </div>
            <button
              className="text-white bg-red-600 px-4 py-2 rounded-md hover:scale-95 transition"
              type="submit"
            >
              Change Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
