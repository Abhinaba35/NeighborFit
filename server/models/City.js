const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  state: String,
  country: String,
  overallScore: Number,

  image: {
    type: String,
    default: "https://via.placeholder.com/300x200.png?text=No+Image",
  },
  safety: {
    women: Number,
    children: Number,
    crimeRate: Number,
  },
  transport: {
    busStandDistance: Number,
    railStationDistance: Number,
    airportDistance: Number,
  },
  education: {
    schoolDistance: Number,
    schoolQuality: Number,
    collegeDistance: Number,
  },
  financial: {
    bankDistance: Number,
    avgSalary: Number,
  },
  health: {
    hospitalDistance: Number,
    hospitalQuality: Number,
    gymDistance: Number,
    gymQuality: Number,
  },
  entertainment: {
    parkDistance: Number,
    parkQuality: Number,
    mallDistance: Number,
    mallQuality: Number,
  },
  fitness: {
    avgWakeTime: String,
    avgSleepTime: String,
    avgFoodQuality: Number,
    yogaOrExerciseTime: String,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("City", citySchema);
