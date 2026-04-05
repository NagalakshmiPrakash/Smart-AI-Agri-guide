const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const WEATHER_API_KEY = "YOUR_OPENWEATHER_API_KEY";

// 🌾 Recommendation Engine
app.post("/api/recommend", (req, res) => {
  const { crop, soil, weather } = req.body;

  let advice = [];

  if (weather.temp > 35) {
    advice.push("High temperature: Increase irrigation by 20%");
  }
  if (weather.rain > 0) {
    advice.push("Rain expected: Avoid irrigation");
  }
  if (soil === "sandy") {
    advice.push("Add compost to improve water retention");
  }
  if (crop === "rice") {
    advice.push("Maintain standing water levels");
  }

  res.json({ advice });
});

// 🌦 Weather API
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Weather API error");
  }
});

// 🌱 Disease Detection (Mock AI)
app.post("/api/disease", (req, res) => {
  const diseases = [
    { name: "Leaf Spot", treatment: "Use fungicide spray" },
    { name: "Blight", treatment: "Remove infected leaves" },
    { name: "Healthy", treatment: "No action needed" }
  ];

  const result = diseases[Math.floor(Math.random() * diseases.length)];
  res.json(result);
});

// 💰 Market Prices (Mock Data)
app.get("/api/market", (req, res) => {
  res.json([
    { crop: "Rice", price: "₹2200/quintal" },
    { crop: "Wheat", price: "₹2100/quintal" },
    { crop: "Maize", price: "₹1800/quintal" }
  ]);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));