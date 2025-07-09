// server/models/Preference.js
const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  preferences: {
    safety: Number,
    transport: Number,
    education: Number,
    finance: Number,
    health: Number,
    entertainment: Number,
    fitness: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Preference", preferenceSchema);
