import React from "react";
import { assets } from "../../Assets/admin_assets/assets";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">
        <img className="logo" src={assets.logo} alt="" />
      </NavLink>
    </div>
  );
};

export default Navbar;
