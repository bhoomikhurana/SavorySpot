import React, { useContext } from "react";
import { assets } from "../../Assets/frontend_assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../context/StoreContext";
const FoodItem = ({ id, name, image, price, description, category }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price-add">
          <p className="food-item-price">₹{price}</p>
          {!cartItems[id] ? (
            <button onClick={() => addToCart(id)}>Add</button>
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt=""
              />
              {cartItems[id]}
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
