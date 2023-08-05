const express = require("express");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  address: String,
  products: Array,
  total: Number,
  status: String,
  cardNumber: String,
  cardName: String,
  cardDate: String,
  cardCvv: String,
});

const Order = mongoose.model("Order", schema);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    res.send(order);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const Order = new Order({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      products: req.body.products,
      total: req.body.total,
      status: req.body.status,
      cardNumber: req.body.cardNumber,
      cardName: req.body.cardName,
      cardDate: req.body.cardDate,
      cardCvv: req.body.cardCvv,
    });
    await Order.save();
    res.send(Order);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const Order = await Order.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      products: req.body.products,
      total: req.body.total,
      status: req.body.status,
      cardNumber: req.body.cardNumber,
      cardName: req.body.cardName,
      cardDate: req.body.cardDate,
      cardCvv: req.body.cardCvv,
    });
    await Order.save();
    res.send(Order);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAbdDelete(req.params.id);
    res.send(order);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
