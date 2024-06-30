// import React, { useContext } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../components/context/StoreContext";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// const PlaceOrder = () => {
//   const navigate = useNavigate();
//   const { getTotalAmount, url, token, food_list, cartItems } =
//     useContext(StoreContext);
//   const [data, setData] = useState({
//     name: "",
//     tablenumber: "",
//   });
//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };
//   const placeOrder = async (e) => {
//     e.preventDefault();
//     let orderItems = [];
//     food_list.map((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = item;
//         itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//     });
//     let orderData = {
//       name: data.name,
//       tablenumber: data.tablenumber,
//       items: orderItems,
//       amount: getTotalAmount(),
//     };
//     let response = await axios.post("/api/order/placeorder", orderData, {
//       headers: { token },
//     });
//     if (response.data.success) {
//       toast.success(response.data.message);
//       navigate("/ordersuccessful");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={placeOrder} className="place-order">
//         <div className="place-order-left">
//           <p className="title">Your Information</p>
//           <div className="multi-fields">
//             <input
//               onChange={onChangeHandler}
//               name="name"
//               value={data.name}
//               type="text"
//               placeholder="Enter your name"
//               required
//             />
//             <input
//               onChange={onChangeHandler}
//               name="tablenumber"
//               value={data.tablenumber}
//               type="number"
//               placeholder="Table Number"
//               required
//             />
//           </div>
//           <div className="cart-bottom">
//             <b>Total - ₹{getTotalAmount()}</b>
//             <button type="submit">ORDER AT YOUR TABLE</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PlaceOrder;
import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalAmount, url, token, food_list, cartItems } =
    useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    tablenumber: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    let orderData = {
      name: data.name,
      tablenumber: data.tablenumber,
      items: orderItems,
      amount: getTotalAmount(),
    };

    try {
      let response = await axios.post(
        `${url}/api/order/placeorder`,
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/ordersuccessful");
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        "An error occurred while placing your order. Please try again."
      );
    }
  };

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Your Information</p>
          <div className="multi-fields">
            <input
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              type="text"
              placeholder="Enter your name"
              required
            />
            <input
              onChange={onChangeHandler}
              name="tablenumber"
              value={data.tablenumber}
              type="number"
              placeholder="Table Number"
              required
            />
          </div>
          <div className="cart-bottom">
            <b>Total - ₹{getTotalAmount()}</b>
            <button type="submit">ORDER AT YOUR TABLE</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
