import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./List.css";
const List = () => {
  const url = "http://localhost:8080";
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };
  const removeFood = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, { id });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div>
      <h3>Menu List</h3>
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>

        <b>Price</b>
        <b>Category</b>
        <b>Action</b>
      </div>
      {list.map((item, index) => {
        return (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>₹{item.price}</p>
            <p>{item.category}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
