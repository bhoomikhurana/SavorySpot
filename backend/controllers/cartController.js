import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    const cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in adding to cart" });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in removing from cart" });
  }
};
export const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in getting cart" });
  }
};
