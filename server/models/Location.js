// server/models/Location.js
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // City or Society name
  state: { type: String },
  description: { type: String },
  metrics: {
    safety: {
      overall: Number,
      women: Number,
      children: Number,
      crimeRate: Number,
    },
    transport: {
      busDistance: Number,
      railDistance: Number,
      airportDistance: Number,
    },
    education: {
      schoolDistance: Number,
      schoolQuality: Number,
      collegeDistance: Number,
    },
    finance: {
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
      avgWakeUpTime: String,
      avgSleepTime: String,
      foodQuality: Number,
      activityTime: Number, // avg mins/day for exercise/yoga
    },
    pollution: {
      aqi: Number,
      waterQuality: Number,
      noiseLevel: Number,
    },
    internet: {
      avgSpeed: Number,
      techAccess: Number,
    },
    community: {
      friendliness: Number,
      events: Number,
    },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Location", locationSchema);
