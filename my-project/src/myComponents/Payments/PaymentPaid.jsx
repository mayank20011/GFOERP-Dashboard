import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import FilterComponent from "../filterComponent/FilterComponent";

function PaymentPaid() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchaseVendorsData, setPurchaseVendorsDate] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);
  const [err3, setErr3] = useState(false);
  const cash = useRef(null);
  const upi = useRef(null);
  const otherMode = useRef(null);
  const upiRefNo = useRef(null);
  const otherRefNo = useRef(null);

  function fetchData() {
    axios
      .get("https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseVendors/")
      .then((res) => {
        if (res.data) {
          setPurchaseVendorsDate(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Error While Fetching Data");
      });
  }

  useEffect(() => {
    if (purchaseVendorsData == null) {
      fetchData();
    }
  }, []);

  function createObj() {
    const currentDate = new Date();
    const obj = {
      update: {
        _id: selectedVendor._id,
        balanceAmount: selectedVendor.balanceAmount - totalAmount,
      },
      record: {
        Time: {
          date: currentDate.getDate(),
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
          time: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
        },
        paymentType: "Purchase",
        paymentDetails: {
          cash: { amount: cash.current.value },
          upi: { amount: upi.current.value, refNo: upiRefNo.current.value },
          others: {
            amount: otherMode.current.value,
            refNo: otherRefNo.current.value,
          },
        },
        transactionHandler: "",
        amount: totalAmount,
        vendorName: selectedVendor.name,
        vendor_id: selectedVendor._id,
        pendingAmount: selectedVendor.balanceAmount - totalAmount,
        lastPendingAmount: selectedVendor.balanceAmount,
      },
    };
    console.log(obj);
    return obj;
  }

  function hitApi() {
    const dataToSend = createObj();
    const hasUpiError =
      upi.current.value !== "" && upiRefNo.current.value === "";
    const hasOtherModeError =
      otherMode.current.value !== "" && otherRefNo.current.value === "";
    if (hasUpiError) {
      toast.error("Enter UPI Ref id");
    } else if (hasOtherModeError) {
      toast.error("Enter Other mode's Ref Id");
    } else {
      setSubmitLoading(true);
      axios
        .post("http://localhost:5000/GFOERP/PurchaseVendors/history", dataToSend)
        .then((response) => {
          console.log(response);
          toast.success("Balance Updated Successfully");
          setSubmitLoading(false);
        })
        .catch((err) => {
          toast.error("Server Problem, Try Again");
          setSubmitLoading(false);
        });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (totalAmount == 0) {
      toast.error("Generate Net Amount, First");
    } else {
      hitApi();
    }
  }

  function checkValue(e, errPoint) {
    setTotalAmount(0);
    if (e.target.value < 0) {
      if (errPoint == 1) {
        setErr1(true);
      } else if (errPoint == 2) {
        setErr2(true);
      } else {
        setErr3(true);
      }
    } else {
      if (errPoint == 1) {
        setErr1(false);
      } else if (errPoint == 2) {
        setErr2(false);
      } else if (errPoint == 3) {
        setErr1(3);
      } else {
      }
    }
  }

  function calculateNetAmount() {
    if (err1 || err2 || err3) {
      toast.error("Enter Correct Data");
    } else {
      const total =
        +cash.current.value + +upi.current.value + +otherMode.current.value;
      setTotalAmount(total);
    }
  }

  if (loading) {
    return (
      <p className="text-center text-white">
        Loading vendors Data <span className="animate-ping">. . .</span>
      </p>
    );
  }

  return (
    <div className="text-white w-full">
      <ToastContainer />
      {purchaseVendorsData ? (
        <div className="space-y-4">
          {/* For dropdown */}
          <div>
            <p>Select Vendor :</p>
            <FilterComponent
              clients={purchaseVendorsData}
              setSelectedVendor={setSelectedVendor}
            />
          </div>

          {/* if selectedVendor */}
          {selectedVendor ? (
            <form className="space-y-2" onSubmit={handleSubmit}>
              {/* For payment that we are giving */}
              <div className="space-y-3 border-red-600 border-2 rounded-md p-3">
                <p className="underline">Payment Details : </p>

                {/* for cash */}
                <div className="flex gap-2 flex-col">
                  <label htmlFor="cash">Cash: </label>
                  <div className="w-full">
                    <input
                      type="number"
                      name="cash"
                      ref={cash}
                      className="p-2 rounded-md bg-transparent outline-none border-2 w-full"
                      placeholder="Cash Amount . . ."
                      onChange={(e) => {
                        checkValue(e, 1);
                      }}
                      onWheel={(e) => e.target.blur()}
                      onFocus={(e) => {
                        e.target.onwheel = (event) => event.preventDefault();
                      }}
                    />
                    {err1 ? (
                      <p className="text-red-600">Invalid Input</p>
                    ) : null}
                  </div>
                </div>

                {/* for Upi */}
                <div className="flex gap-2 flex-col">
                  <label htmlFor="upi">UPI: </label>
                  <div className="flex gap-2">
                    <div className="w-1/2 grid">
                      <input
                        type="number"
                        name="upi"
                        ref={upi}
                        className="p-2 rounded-md bg-transparent outline-none border-2 w-full"
                        placeholder="UPI Amount . . ."
                        onChange={(e) => {
                          checkValue(e, 2);
                        }}
                        onWheel={(e) => e.target.blur()}
                        onFocus={(e) => {
                          e.target.onwheel = (event) => event.preventDefault();
                        }}
                      />
                      {err2 ? (
                        <p className="text-red-600">Invalid Value</p>
                      ) : null}
                    </div>
                    <input
                      type="text"
                      name="upiRefNo"
                      className="p-2 rounded-md bg-transparent outline-none border-2 w-1/2"
                      ref={upiRefNo}
                      placeholder="UPI Ref No . . ."
                    />
                  </div>
                </div>

                {/* other Modes */}
                <div className="flex gap-2 flex-col">
                  <label htmlFor="otherAmount">Other: </label>

                  <div className="flex gap-2">
                    <div className="grid w-1/2">
                      <input
                        type="number"
                        name="otherAmount"
                        ref={otherMode}
                        className="p-2 rounded-md bg-transparent outline-none border-2 w-full"
                        onChange={checkValue}
                        placeholder="Amount . . ."
                        onWheel={(e) => e.target.blur()}
                        onFocus={(e) => {
                          e.target.onwheel = (event) => event.preventDefault();
                        }}
                      />
                      {err3 ? (
                        <p className="text-red-600">Invalid Value</p>
                      ) : null}
                    </div>
                    <input
                      type="text"
                      name="otherRefNo"
                      className="p-2 rounded-md bg-transparent outline-none border-2 w-1/2"
                      ref={otherRefNo}
                      placeholder="Ref No . . ."
                    />
                  </div>
                </div>

                <button
                  className="p-2 rounded-md bg-green-600 shadow-md shadow-green-600 hover:scale-90 transition"
                  type="button"
                  onClick={calculateNetAmount}
                >
                  Calculate Net Amount
                </button>
              </div>

              <div className="grid gap-1">
                <p>Net Amount That You are paying is :- </p>
                <p className="p-2 px-4 rounded-md bg-white text-black w-fit">
                  {totalAmount}
                </p>
              </div>

              {/* For Paragraph */}
              {selectedVendor ? (
                <div className="text-red-600">
                  <p> * Note :-</p>
                  <p>Net Amount = Cash + Upi + Others.</p>
                  <p>
                    Remaining Balance After This Transaction will be{" "}
                    <span className="text-white">
                      {selectedVendor.balanceAmount} - {totalAmount} ={" "}
                      {selectedVendor.balanceAmount - totalAmount}{" "}
                    </span>
                  </p>
                </div>
              ) : null}

              {/* button */}
              <button className="p-2 px-10 rounded-md bg-red-600 shadow-lg shadow-red-600 w-full sm:w-fit hover:scale-90 transition">
                {submitLoading ? (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default PaymentPaid;
