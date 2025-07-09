const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const City = require("../models/City");
const Review = require("../models/Review"); // 🔥 Required for ratings

// ✅ Admin-only: Add a new city
router.post("/city", verifyToken, isAdmin, async (req, res) => {
  try {
    const newCity = new City(req.body);
    await newCity.save();
    res.status(201).json({
      message: "City added successfully",
      city: newCity,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add city",
      error: err.message,
    });
  }
});

// ✅ Public: Get all cities with average rating & review count
router.get("/cities", async (req, res) => {
  try {
    const cities = await City.find();

    const citiesWithRatings = await Promise.all(
      cities.map(async (city) => {
        const reviews = await Review.find({ cityId: city._id });

        const totalReviews = reviews.length;
        const averageRating = totalReviews
          ? (
              reviews.reduce((sum, review) => sum + review.rating, 0) /
              totalReviews
            ).toFixed(1)
          : 0;

        return {
          ...city._doc,
          averageRating: parseFloat(averageRating),
          totalReviews,
        };
      })
    );

    res.status(200).json(citiesWithRatings);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch cities",
      error: err.message,
    });
  }
});

module.exports = router;
