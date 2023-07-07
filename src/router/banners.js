const express = require("express");
const Banner = require("../model/banner");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const banner = await Banner.findOne();
    res.send(banner);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const count = await Banner.countDocuments();
    if (count > 0) {
      res
        .status(400)
        .json({ error: "Banners already exist. Only one entry allowed." });
      return;
    }

    const newBanner = new Banner(req.body);
    await newBanner.save();
    res.send(newBanner);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    await updatedBanner.save();
    res.send(updatedBanner);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
    res.send(deletedBanner);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
