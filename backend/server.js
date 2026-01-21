const express = require("express");
const cors = require("cors");
const scanNetwork = require("./scanner");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
app.use(express.json()); // parse JSON for POST requests

// Test route
app.get("/", (req, res) => {
  res.send("Smart Control Hub backend running 🚀");
});

// Scan network route
app.get("/api/scan", async (req, res) => {
  try {
    const devices = await scanNetwork();
    res.json({
      count: devices.length,
      devices,
    });
  } catch (err) {
    res.status(500).json({ error: "Error scanning network" });
  }
});

// Control LED / IoT device route
app.post("/api/control", async (req, res) => {
  const { deviceIp, action, color } = req.body;

  if (!deviceIp || !action) {
    return res.status(400).json({ error: "deviceIp and action are required" });
  }

  try {
    // Example for WLED / ESP8266 bulbs
    let body = {};

    if (action === "on") body.on = true;
    if (action === "off") body.on = false;
    if (action === "color" && color) {
      // Convert hex color to RGB array
      body.col = [
        parseInt(color.slice(1, 3), 16),
        parseInt(color.slice(3, 5), 16),
        parseInt(color.slice(5, 7), 16),
      ];
    }

    // Send command to device
    await axios.post(`http://${deviceIp}/json/state`, body);

    res.json({ status: "success", deviceIp, action, color });
  } catch (err) {
    console.error("Control error:", err.message);
    res.status(500).json({ error: "Failed to control device" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
