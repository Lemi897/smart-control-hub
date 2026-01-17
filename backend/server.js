const express = require("express");
const cors = require("cors");
const scanNetwork = require("./scanner");

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Smart Control Hub backend running 🚀");
});

// Scan route
app.get("/api/scan", async (req, res) => {
  const devices = await scanNetwork();
  res.json({
    count: devices.length,
    devices,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
