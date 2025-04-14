import React from "react";
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate=useNavigate()
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <header className="flex justify-between items-center px-6 py-1 border border-[#dadada]">
      <div className="flex items-center space-x-1">
        <img className="inline h-20" src={logo} alt="TrashCash" />
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link to="/home" className="hover:text-main hover:font-bold">
          Home
        </Link>
        <Link to="/scrap_rate" className="hover:text-main hover:font-bold">
          Scrap Rate
        </Link>
        <Link to="/schidule_pickup" className="hover:text-main hover:font-bold">
          Trash Pickup
        </Link>
         <Link to="/track" className="hover:text-main hover:font-bold">
          Check My Pickup
        </Link> 
        <Link to="/tbbdetails" className="hover:text-main hover:font-bold">
          Trash Before Burn
        </Link>
      </nav>
      <div>
        {/* <button
          className="bg-black text-white px-4 py-2 rounded-md shadow-2xl hover:shadow-[black] hover:bg-[#000000] hover:text-[white]"
          onClick={()=>handleSignup()}>
          Sign Up
        </button> */}
      </div>
    </header>
  );
}

export default Header;
