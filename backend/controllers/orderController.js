import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const placeorder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      name: req.body.name,
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      tablenumber: req.body.tablenumber,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    res.json({ success: true, cartData, message: "Order placed suuccessfuly" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in placing order" });
  }
};
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
