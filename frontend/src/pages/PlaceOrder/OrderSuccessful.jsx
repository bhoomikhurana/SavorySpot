import React from "react";
import { Link } from "react-router-dom";
const OrderSuccessful = () => {
  return (
    <div>
      YAY YOUR ORDER HAS BEEN PLACED. WE'LL SERVE YOU SUPER SOON!
      <Link to="/myorders">
        {" "}
        <h3>VIEW ORDER</h3>
      </Link>
    </div>
  );
};

export default OrderSuccessful;
