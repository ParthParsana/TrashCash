import React from "react";
import logo from '../../assets/logo.png';
import { NavLink, Link } from "react-router-dom";

function Header2_0() {
  

  return (
    <header className="flex justify-between items-center px-6 py-1 border border-[#dadada]">
      <div className="flex items-center space-x-1">
        <img className="inline h-20" src={logo} alt="TrashCash" />
      </div>
      <nav className="hidden md:flex space-x-6">
        <NavLink to="" className={ (isActive) => `hover:text-main ${isActive ? "text-main" : "text-[#000000]"}`}>
          About
        </NavLink>
        <NavLink to="scrap_rate.html" className={ (isActive) => `hover:text-main ${isActive ? "text-main" : "text-[#000000]"}`}>
          Scrap Rate
        </NavLink>
        <NavLink to="#" className={ (isActive) => `hover:text-main ${isActive ? "text-main" : "text-[#000000]"}`}>
          Help Center
        </NavLink>
        <NavLink to="#" className={(isActive) => `hover:text-main ${isActive ?"text-main" : "text-[#000000]" }`} >
          Trash Before Burn
        </NavLink>
      </nav>
    </header>
  );
}

export default Header2_0;
