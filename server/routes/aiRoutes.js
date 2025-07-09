const express = require("express");
const router = express.Router();
const City = require("../models/City");
require("dotenv").config();

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173/", // Your app’s public URL
    "X-Title": "NeighborFit", // Your app name
  },
});

router.post("/recommend", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Prompt received:", prompt);

    const cities = await City.find();
    console.log("Cities found:", cities.length);

    const formattedCities = cities.map((city) => ({
      name: city.name,
      state: city.state,
      safety: city.safety,
      transport: city.transport,
      education: city.education,
      health: city.health,
      entertainment: city.entertainment,
      fitness: city.fitness,
    }));

    const aiPrompt = `
You are a smart assistant helping users find suitable cities to live in.

Available cities:
${JSON.stringify(formattedCities)}

User preferences:
"${prompt}"

Suggest top 3 best-fit cities with short reasons in a numbered list.
`;

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // FREE fast model on OpenRouter
      messages: [{ role: "user", content: aiPrompt }],
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;
    res.json({ response: reply });
  } catch (error) {
    console.error("❌ AI Error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI recommendation failed" });
  }
});

module.exports = router;
