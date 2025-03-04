import React, { useContext } from "react";

import { DContext } from "../context/Datacontext";
import Logo from '../assets/Anganwadi_logo-removebg-preview.png'

const Navbar = () => {
 
  const apiurl = process.env.REACT_APP_API_URL;
  const { Auth } = useContext(DContext);

  console.log("Auth By navbar:", Auth);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiurl}/logout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        window.location.href='/'
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error during logout. Please try again.");
    }
  };

  return (
    <nav className="bg-green-700 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        {/* <a href="/" className="text-xl font-bold text-primar text-white ">
        courtyard shelter
        </a> */}
        <img src={Logo} alt="loading.." className="w-20 h-20" ></img>

        {/* Auth Button */}
        <button
          onClick={handleLogout}
          className={`px-4 py-2 text-white rounded-md transition-all ${
            Auth ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {Auth ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
