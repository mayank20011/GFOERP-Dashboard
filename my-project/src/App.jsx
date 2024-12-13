// import { Dashboard, SidebarDemo } from "./Dashboard.jsx";
import Dashboard from "./myComponents/Dashboard/Dashboard.jsx";
import Login from "./myComponents/Login/Login.jsx";
import { useState } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loginAllowed, setLoginAllowed] = useState(false);
  return (
    <div className="bg-neutral-900 w-full min-h-screen flex justify-center items-center">
      <ToastContainer/>
      {loginAllowed ? <Dashboard /> : <Login setLoginAllowed={setLoginAllowed}/>}
      {/* <SidebarDemo/> */}
    </div>
  );
}

export default App;
