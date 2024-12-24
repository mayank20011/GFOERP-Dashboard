import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
function AddAuthorities() {

  const rights = [
    "sale",
    "purchase",
    "stock",
    "inventory",
    "labTesting",
    "batchCoding",
    "dashBoard",
  ];

  const form=useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataToSend = {
      name: "",
      roles: [],
    };
    for (let [key, value] of data.entries()) {
      if (value === "on") {
        dataToSend["roles"].push(key);
      } else {
        dataToSend[`${key}`] = value;
      }
    }
    console.log(dataToSend);
    if (dataToSend.name === "") {
      toast.error("Name Cant Be Empty");
    } else if (dataToSend.password === "") {
      toast.error("PassWord Cant Be Empty");
    } else if (dataToSend.roles.length === 0) {
      toast.error("Asign Atleast 1 role");
    } else {
      axios
        .post("http://localhost:5000/GFOERP/UserLogin/addUser", dataToSend)
        .then((response) => {
          if(response.data.success){
            toast.success("New Authority Created");
            form.current.reset();
          }
          else{
            toast.error("Cant Create, Try again")
          }
        })
        .catch((err) => {
          toast.error("Server Problem");
          console.log(err);
        });
    }
  }

  return (
    <div className="text-white my-6 w:full md:w-3/5 mx-auto p-3 flex flex-col gap-6 sabp:w-4/5">
      <h1 className="text-3xl font-bold text-center">Add New Authority</h1>

      {/* for form */}
      <form action="" className="space-y-3 w-full" onSubmit={handleSubmit} ref={form}>
        {/* for AuthorityName div */}
        <div>
          <h1>Enter Name :</h1>
          <input
            type="text"
            className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
            name="name"
          />
        </div>

        {/* for Password  */}
        <div>
          <h1>Enter Password :</h1>
          <input
            type="text"
            className="w-full outline-none bg-transparent p-2 border-2 rounded-md"
            name="password"
          />
        </div>

        {/* for giving Rights div */}
        <div className="space-y-2">
          <h1>Select What They Can Access ?</h1>

          <div className="grid space-y-2">
            {rights.map((right, index) => (
              <div
                className="flex gap-2"
                key={`${right}-${index}`}
                name={`${right}`}
              >
                <input
                  type="checkBox"
                  className="cursor-pointer"
                  name={right}
                />
                <p className="capitalize">{right}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 p-3 px-5 rounded-md hover:scale-95 transition"
        >
          Create Authority
        </button>
      </form>
    </div>
  );
}

export default AddAuthorities;
