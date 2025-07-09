const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const Review = require("../models/Review");

// 👉 Add a new review (authenticated users only)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { cityId, rating, comment } = req.body;

    const review = new Review({
      userId: req.user._id,
      cityId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: err.message });
  }
});

// 👉 Get all reviews for a city
router.get("/:cityId", async (req, res) => {
  try {
    const reviews = await Review.find({ cityId: req.params.cityId }).populate(
      "userId",
      "name"
    );
    res.json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch reviews", error: err.message });
  }
});

module.exports = router;
