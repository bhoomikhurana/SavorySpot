import React from "react";
import "./Header.css";
// import { assets } from "../../Assets/frontend_assets/assets";
const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        {/* <img src={assets.header_img} alt="" /> */}
        <h2>Delicious Food, Happy Moments</h2>
        <p>
          Welcome to our Savory Spot! Our menu is full of tasty dishes made with
          fresh ingredients. Whether you love classic meals or want to try
          something new, we have something for everyone. Check out our menu and
          find your next favorite dish!
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
