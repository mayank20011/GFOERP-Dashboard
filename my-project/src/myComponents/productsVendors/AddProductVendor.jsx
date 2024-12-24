import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddProductVendor() {
  const [loading, setLoading] = useState(false);

  // to keep track of number of products
  const productId = useRef(0);

  // for 1 product
  const product = { id: 0 };

  // for array of product, size will we changed using useRef
  const [products, setProducts] = useState([product]);

  if (loading) {
    return (
      <p className="text-white animate-pulse mt-5 text-center">Loading ...</p>
    );
  }

  function handleCheckBox(e) {
    if (e.target.checked) {
      productId.current++;
      setProducts([...products, { ...product, id: productId.current }]);
      e.target.checked = false;
    }
  }

  function removeProductDiv(e) {
    console.log(e.target.parentElement.id);
    //  console.log(products);
    const newproductsArray = products.filter(
      (product) => product.id != e.target.parentElement.id
    );
    console.log(newproductsArray);
    setProducts(newproductsArray);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let tempProduct = {};
    const dataToSend = { name: "", products: [] };
    for (let [key, value] of formData.entries()) {
      if (key == "name") {
        dataToSend[key] = value;
      } else {
        if (key == "productName") {
          tempProduct = {};
          if (value != "") {
            tempProduct[`${key}`] = value;
          }
        } else {
          if (tempProduct.productName && value != "") {
            tempProduct[`${key}`] = value;
            dataToSend.products.push(tempProduct);
          }
        }
      }
    }
    if (dataToSend.name == "") {
      toast.error("Enter Vendor Name");
    } else if (dataToSend.products.length == 0) {
      toast.error("Enter Atleast 1 product");
    } else {
      console.log(dataToSend);
      setLoading(true);
      axios
        .post(
          "http://localhost:5000/GFOERP/ProductsVendors/addVendor",
          dataToSend
        )
        .then((res) => {
          if (res.data.success) {
            toast.success("Vendor Saved Successfully");
          } else {
            toast("Failed to save Vendor");
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Server Problem");
          setLoading(false);
        });
    }
  }

  return (
    <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6 sabp:w-4/5">
      <h1 className="text-3xl font-bold text-center">Add New Vendor :</h1>

      {/* form */}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="">
          <h1>Enter New Vendor Name :</h1>
          <input
            type="text"
            className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
            name="name"
          />
        </div>

        {/* for products */}
        {products.map((product, index) => (
          <div
            className="w-full border-2 border-green-600 rounded-md p-3 space-y-2 shadow-green-600 shadow-md relative pt-0"
            key={`product-${index + 1}`}
            id={index}
          >
            <h1 className="text-2xl text-red-600">{`Product :- ${
              index + 1
            }`}</h1>
            {/* for Product Name */}
            <div>
              <h1 className="text-green-600">Product Name :</h1>
              <input
                type="text"
                className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                placeholder="eg :- Full Cream (6 ltr)"
                name="productName"
              />
            </div>

            {/* for Products HSN Code */}
            <div>
              <h1 className="text-green-600">HSN Code:</h1>
              <input
                type="text"
                className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
                placeholder="Enter 6 digits HSN Code ..."
                name="HSN"
              />
            </div>
          </div>
        ))}

        <div className="flex gap-3 items-center justify-end">
          <input
            type="checkbox"
            className="h-5 w-5 rounded p-3 cursor-pointer"
            onClick={handleCheckBox}
          ></input>
          <p className="text-red-600">Add Another Product?</p>
        </div>

        <button
          type="submit"
          className="curosr-pointer px-4 py-2 bg-green-600 rounded-md hover:scale-95 transition"
        >
          {loading ? (
            <p className="animate-pulse">creating Vendor . . .</p>
          ) : (
            <p>create Vendor</p>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddProductVendor;
