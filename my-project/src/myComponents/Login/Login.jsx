import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function Login({setLoginAllowed}) {

  const [loading, setLoading]=useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataToSend = {};
    for (const [key, value] of formData.entries()) {
      dataToSend[key] = value;
    }
    if (dataToSend.name === "") {
      toast.error("Name Can not be Empty");
    } else if (dataToSend.password === "") {
      toast.error("Password can not be Empty");
    } else {
      setLoading(true);
      axios.post("https://gfo-erp-backend-api.vercel.app/GFOERP/UserLogin/",dataToSend)
        .then((res)=>
          {
            if(res.data.authorization){
              if(res.data.roles.includes('dashBoard')){
               setLoginAllowed(true);}
               else{
                toast.warning("Access Denied");
               }
               setLoading(false);
            }
            else{
              toast.error("No Such User");
              setLoading(false);
            }
          })
        .catch((err) => {
          toast.error("Server Issue");
        });
    }
  }

  return (
    <div className="text-white bg-neutral-700 mx-1 my-2 w-full max-w-[400px] shadow-2xl shadow-white">
      <form
        action=""
        className="px-3 pt-3 pb-8 border rounded-md shadow space-y-3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold">Login </h1>

        <div className="space-y-2">
          <h1 className="underline underline-offset-4">Name :</h1>
          <input
            type="text"
            placeholder="Enter Name ..."
            className="p-2 w-full bg-transparent border rounded cursor-pointer outline-none"
            name="name"
          />
        </div>

        <div className="space-y-2">
          <h1 className="underline underline-offset-4">Password :</h1>
          <input
            type="password"
            placeholder="Enter PassWord ..."
            className="p-2 w-full bg-transparent border rounded cursor-pointer outline-none"
            name="password"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-md border border-neutral-900 bg-neutral-900 w-full transition hover:scale-95"
        >
          {loading? <p className="animate-pulse">Loging in ...</p>:<p>Login</p>}
        </button>
      </form>
    </div>
  );
}

export default Login;
