import Dashboard from "./myComponents/Dashboard/Dashboard.jsx";
import Login from "./myComponents/Login/Login.jsx";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loginAllowed, setLoginAllowed] = useState(false);

  return (
    <div className="bg-neutral-900 w-full min-h-screen flex justify-center items-center">
      <ToastContainer />
      {JSON.parse(sessionStorage?.getItem("login"))?.authorization ? (
        <Dashboard />
      ) : (
        <Login setLoginAllowed={setLoginAllowed}/>
      )}
    </div>
  );
}

export default App;
